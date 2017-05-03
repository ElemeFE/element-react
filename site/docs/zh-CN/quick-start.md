## 快速上手

### 安装
推荐使用 npm 的方式安装，它能更好地和`webpack`打包工具配合使用。

```shell
npm i element-react --save
```

### 主题
开始前, 你还需要一个主题包, 这里我们推荐使用`element-theme-default`.

```shell
npm install element-theme-default --save
```

### 使用

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'element-react';

import 'element-theme-default';

ReactDOM.render(<Button type="primary">Hello</Button>, document.getElementById('app'));

```
