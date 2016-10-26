# Element UI React

## 开发环境

```shell
npm i && npm start
```
浏览器打开http://localhost:3000, Bingo🍺

## 组件接口

目前提供了两个基础组件, Component和View.

### Component

为了保持组件的可控性, 所有自定义组件都需要继承于此Component, 而不是React.Component.

* 属性
 * className [String], 可以将className附加到组件的根元素的class上.
 * style [Object], 可以将style附加到组件的根元素的style上.

* 方法
 * classNames(className, ..., className), 参数类型参照[1], 返回类型为String.

### View

* 属性
 * if [any], Vue中的`v-if`的实现, 参考[2].
 * show [any], Vue的`v-show`的实现, 参考[3].
 * transition [String], Vue的`transition`的实现, 参考[4].

> 注意: React.Children.count(props.children) === 1

## 单元测试

项目使用**jest**来做单元测试, 执行以下命令:

```shell
npm test
```

## References
1. https://github.com/JedWatson/classnames
2. https://vuejs.org/guide/conditional.html#v-if
3. https://vuejs.org/guide/conditional.html#v-show
4. https://vuejs.org/guide/transitions.html#Transitioning-Single-Elements-Components
