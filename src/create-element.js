import { slice } from './util';
import options from './options';
import { NULL, UNDEFINED } from './constants';

/**
 * 用于生成虚拟节点的唯一标识符
 * 每次创建新的虚拟节点时会自增，确保每个节点都有唯一的_original值
 */
let vnodeId = 0;

/**
 * createElement函数 - JSX转换的核心函数
 * 当我们写JSX代码时，babel会将其转换为createElement函数调用
 * 例如：<div className="test">Hello</div>
 * 会被转换为：createElement('div', { className: 'test' }, 'Hello')
 * 
 * @param {VNode["type"]} type - 节点类型，可以是：
 *   1. 字符串：表示原生DOM元素，如 'div', 'span'
 *   2. 函数：表示函数组件
 *   3. 类：表示类组件
 * @param {object} props - 节点属性对象，包含所有JSX属性
 * @param {Array} children - 子节点数组
 * @returns {VNode} 返回虚拟节点
 */
export function createElement(type, props, children) {
    // 初始化规范化后的属性对象
    let normalizedProps = {},
        key,        // 用于Diff算法的key
        ref,        // 用于引用实际DOM节点或组件实例
        i;

    // 从props中提取key和ref，并将其他属性复制到normalizedProps
    for (i in props) {
        if (i == 'key') key = props[i];
        else if (i == 'ref') ref = props[i];
        else normalizedProps[i] = props[i];
    }

    // 处理子节点
    // 如果参数超过2个，说明有子节点
    if (arguments.length > 2) {
        normalizedProps.children =
            arguments.length > 3 
                ? slice.call(arguments, 2)   // 多个子节点转换为数组
                : children;                   // 单个子节点直接使用
    }

    // 处理默认属性
    // 如果是组件（函数类型）且有defaultProps，则应用默认值
    if (typeof type == 'function' && type.defaultProps != NULL) {
        for (i in type.defaultProps) {
            if (normalizedProps[i] == UNDEFINED) {
                normalizedProps[i] = type.defaultProps[i];
            }
        }
    }

    // 创建并返回虚拟节点
    return createVNode(type, normalizedProps, key, ref, NULL);
}

/**
 * createVNode函数 - 创建虚拟节点的内部实现
 * 虚拟节点（VNode）是Preact中对DOM节点或组件的轻量级表示
 * 
 * @param {VNode["type"]} type - 节点类型
 * @param {object|string|number|null} props - 节点属性或文本内容
 * @param {string|number|null} key - 节点的唯一标识，用于优化更新
 * @param {VNode["ref"]} ref - 引用回调或对象
 * @param {number|null} original - 原始虚拟节点ID
 * @returns {VNode} 返回创建的虚拟节点
 */
export function createVNode(type, props, key, ref, original) {
    // 创建虚拟节点对象，包含所有必要的属性
    const vnode = {
        type,           // 节点类型
        props,          // 属性对象
        key,            // 用于Diff算法的key
        ref,            // DOM或组件的引用
        _children: NULL,      // 子节点缓存
        _parent: NULL,       // 父节点引用
        _depth: 0,           // 节点深度
        _dom: NULL,          // 实际的DOM节点引用
        _component: NULL,    // 组件实例引用
        constructor: UNDEFINED,
        _original: original == NULL ? ++vnodeId : original, // 节点的唯一标识
        _index: -1,         // 在父节点子节点数组中的索引
        _flags: 0           // 内部使用的标记位
    };

    // 如果不是克隆节点（original为NULL），则调用钩子函数
    if (original == NULL && options.vnode != NULL) options.vnode(vnode);

    return vnode;
}

/**
 * createRef函数 - 创建一个ref对象
 * ref对象用于保存对DOM节点或组件实例的引用
 * 例如：const inputRef = createRef(); <input ref={inputRef} />
 * 
 * @returns {object} 返回一个带有current属性的对象
 */
export function createRef() {
    return { current: NULL };
}

/**
 * Fragment组件 - 用于返回多个子元素而无需创建额外的DOM节点
 * 例如：<Fragment><div>1</div><div>2</div></Fragment>
 * 
 * @param {object} props - 属性对象，主要使用其children属性
 * @returns {any} 直接返回子节点
 */
export function Fragment(props) {
    return props.children;
}

/**
 * isValidElement函数 - 检查一个对象是否是有效的Preact虚拟节点
 * 通过检查对象是否存在且没有constructor属性来判断
 * 
 * @param {*} vnode - 要检查的对象
 * @returns {boolean} 如果是有效的虚拟节点则返回true
 */
export const isValidElement = vnode =>
    vnode != NULL && vnode.constructor == UNDEFINED;
