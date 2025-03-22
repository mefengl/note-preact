/**
 * Preact 全局配置系统
 * 
 * 这个文件实现了 Preact 的插件系统，它是整个框架的核心配置中心。
 * 通过这个系统，Preact 实现了高度的可扩展性，使得以下功能成为可能：
 * 
 * 1. 调试能力 (preact/debug)
 *    - 可以注入开发时的错误检查
 *    - 可以连接开发者工具
 *    - 可以进行性能分析
 * 
 * 2. React 兼容层 (preact/compat)
 *    - 可以模拟 React 的生命周期
 *    - 可以支持 React 的特殊属性
 *    - 可以适配 React 的事件系统
 * 
 * 3. Hooks 系统 (preact/hooks)
 *    - 可以注入 hooks 的执行时机
 *    - 可以管理 hooks 的状态
 *    - 可以处理 hooks 的依赖追踪
 * 
 * 工作原理：
 * 1. options 对象包含各个生命周期的钩子函数
 * 2. 插件通过修改这些钩子来注入自定义行为
 * 3. Preact 核心在关键时刻调用这些钩子
 * 
 * 详细的钩子列表可以在 internal.d.ts 中的 Options 类型定义中找到
 * 提示：在大多数编辑器中，按住 Ctrl/Cmd 并点击下面的类型注释可以跳转查看完整定义
 */

import { _catchError } from './diff/catch-error';

/**
 * 全局配置对象
 * 默认情况下只包含错误处理钩子，其他功能需要通过插件注入
 * 
 * 可以被注入的钩子包括但不限于：
 * - vnode：虚拟DOM节点创建时的处理
 * - diffed：完成差异对比后的处理
 * - commit：DOM更新提交时的处理
 * - unmount：组件卸载时的处理
 * - event：事件处理系统的定制
 * - hook：Hooks 系统的生命周期
 * 
 * @type {import('./internal').Options}
 */
const options = {
	_catchError
};

export default options;
