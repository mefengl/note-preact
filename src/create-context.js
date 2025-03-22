/**
 * Context（上下文）系统实现
 * 
 * Context 提供了一种跨组件传递数据的方式，无需手动在每一层传递 props
 * 这对于全局数据（如主题、语言、用户信息等）特别有用
 * 
 * 工作原理：
 * 1. Provider 组件存储值并订阅更新
 * 2. Consumer 组件通过 context id 查找最近的 Provider
 * 3. 当 Provider 的值变化时，所有订阅的 Consumer 会被强制更新
 */

import { enqueueRender } from './component';
import { NULL } from './constants';

/**
 * Context计数器
 * 用于生成唯一的Context标识符
 */
export let i = 0;

/**
 * 创建新的Context对象
 * 
 * @param {any} defaultValue - Context的默认值，当Consumer上层没有对应的Provider时使用
 * @returns {Context} 返回一个包含Provider和Consumer的Context对象
 * 
 * 使用示例：
 * ```jsx
 * const ThemeContext = createContext('light');
 * 
 * function App() {
 *   return (
 *     <ThemeContext.Provider value="dark">
 *       <ThemedButton />
 *     </ThemeContext.Provider>
 *   );
 * }
 * 
 * function ThemedButton() {
 *   return (
 *     <ThemeContext.Consumer>
 *       {theme => <button className={theme}>Click me</button>}
 *     </ThemeContext.Consumer>
 *   );
 * }
 * ```
 */
export function createContext(defaultValue) {
    /**
     * Context Provider的内部实现
     * 管理订阅和更新机制
     */
    function Context(props) {
        // 只在第一次渲染时初始化上下文管理系统
        if (!this.getChildContext) {
            /** @type {Set<import('./internal').Component> | null} */
            // 存储所有订阅了这个Context的组件
            let subs = new Set();
            
            // 创建上下文对象，使用唯一ID作为key
            let ctx = {};
            ctx[Context._id] = this;
            
            // 实现getChildContext以支持上下文传递
            this.getChildContext = () => ctx;

            /**
             * 组件卸载时清理订阅集合
             * 防止内存泄漏
             */
            this.componentWillUnmount = () => {
                subs = NULL;
            };

            /**
             * 判断是否需要更新
             * 当value变化时，通知所有订阅的组件强制更新
             */
            this.shouldComponentUpdate = function (_props) {
                // @ts-expect-error 比较新旧value值
                if (this.props.value != _props.value) {
                    // value改变时，强制更新所有订阅的组件
                    subs.forEach(c => {
                        c._force = true;
                        enqueueRender(c);
                    });
                }
            };

            /**
             * 订阅方法
             * 将组件添加到订阅集合，并处理组件的卸载清理
             */
            this.sub = c => {
                // 添加到订阅集合
                subs.add(c);
                
                // 保存原有的卸载方法
                let old = c.componentWillUnmount;
                
                // 增强卸载方法，确保清理订阅
                c.componentWillUnmount = () => {
                    if (subs) {
                        subs.delete(c);
                    }
                    // 调用原有的卸载方法
                    if (old) old.call(c);
                };
            };
        }
        // Provider组件本身只渲染子组件
        return props.children;
    }

    // 为Context对象设置唯一标识符
    Context._id = '__cC' + i++;
    
    // 设置默认值，当没有Provider时使用
    Context._defaultValue = defaultValue;

    /** 
     * Consumer组件实现
     * 接收一个函数作为children，并将context值传给这个函数
     * @type {import('./internal').FunctionComponent} 
     */
    Context.Consumer = (props, contextValue) => {
        return props.children(contextValue);
    };

    // 设置Provider和其他必要的引用
    // Provider就是Context函数本身
    // _contextRef用于向后兼容
    Context.Provider =
        Context._contextRef =
        Context.Consumer.contextType =
            Context;

    return Context;
}
