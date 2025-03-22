/**
 * Preact 核心常量定义文件
 * 这个文件定义了 Preact 框架中使用的所有重要常量。
 * 主要包含以下几类常量：
 * 1. 渲染模式标志位
 * 2. 虚拟DOM操作标志位
 * 3. XML命名空间常量
 * 4. 通用工具常量
 */

/**
 * 水合(Hydration)模式标志位
 * 水合是指：将服务器端渲染(SSR)的静态HTML与客户端的虚拟DOM树进行关联的过程
 * 这个模式下会直接附加到现有DOM树上，而不会进行差异对比
 * 使用位运算 1 << 5 表示二进制位的第5位为1，这样可以用位运算高效地检查模式
 */
export const MODE_HYDRATE = 1 << 5;

/**
 * 组件挂起(Suspended)模式标志位
 * 表示这个虚拟DOM节点在上一次渲染时被挂起了
 * 通常发生在使用 Suspense 组件进行异步加载时
 * 使用位运算 1 << 7 表示二进制位的第7位为1
 */
export const MODE_SUSPENDED = 1 << 7;

/**
 * 插入节点标志位
 * 在对比(diff)子节点时，标记需要被插入的新节点
 * 当发现一个节点需要被添加到DOM树中时，会设置这个标志
 * 使用位运算 1 << 2 表示二进制位的第2位为1
 */
export const INSERT_VNODE = 1 << 2;

/**
 * 节点匹配标志位
 * 在虚拟DOM树的差异对比过程中，表示这个节点已经找到了对应的匹配节点
 * 这有助于优化对比过程，避免重复处理
 * 使用位运算 1 << 1 表示二进制位的第1位为1
 */
export const MATCHED = 1 << 1;

/**
 * 重置模式标志位
 * 用于清除所有模式标志，恢复到初始状态
 * 使用位运算的NOT(~)操作符反转 MODE_HYDRATE | MODE_SUSPENDED 的位
 * 这样可以通过与(&)运算清除这些模式位
 */
export const RESET_MODE = ~(MODE_HYDRATE | MODE_SUSPENDED);

/**
 * XML命名空间常量
 * 在处理SVG、XHTML和MathML元素时需要使用正确的命名空间
 * 这些常量定义了标准的XML命名空间URI
 */
export const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
export const XHTML_NAMESPACE = 'http://www.w3.org/1999/xhtml';
export const MATH_NAMESPACE = 'http://www.w3.org/1998/Math/MathML';

/**
 * 通用工具常量
 * NULL和UNDEFINED：提供类型安全的null和undefined值
 * EMPTY_OBJ：一个空对象，用作默认值或比较基准
 * EMPTY_ARR：一个空数组，用作默认值或比较基准
 */
export const NULL = null;
export const UNDEFINED = undefined;
export const EMPTY_OBJ = /** @type {any} */ ({});
export const EMPTY_ARR = [];

/**
 * CSS非维度属性正则表达式
 * 用于识别哪些CSS属性的值不需要自动添加"px"单位
 * 例如：
 * - opacity: 0.5 (不需要px)
 * - width: 100 (需要px，变成width: 100px)
 * 这个正则表达式匹配如下属性：
 * - acit: 动画相关
 * - ex开头的属性(如experience)
 * - grid相关属性
 * - ows结尾的属性
 * - 其他特殊情况
 */
export const IS_NON_DIMENSIONAL =
	/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
