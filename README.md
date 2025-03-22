# 代码阅读推荐顺序

## 一、核心架构实现

### 1. 基础设施

1. src/constants.js - 常量定义，包括特殊标记和模式
2. src/util.js - 通用工具函数
3. src/options.js - 全局配置和钩子系统

### 2. 虚拟DOM实现

1. src/create-element.js - JSX转换和虚拟DOM节点创建
2. src/clone-element.js - 虚拟DOM节点克隆
3. src/component.js - 组件基类实现
4. src/create-context.js - Context上下文系统

### 3. 渲染系统

1. src/render.js - DOM渲染的核心实现
2. src/diff/index.js * - 差异对比算法入口
3. src/diff/children.js * - 子节点对比算法
4. src/diff/props.js * - 属性对比算法
5. src/diff/catch-error.js * - 错误边界处理

## 二、核心功能模块

### 1. Hooks系统

1. hooks/src/index.js * - Hooks实现入口
2. hooks/src/internal.d.ts * - Hooks内部类型定义
3. hooks/test/browser/useState.test.js * - useState实现测试
4. hooks/test/browser/useEffect.test.js * - useEffect实现测试
5. hooks/test/browser/useCallback.test.js * - useCallback实现测试
6. hooks/test/browser/useMemo.test.js * - useMemo实现测试
7. hooks/test/browser/useRef.test.js * - useRef实现测试
8. hooks/test/browser/useContext.test.js * - useContext实现测试

### 2. React兼容层

1. compat/src/index.js * - React兼容层入口
2. compat/src/render.js * - React渲染适配
3. compat/src/hooks.js * - React Hooks适配
4. compat/src/Children.js * - React.Children实现
5. compat/src/PureComponent.js * - React.PureComponent实现
6. compat/src/memo.js * - React.memo实现
7. compat/src/forwardRef.js * - React.forwardRef实现
8. compat/src/suspense.js * - Suspense功能实现

### 3. JSX运行时

1. jsx-runtime/src/index.js * - JSX运行时入口
2. jsx-runtime/src/utils.js * - JSX工具函数

## 三、开发工具和调试功能

### 1. 开发工具

1. devtools/src/devtools.js * - 开发者工具实现
2. devtools/src/index.js * - 开发者工具入口

### 2. 调试功能

1. debug/src/debug.js * - 调试核心功能
2. debug/src/check-props.js * - 属性检查
3. debug/src/component-stack.js * - 组件栈追踪
4. debug/src/constants.js * - 调试常量

## 四、测试用例（重要实现参考）

### 1. 核心功能测试

1. test/browser/components.test.js * - 组件系统测试
2. test/browser/render.test.js * - 渲染系统测试
3. test/browser/context.test.js * - Context系统测试
4. test/browser/fragments.test.js * - Fragments功能测试

### 2. 生命周期测试

1. test/browser/lifecycles/componentDidMount.test.js * - 挂载生命周期
2. test/browser/lifecycles/componentDidUpdate.test.js * - 更新生命周期
3. test/browser/lifecycles/componentWillUnmount.test.js * - 卸载生命周期
4. test/browser/lifecycles/getDerivedStateFromProps.test.js * - 派生状态
5. test/browser/lifecycles/getSnapshotBeforeUpdate.test.js * - 更新快照

## 五、示例代码（实际应用参考）

### 1. 基础功能示例

1. demo/context.jsx * - Context使用示例
2. demo/fragments.jsx * - Fragments使用示例
3. demo/list.jsx * - 列表渲染示例
4. demo/todo.jsx * - Todo应用示例

### 2. 高级特性示例

1. demo/suspense.jsx * - Suspense使用示例
2. demo/nested-suspense/index.jsx * - 嵌套Suspense示例
3. demo/suspense-router/index.jsx * - Suspense配合路由示例

### 3. 状态管理示例

1. demo/mobx.jsx * - MobX集成示例
2. demo/redux.jsx * - Redux集成示例
3. demo/zustand.jsx * - Zustand集成示例

### 4. 性能优化示例

1. benchmarks/apps/many-updates/preact/index.js * - 大量更新性能测试
2. benchmarks/apps/table-app/preact/index.js * - 表格应用性能测试

---

<p align="center">
<a href="https://preactjs.com" target="_blank">

![Preact](https://raw.githubusercontent.com/preactjs/preact/8b0bcc927995c188eca83cba30fbc83491cc0b2f/logo.svg?sanitize=true 'Preact')

</a>
</p>
<p align="center">Fast <b>3kB</b> alternative to React with the same modern API.</p>

**All the power of Virtual DOM components, without the overhead:**

- Familiar React API & patterns: ES6 Class, hooks, and Functional Components
- Extensive React compatibility via a simple [preact/compat] alias
- Everything you need: JSX, <abbr title="Virtual DOM">VDOM</abbr>, [DevTools], <abbr title="Hot Module Replacement">HMR</abbr>, <abbr title="Server-Side Rendering">SSR</abbr>.
- Highly optimized diff algorithm and seamless hydration from Server Side Rendering
- Supports all modern browsers and IE11
- Transparent asynchronous rendering with a pluggable scheduler

### 💁 More information at the [Preact Website ➞](https://preactjs.com)

<table border="0">
<tbody>
<tr>
<td>

[![npm](https://img.shields.io/npm/v/preact.svg)](https://www.npmjs.com/package/preact)
[![Preact Slack Community](https://img.shields.io/badge/Slack%20Community-preact.slack.com-blue)](https://chat.preactjs.com)
[![OpenCollective Backers](https://opencollective.com/preact/backers/badge.svg)](#backers)
[![OpenCollective Sponsors](https://opencollective.com/preact/sponsors/badge.svg)](#sponsors)

[![coveralls](https://img.shields.io/coveralls/preactjs/preact/main.svg)](https://coveralls.io/github/preactjs/preact)
[![gzip size](https://img.badgesize.io/https://unpkg.com/preact/dist/preact.min.js?compression=gzip&label=gzip)](https://unpkg.com/preact/dist/preact.min.js)
[![brotli size](https://img.badgesize.io/https://unpkg.com/preact/dist/preact.min.js?compression=brotli&label=brotli)](https://unpkg.com/preact/dist/preact.min.js)

</td>
</tr>
</tbody>
</table>

You can find some awesome libraries in the [awesome-preact list](https://github.com/preactjs/awesome-preact) :sunglasses:

---

## Getting Started

> 💁 _**Note:** You [don't need ES2015 to use Preact](https://github.com/developit/preact-in-es3)... but give it a try!_

#### Tutorial: Building UI with Preact

With Preact, you create user interfaces by assembling trees of components and elements. Components are functions or classes that return a description of what their tree should output. These descriptions are typically written in [JSX](https://facebook.github.io/jsx/) (shown underneath), or [HTM](https://github.com/developit/htm) which leverages standard JavaScript Tagged Templates. Both syntaxes can express trees of elements with "props" (similar to HTML attributes) and children.

To get started using Preact, first look at the render() function. This function accepts a tree description and creates the structure described. Next, it appends this structure to a parent DOM element provided as the second argument. Future calls to render() will reuse the existing tree and update it in-place in the DOM. Internally, render() will calculate the difference from previous outputted structures in an attempt to perform as few DOM operations as possible.

```js
import { h, render } from 'preact';
// Tells babel to use h for JSX. It's better to configure this globally.
// See https://babeljs.io/docs/en/babel-plugin-transform-react-jsx#usage
// In tsconfig you can specify this with the jsxFactory
/** @jsx h */

// create our tree and append it to document.body:
render(
 <main>
  <h1>Hello</h1>
 </main>,
 document.body
);

// update the tree in-place:
render(
 <main>
  <h1>Hello World!</h1>
 </main>,
 document.body
);
// ^ this second invocation of render(...) will use a single DOM call to update the text of the <h1>
```

Hooray! render() has taken our structure and output a User Interface! This approach demonstrates a simple case, but would be difficult to use as an application grows in complexity. Each change would be forced to calculate the difference between the current and updated structure for the entire application. Components can help here – by dividing the User Interface into nested Components each can calculate their difference from their mounted point. Here's an example:

```js
import { render, h } from 'preact';
import { useState } from 'preact/hooks';

/** @jsx h */

const App = () => {
 const [input, setInput] = useState('');

 return (
  <div>
   <p>Do you agree to the statement: "Preact is awesome"?</p>
   <input value={input} onInput={e => setInput(e.target.value)} />
  </div>
 );
};

render(<App />, document.body);
```

---

## Sponsors

Become a sponsor and get your logo on our README on GitHub with a link to your site. [[Become a sponsor](https://opencollective.com/preact#sponsor)]

<a href="https://opencollective.com/preact/sponsor/0/website" target="_blank"><img src="https://opencollective.com/preact/sponsor/0/avatar.svg"></a>
<a href="https://opencollective.com/preact/sponsor/1/website" target="_blank"><img src="https://opencollective.com/preact/sponsor/1/avatar.svg"></a>
<a href="https://opencollective.com/preact/sponsor/2/website" target="_blank"><img src="https://opencollective.com/preact/sponsor/2/avatar.svg"></a>
<a href="https://opencollective.com/preact/sponsor/3/website" target="_blank"><img src="https://opencollective.com/preact/sponsor/3/avatar.svg"></a>
<a href="https://opencollective.com/preact/sponsor/4/website" target="_blank"><img src="https://opencollective.com/preact/sponsor/4/avatar.svg"></a>
<a href="https://snyk.co/preact" target="_blank"><img src="https://res.cloudinary.com/snyk/image/upload/snyk-marketingui/brand-logos/wordmark-logo-color.svg" width="192" height="64"></a>
<a href="https://opencollective.com/preact/sponsor/5/website" target="_blank"><img src="https://opencollective.com/preact/sponsor/5/avatar.svg"></a>
<a href="https://opencollective.com/preact/sponsor/6/website" target="_blank"><img src="https://opencollective.com/preact/sponsor/6/avatar.svg"></a>
<a href="https://opencollective.com/preact/sponsor/7/website" target="_blank"><img src="https://opencollective.com/preact/sponsor/7/avatar.svg"></a>
<a href="https://opencollective.com/preact/sponsor/8/website" target="_blank"><img src="https://opencollective.com/preact/sponsor/8/avatar.svg"></a>
<a href="https://opencollective.com/preact/sponsor/9/website" target="_blank"><img src="https://opencollective.com/preact/sponsor/9/avatar.svg"></a>
<a href="https://opencollective.com/preact/sponsor/10/website" target="_blank"><img src="https://opencollective.com/preact/sponsor/10/avatar.svg"></a>
<a href="https://opencollective.com/preact/sponsor/11/website" target="_blank"><img src="https://opencollective.com/preact/sponsor/11/avatar.svg"></a>
<a href="https://opencollective.com/preact/sponsor/12/website" target="_blank"><img src="https://opencollective.com/preact/sponsor/12/avatar.svg"></a>
<a href="https://opencollective.com/preact/sponsor/13/website" target="_blank"><img src="https://opencollective.com/preact/sponsor/13/avatar.svg"></a>
<a href="https://opencollective.com/preact/sponsor/14/website" target="_blank"><img src="https://opencollective.com/preact/sponsor/14/avatar.svg"></a>
<a href="https://opencollective.com/preact/sponsor/15/website" target="_blank"><img src="https://opencollective.com/preact/sponsor/15/avatar.svg"></a>
<a href="https://github.com/guardian" target="_blank"> &nbsp; &nbsp; &nbsp; <img src="https://github.com/guardian.png" width="64" height="64"> &nbsp; &nbsp; &nbsp; </a>
<a href="https://opencollective.com/preact/sponsor/16/website" target="_blank"><img src="https://opencollective.com/preact/sponsor/16/avatar.svg"></a>
<a href="https://opencollective.com/preact/sponsor/17/website" target="_blank"><img src="https://opencollective.com/preact/sponsor/17/avatar.svg"></a>
<a href="https://opencollective.com/preact/sponsor/18/website" target="_blank"><img src="https://opencollective.com/preact/sponsor/18/avatar.svg"></a>
<a href="https://opencollective.com/preact/sponsor/19/website" target="_blank"><img src="https://opencollective.com/preact/sponsor/19/avatar.svg"></a>
<a href="https://opencollective.com/preact/sponsor/20/website" target="_blank"><img src="https://opencollective.com/preact/sponsor/20/avatar.svg"></a>
<a href="https://opencollective.com/preact/sponsor/21/website" target="_blank"><img src="https://opencollective.com/preact/sponsor/21/avatar.svg"></a>
<a href="https://opencollective.com/preact/sponsor/22/website" target="_blank"><img src="https://opencollective.com/preact/sponsor/22/avatar.svg"></a>
<a href="https://opencollective.com/preact/sponsor/23/website" target="_blank"><img src="https://opencollective.com/preact/sponsor/23/avatar.svg"></a>
<a href="https://opencollective.com/preact/sponsor/24/website" target="_blank"><img src="https://opencollective.com/preact/sponsor/24/avatar.svg"></a>
<a href="https://opencollective.com/preact/sponsor/25/website" target="_blank"><img src="https://opencollective.com/preact/sponsor/25/avatar.svg"></a>
<a href="https://opencollective.com/preact/sponsor/26/website" target="_blank"><img src="https://opencollective.com/preact/sponsor/26/avatar.svg"></a>
<a href="https://opencollective.com/preact/sponsor/27/website" target="_blank"><img src="https://opencollective.com/preact/sponsor/27/avatar.svg"></a>
<a href="https://opencollective.com/preact/sponsor/28/website" target="_blank"><img src="https://opencollective.com/preact/sponsor/28/avatar.svg"></a>
<a href="https://opencollective.com/preact/sponsor/29/website" target="_blank"><img src="https://opencollective.com/preact/sponsor/29/avatar.svg"></a>

## Backers

Support us with a monthly donation and help us continue our activities. [[Become a backer](https://opencollective.com/preact#backer)]

<a href="https://opencollective.com/preact/backer/0/website" target="_blank"><img src="https://opencollective.com/preact/backer/0/avatar.svg"></a>
<a href="https://opencollective.com/preact/backer/1/website" target="_blank"><img src="https://opencollective.com/preact/backer/1/avatar.svg"></a>
<a href="https://opencollective.com/preact/backer/2/website" target="_blank"><img src="https://opencollective.com/preact/backer/2/avatar.svg"></a>
<a href="https://opencollective.com/preact/backer/3/website" target="_blank"><img src="https://opencollective.com/preact/backer/3/avatar.svg"></a>
<a href="https://opencollective.com/preact/backer/4/website" target="_blank"><img src="https://opencollective.com/preact/backer/4/avatar.svg"></a>
<a href="https://opencollective.com/preact/backer/5/website" target="_blank"><img src="https://opencollective.com/preact/backer/5/avatar.svg"></a>
<a href="https://opencollective.com/preact/backer/6/website" target="_blank"><img src="https://opencollective.com/preact/backer/6/avatar.svg"></a>
<a href="https://opencollective.com/preact/backer/7/website" target="_blank"><img src="https://opencollective.com/preact/backer/7/avatar.svg"></a>
<a href="https://opencollective.com/preact/backer/8/website" target="_blank"><img src="https://opencollective.com/preact/backer/8/avatar.svg"></a>
<a href="https://opencollective.com/preact/backer/9/website" target="_blank"><img src="https://opencollective.com/preact/backer/9/avatar.svg"></a>
<a href="https://opencollective.com/preact/backer/10/website" target="_blank"><img src="https://opencollective.com/preact/backer/10/avatar.svg"></a>
<a href="https://opencollective.com/preact/backer/11/website" target="_blank"><img src="https://opencollective.com/preact/backer/11/avatar.svg"></a>
<a href="https://opencollective.com/preact/backer/12/website" target="_blank"><img src="https://opencollective.com/preact/backer/12/avatar.svg"></a>
<a href="https://opencollective.com/preact/backer/13/website" target="_blank"><img src="https://opencollective.com/preact/backer/13/avatar.svg"></a>
<a href="https://opencollective.com/preact/backer/14/website" target="_blank"><img src="https://opencollective.com/preact/backer/14/avatar.svg"></a>
<a href="https://opencollective.com/preact/backer/15/website" target="_blank"><img src="https://opencollective.com/preact/backer/15/avatar.svg"></a>
<a href="https://opencollective.com/preact/backer/16/website" target="_blank"><img src="https://opencollective.com/preact/backer/16/avatar.svg"></a>
<a href="https://opencollective.com/preact/backer/17/website" target="_blank"><img src="https://opencollective.com/preact/backer/17/avatar.svg"></a>
<a href="https://opencollective.com/preact/backer/18/website" target="_blank"><img src="https://opencollective.com/preact/backer/18/avatar.svg"></a>
<a href="https://opencollective.com/preact/backer/19/website" target="_blank"><img src="https://opencollective.com/preact/backer/19/avatar.svg"></a>
<a href="https://opencollective.com/preact/backer/20/website" target="_blank"><img src="https://opencollective.com/preact/backer/20/avatar.svg"></a>
<a href="https://opencollective.com/preact/backer/21/website" target="_blank"><img src="https://opencollective.com/preact/backer/21/avatar.svg"></a>
<a href="https://opencollective.com/preact/backer/22/website" target="_blank"><img src="https://opencollective.com/preact/backer/22/avatar.svg"></a>
<a href="https://opencollective.com/preact/backer/23/website" target="_blank"><img src="https://opencollective.com/preact/backer/23/avatar.svg"></a>
<a href="https://opencollective.com/preact/backer/24/website" target="_blank"><img src="https://opencollective.com/preact/backer/24/avatar.svg"></a>
<a href="https://opencollective.com/preact/backer/25/website" target="_blank"><img src="https://opencollective.com/preact/backer/25/avatar.svg"></a>
<a href="https://opencollective.com/preact/backer/26/website" target="_blank"><img src="https://opencollective.com/preact/backer/26/avatar.svg"></a>
<a href="https://opencollective.com/preact/backer/27/website" target="_blank"><img src="https://opencollective.com/preact/backer/27/avatar.svg"></a>
<a href="https://opencollective.com/preact/backer/28/website" target="_blank"><img src="https://opencollective.com/preact/backer/28/avatar.svg"></a>
<a href="https://opencollective.com/preact/backer/29/website" target="_blank"><img src="https://opencollective.com/preact/backer/29/avatar.svg"></a>

---

## License

MIT

[![Preact](https://i.imgur.com/YqCHvEW.gif)](https://preactjs.com)

[preact/compat]: https://github.com/preactjs/preact/tree/main/compat
[DevTools]: https://github.com/preactjs/preact-devtools
