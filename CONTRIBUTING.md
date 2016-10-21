# Element React Contributing Guide

## 开发环境

```shell
npm i && npm start
```
然后在浏览器里打开http://localhost:3000, Bingo🍺

## 项目目录

* src 包含了所有的UI组件, 类似element-ui的packages目录
* libs 提供了一些私有的组件和工具类, 比如组件基类Component, **所有的UI组件都需要继承Component**.
  * Component 继承于React.Component, 但是封装了一些方法, 比如classNames, 特殊处理了一些自定义的全局属性, 比如className和style.
  * Transition 类似Vue的transtion实现.
  * View 用来实现Vue里的v-if和v-show.
* demo 用于UI组件开发的演示, 用到了web-dev-server和react-hot-loader.
* themes 将element编译后的主题css放到了此目录下

> *可以参考Alert组件来做开发*

## 基础组件
为了方便的将Vue组件转变为React组件, 提供了一些类似的组件, 在移植Vue组件的时候可以考虑使用

### Transition

* name <String>

```js
// Vue
<transition name="el-alert-fade">
...
</transition>
```

```js
// React
<Transition name="el-alert-fade">
...
</Transition>
```

### View

* if <Boolean> 控制DOM的状态

```js
// Vue
<i class="el-alert__icon" :class="[ iconClass, isBigIcon ]" v-if="showIcon"></i>
```

```js
// React
<View if={this.props.showIcon}>
  <i className={this.classNames('el-alert__icon', TYPE_CLASSES_MAP[this.props.type] || 'el-icon-information', {'is-big': this.props.description})}></i>
</View>
```

* show <Boolean> 控制DOM的display样式

```js
// Vue
<i class="el-alert__closebtn" :class="{ 'is-customed': closeText !== '', 'el-icon-close': closeText === '' }" v-show="closable" @click="close()">{{closeText}}</i>
```

```js
// React
<View show={this.props.closable}>
  <i className={this.classNames('el-alert__closebtn', this.props.closeText ? 'is-customed' : 'el-icon-close')} onClick={this.close.bind(this)}>{this.props.closeText}</i>
</View>
```

## 组建演示

> TODO

## 编译打包

> TODO
