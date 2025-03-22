import { assign } from './util';
import { diff, commitRoot } from './diff/index';
import options from './options';
import { Fragment } from './create-element';
import { MODE_HYDRATE, NULL } from './constants';

/**
 * 组件基类（BaseComponent）
 * 这是Preact中所有类组件的基础，提供了状态管理和更新机制
 * 
 * 主要功能：
 * 1. 状态管理：通过setState方法更新组件状态
 * 2. 强制更新：通过forceUpdate方法强制重新渲染
 * 3. 生命周期：提供render等基础生命周期方法
 * 
 * @param {object} props - 从父组件传递的属性
 * @param {object} context - 从祖先组件传递的上下文
 */
export function BaseComponent(props, context) {
    this.props = props;
    this.context = context;
}

/**
 * setState方法 - 更新组件状态并触发重新渲染
 * 状态更新可能是异步的，多个setState调用可能会被批处理
 * 
 * @param {object | function} update - 新的状态对象或基于当前状态计算新状态的函数
 * @param {function} callback - 状态更新后的回调函数
 */
BaseComponent.prototype.setState = function(update, callback) {
    // 只在首次复制状态到_nextState时克隆状态
    let s;
    if (this._nextState != NULL && this._nextState != this.state) {
        s = this._nextState;
    } else {
        s = this._nextState = assign({}, this.state);
    }

    // 处理函数式更新
    if (typeof update == 'function') {
        // 一些库如immer会将当前状态标记为只读
        // 所以我们需要克隆它，见issue #2716
        update = update(assign({}, s), this.props);
    }

    // 合并更新到nextState
    if (update) {
        assign(s, update);
    }

    // 如果更新函数返回null，则跳过更新
    if (update == NULL) return;

    // 如果组件已挂载（有_vnode），则进入更新队列
    if (this._vnode) {
        if (callback) {
            this._stateCallbacks.push(callback);
        }
        enqueueRender(this);
    }
};

/**
 * forceUpdate方法 - 强制组件同步重新渲染
 * 不走shouldComponentUpdate检查，直接触发渲染
 * 
 * @param {function} callback - 重新渲染后的回调函数
 */
BaseComponent.prototype.forceUpdate = function(callback) {
    if (this._vnode) {
        // 设置_force标志，跳过shouldComponentUpdate检查
        this._force = true;
        if (callback) this._renderCallbacks.push(callback);
        enqueueRender(this);
    }
};

/**
 * render方法 - 返回虚拟DOM树
 * 这是一个基础实现，返回Fragment（空内容）
 * 实际组件需要覆盖这个方法提供自己的渲染逻辑
 */
BaseComponent.prototype.render = Fragment;

/**
 * getDomSibling函数 - 获取DOM中的下一个兄弟节点
 * 用于确定新渲染内容应该插入的位置
 * 
 * @param {VNode} vnode - 虚拟节点
 * @param {number} childIndex - 子节点索引
 * @returns {Element|null} 返回DOM中的下一个兄弟节点
 */
export function getDomSibling(vnode, childIndex) {
    if (childIndex == NULL) {
        return vnode._parent
            ? getDomSibling(vnode._parent, vnode._index + 1)
            : NULL;
    }

    let sibling;
    for (; childIndex < vnode._children.length; childIndex++) {
        sibling = vnode._children[childIndex];
        if (sibling != NULL && sibling._dom != NULL) {
            return sibling._dom;
        }
    }

    return typeof vnode.type == 'function' ? getDomSibling(vnode) : NULL;
}

/**
 * renderComponent函数 - 组件的实际渲染过程
 * 处理组件的重新渲染，包括diff和DOM更新
 * 
 * @param {Component} component - 要重新渲染的组件
 */
function renderComponent(component) {
    // 保存旧的虚拟节点和DOM节点
    let oldVNode = component._vnode,
        oldDom = oldVNode._dom,
        commitQueue = [],
        refQueue = [];

    // 如果组件已挂载到DOM中
    if (component._parentDom) {
        // 创建新的虚拟节点
        const newVNode = assign({}, oldVNode);
        newVNode._original = oldVNode._original + 1;
        
        // 调用vnode钩子（如果存在）
        if (options.vnode) options.vnode(newVNode);

        // 执行diff操作，计算更新
        diff(
            component._parentDom,
            newVNode,
            oldVNode,
            component._globalContext,
            component._parentDom.namespaceURI,
            oldVNode._flags & MODE_HYDRATE ? [oldDom] : NULL,
            commitQueue,
            oldDom == NULL ? getDomSibling(oldVNode) : oldDom,
            !!(oldVNode._flags & MODE_HYDRATE),
            refQueue
        );

        // 更新虚拟节点树
        newVNode._original = oldVNode._original;
        newVNode._parent._children[newVNode._index] = newVNode;

        // 提交DOM更新
        commitRoot(commitQueue, newVNode, refQueue);

        // 如果DOM节点发生变化，更新父节点的DOM指针
        if (newVNode._dom != oldDom) {
            updateParentDomPointers(newVNode);
        }
    }
}

/**
 * updateParentDomPointers函数 - 更新父节点的DOM引用
 * 在DOM结构发生变化后，确保虚拟节点树中的DOM引用保持正确
 * 
 * @param {VNode} vnode - 需要更新DOM指针的虚拟节点
 */
function updateParentDomPointers(vnode) {
    if ((vnode = vnode._parent) != NULL && vnode._component != NULL) {
        vnode._dom = vnode._component.base = NULL;
        for (let i = 0; i < vnode._children.length; i++) {
            let child = vnode._children[i];
            if (child != NULL && child._dom != NULL) {
                vnode._dom = vnode._component.base = child._dom;
                break;
            }
        }
        return updateParentDomPointers(vnode);
    }
}

/**
 * 渲染队列
 * 存储所有待重新渲染的组件
 * @type {Array<Component>}
 */
let rerenderQueue = [];

/**
 * 使用Promise或setTimeout来异步执行渲染
 * 这确保了状态更新和渲染是异步的，可以批量处理
 */
const defer =
    typeof Promise == 'function'
        ? Promise.prototype.then.bind(Promise.resolve())
        : setTimeout;

/**
 * enqueueRender函数 - 将组件加入渲染队列
 * 组件的更新会被收集并批量处理，提高性能
 * 
 * @param {Component} c - 需要重新渲染的组件
 */
export function enqueueRender(c) {
    if (
        (!c._dirty &&
            (c._dirty = true) &&
            rerenderQueue.push(c) &&
            !process._rerenderCount++) ||
        prevDebounce != options.debounceRendering
    ) {
        prevDebounce = options.debounceRendering;
        (prevDebounce || defer)(process);
    }
}

/**
 * 用于排序的比较函数，按照虚拟节点的深度排序
 */
const depthSort = (a, b) => a._vnode._depth - b._vnode._depth;

/**
 * process函数 - 处理渲染队列
 * 按照组件在树中的深度顺序处理渲染队列中的所有组件
 */
function process() {
    let c,
        l = 1;
    
    while (rerenderQueue.length) {
        // 保持渲染队列按深度排序
        if (rerenderQueue.length > l) {
            rerenderQueue.sort(depthSort);
        }
        
        c = rerenderQueue.shift();
        l = rerenderQueue.length;
        
        // 如果组件仍然是脏的，则重新渲染
        if (c._dirty) {
            renderComponent(c);
        }
    }
    
    process._rerenderCount = 0;
}

// 初始化重渲染计数器
process._rerenderCount = 0;
