/**
 * 虚拟DOM节点克隆模块
 * 
 * 这个模块实现了类似 React.cloneElement 的功能，用于复制一个虚拟DOM节点
 * 并可选择性地修改其属性和子节点。这在以下场景特别有用：
 * 
 * 1. 需要基于现有组件创建变体时
 * 2. 需要给子组件注入额外属性时
 * 3. 需要修改 Context.Provider 的 value 时
 */

import { assign, slice } from './util';
import { createVNode } from './create-element';
import { NULL, UNDEFINED } from './constants';

/**
 * 克隆虚拟DOM节点的核心函数
 * 可以选择性地添加新属性或替换子节点
 * 
 * 工作原理：
 * 1. 复制原始节点的所有属性
 * 2. 应用新的属性，覆盖原有属性
 * 3. 处理特殊的 key 和 ref 属性
 * 4. 应用默认属性（如果有）
 * 5. 处理子节点替换（如果提供了新的子节点）
 * 
 * @param {import('./internal').VNode} vnode 要克隆的虚拟DOM节点
 * @param {object} props 要添加或覆盖的属性
 * @param {Array<import('./internal').ComponentChildren>} rest 用作替换的子节点（可选）
 * @returns {import('./internal').VNode} 返回克隆后的新虚拟DOM节点
 * 
 * 使用示例：
 * ```jsx
 * // 克隆并修改属性
 * const newVNode = cloneElement(
 *   <div className="old">Hello</div>,
 *   { className: "new" }
 * );
 * 
 * // 克隆并替换子节点
 * const newVNode = cloneElement(
 *   <div>Old Content</div>,
 *   null,
 *   "New Content"
 * );
 * ```
 */
export function cloneElement(vnode, props, children) {
	// 创建原始属性的副本
	let normalizedProps = assign({}, vnode.props),
		key,
		ref,
		i;

	// 获取组件的默认属性（如果有）
	let defaultProps;
	if (vnode.type && vnode.type.defaultProps) {
		defaultProps = vnode.type.defaultProps;
	}

	// 处理新属性
	for (i in props) {
		if (i == 'key') key = props[i];                    // 提取key属性
		else if (i == 'ref') ref = props[i];              // 提取ref属性
		else if (props[i] == UNDEFINED && defaultProps != UNDEFINED) {
			// 如果新属性值是undefined且有默认值，使用默认值
			normalizedProps[i] = defaultProps[i];
		} else {
			// 否则使用新属性值
			normalizedProps[i] = props[i];
		}
	}

	// 处理子节点
	// 如果提供了超过2个参数，说明要替换子节点
	if (arguments.length > 2) {
		normalizedProps.children =
			arguments.length > 3 ? slice.call(arguments, 2) : children;
	}

	// 创建新的虚拟DOM节点
	// 保持原始节点的type和key/ref（除非被新值覆盖）
	return createVNode(
		vnode.type,
		normalizedProps,
		key || vnode.key,
		ref || vnode.ref,
		NULL
	);
}
