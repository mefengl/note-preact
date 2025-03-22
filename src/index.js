/**
 * Preact核心模块入口文件
 * 这个文件导出了Preact的所有核心API，是整个框架的入口点
 */

// 导出渲染相关的函数
// render: 用于将虚拟DOM渲染到真实DOM中
// hydrate: 用于服务端渲染后的客户端激活，复用已有DOM
export { render, hydrate } from './render';

// 导出createElement相关的函数和组件
// createElement: 创建虚拟DOM节点的核心函数，也可以用别名h
// Fragment: 特殊组件，用于返回多个子元素而无需额外包装层
// createRef: 创建可变的ref对象，用于获取DOM节点或组件实例的引用
// isValidElement: 检查一个对象是否是有效的虚拟DOM元素
export {
	createElement,
	createElement as h,  // h是一个别名，用于JSX转换
	Fragment,
	createRef,
	isValidElement
} from './create-element';

// 导出Component基类
// Component是所有类组件的基类，提供了生命周期方法和状态管理
export { BaseComponent as Component } from './component';

// 导出克隆元素的函数
// cloneElement用于复制一个元素并可选择性地修改其属性和子元素
export { cloneElement } from './clone-element';

// 导出Context相关函数
// createContext用于创建一个新的Context对象，实现跨层级的数据传递
export { createContext } from './create-context';

// 导出子元素数组转换函数
// toChildArray用于将子元素规范化为数组形式，处理不同类型的children
export { toChildArray } from './diff/children';

// 导出全局配置对象
// options提供了一系列钩子函数，允许修改Preact的默认行为
export { default as options } from './options';
