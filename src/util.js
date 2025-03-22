/**
 * Preact 工具函数模块
 * 这个模块提供了一些核心的工具函数，用于支持 Preact 的基础操作
 */

import { EMPTY_ARR } from './constants';

/**
 * Array.isArray 的简写引用
 * 用于判断一个值是否为数组
 * 这种写法可以减小打包体积，因为可以被压缩工具压缩成单字母变量
 */
export const isArray = Array.isArray;

/**
 * 属性合并函数
 * 将一个对象的属性复制到另一个对象上，实现浅拷贝
 * 
 * 使用场景：
 * 1. 合并组件的 props
 * 2. 克隆对象时复制属性
 * 3. 创建新的状态对象时合并状态
 * 
 * 注意：这是一个简化版的 Object.assign，专门为 Preact 优化
 * 
 * @template O, P O 是目标对象类型，P 是源对象类型
 * @param {O} obj 要复制属性到的目标对象
 * @param {P} props 要复制属性的源对象
 * @returns {O & P} 返回合并后的对象（实际上就是修改后的目标对象）
 * 
 * 示例：
 * const target = { a: 1 };
 * const source = { b: 2 };
 * assign(target, source); // 结果: { a: 1, b: 2 }
 */
export function assign(obj, props) {
	// @ts-expect-error 这里我们改变 obj 的类型为 O & P
	for (let i in props) obj[i] = props[i];
	return /** @type {O & P} */ (obj);
}

/**
 * 节点移除函数
 * 安全地从 DOM 树中移除一个节点
 * 
 * 为什么需要这个函数：
 * 1. 兼容性考虑：IE11 不支持 Element.prototype.remove()
 * 2. 代码体积优化：比引入完整的 polyfill 更轻量
 * 3. 安全性保证：会先检查节点是否存在且有父节点
 * 
 * 使用场景：
 * 1. 组件卸载时移除 DOM 节点
 * 2. 列表项删除时移除对应节点
 * 3. 动态内容更新时清理旧节点
 * 
 * @param {import('./index').ContainerNode} node 要移除的节点
 * 
 * 示例：
 * const element = document.querySelector('.to-remove');
 * removeNode(element); // 元素会被从 DOM 树中移除
 */
export function removeNode(node) {
	if (node && node.parentNode) node.parentNode.removeChild(node);
}

/**
 * Array.prototype.slice 的引用
 * 使用 EMPTY_ARR 来获取 slice 方法的引用，这样可以节省代码体积
 * 
 * 使用场景：
 * 1. 将类数组对象转换为真正的数组
 * 2. 创建数组的浅拷贝
 * 3. 提取数组的一部分
 * 
 * 示例：
 * const args = slice.call(arguments); // 将 arguments 转换为数组
 * const copy = slice.call(myArray); // 创建数组的副本
 */
export const slice = EMPTY_ARR.slice;
