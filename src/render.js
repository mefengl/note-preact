/**
 * Preact渲染系统的核心文件
 * 负责将虚拟DOM转换为实际的DOM元素，并处理更新和水合（hydration）
 */

import { EMPTY_OBJ, NULL } from './constants';
import { commitRoot, diff } from './diff/index';
import { createElement, Fragment } from './create-element';
import options from './options';
import { slice } from './util';

/**
 * render函数 - Preact的核心渲染函数
 * 将虚拟节点渲染到实际的DOM元素中
 * 
 * 工作流程：
 * 1. 处理特殊情况（如直接渲染到document）
 * 2. 创建或复用虚拟节点树
 * 3. 执行diff算法计算更新
 * 4. 提交所有DOM更新和副作用
 * 
 * @param {ComponentChild} vnode - 要渲染的虚拟节点
 * @param {PreactElement} parentDom - 目标DOM容器
 * @param {PreactElement | function} [replaceNode] - 可选，用于复用已存在的DOM树或标记hydration模式
 */
export function render(vnode, parentDom, replaceNode) {
    // 修复 #3794：如果父节点是document，使用documentElement代替
    if (parentDom == document) {
        parentDom = document.documentElement;
    }

    // 调用根节点钩子（如果存在）
    if (options._root) options._root(vnode, parentDom);

    // 检查是否处于hydration模式
    // hydration模式下replaceNode是一个函数而不是DOM节点
    let isHydrating = typeof replaceNode == 'function';

    // 获取之前渲染的虚拟节点树
    // DOM节点的_children属性存储了上次渲染的虚拟节点树
    let oldVNode = isHydrating
        ? NULL
        : (replaceNode && replaceNode._children) || parentDom._children;

    // 将要渲染的内容包装在Fragment中
    // 这样可以支持渲染多个顶级节点
    vnode = ((!isHydrating && replaceNode) || parentDom)._children =
        createElement(Fragment, NULL, [vnode]);

    // 创建更新队列
    let commitQueue = [],    // 存储需要执行的DOM更新
        refQueue = [];       // 存储需要更新的ref引用

    // 执行diff算法
    diff(
        parentDom,          // 父DOM节点
        vnode,              // 新的虚拟节点树
        oldVNode || EMPTY_OBJ,  // 旧的虚拟节点树
        EMPTY_OBJ,         // context对象
        parentDom.namespaceURI,  // XML命名空间
        // hydration模式：使用现有DOM节点
        // 非hydration模式：获取所有子节点
        !isHydrating && replaceNode
            ? [replaceNode]
            : oldVNode
                ? NULL
                : parentDom.firstChild
                    ? slice.call(parentDom.childNodes)
                    : NULL,
        commitQueue,        // DOM更新队列
        // 确定新内容要插入的位置
        !isHydrating && replaceNode
            ? replaceNode
            : oldVNode
                ? oldVNode._dom
                : parentDom.firstChild,
        isHydrating,       // 是否是hydration模式
        refQueue          // ref更新队列
    );

    // 提交所有DOM更新和副作用
    commitRoot(commitQueue, vnode, refQueue);
}

/**
 * hydrate函数 - 用于服务端渲染的客户端激活
 * 复用服务端渲染的DOM树，为其添加事件处理和状态
 * 
 * hydration过程会尽可能复用现有DOM节点，而不是重新创建它们
 * 这样可以保持良好的首屏性能，同时确保交互功能正常工作
 * 
 * @param {ComponentChild} vnode - 要激活的虚拟节点
 * @param {PreactElement} parentDom - 包含服务端渲染内容的DOM容器
 */
export function hydrate(vnode, parentDom) {
    // 调用render函数，传入hydrate本身作为标记
    render(vnode, parentDom, hydrate);
}
