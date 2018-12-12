## Input 输入框

通过鼠标或键盘输入字符

### 基础用法

::: demo
```js
render() {
  return <Input placeholder="请输入内容" />
}
```
:::


### 禁用状态

::: demo 通过 `disabled` 属性指定是否禁用 input 组件
```js
render() {
  return <Input disabled placeholder="请输入内容" />
}
```
:::

### 带 icon 的输入框

带有图标标记输入类型

::: demo 可以通过 `icon` 属性在 input 组件尾部增加显示图标。
```js
handleIconClick(ev) {

}

render() {
  return (
    <Input
      icon="time"
      placeholder="请选择日期"
      onIconClick={this.handleIconClick.bind(this)}
    />
  )
}
```
:::

### 文本域

可调整大小，用于输入多行文本信息

::: demo 通过将 `type` 属性的值指定为 textarea。
```js
render() {
  return (
    <Input
      type="textarea"
      autosize={{ minRows: 2, maxRows: 4}}
      placeholder="请输入内容"
    />
  )
}
```
:::

### 可自适应文本高度的文本域

通过设置 `autosize` 属性可以使得文本域的高度能够根据文本内容自动进行调整，并且 `autosize` 还可以设定为一个对象，指定最小行数和最大行数。

::: demo
```js
render() {
  return (
    <div>
      <Input
        type="textarea"
        autosize={true}
        placeholder="请输入内容"
      />
      <div style={{ margin: '20px 0' }}></div>
      <Input
        type="textarea"
        autosize={{ minRows: 2, maxRows: 4}}
        placeholder="请输入内容"
      />
    </div>
  )
}
```
:::

### 复合型输入框

可前置或后置元素，一般为标签或按钮

::: demo 可通过 prepend 和 append 来指定在 input 中前置或者后置内容。
```js
render() {
  return (
    <div>
      <Input placeholder="请输入内容" prepend="Http://" />
      <Input placeholder="请输入内容" append=".com" />
      <Input placeholder="请输入内容" prepend={
        <Select value="">
          {
            ['餐厅名', '订单号', '用户电话'].map((item, index) => <Select.Option key={index} label={item} value={index} />)
          }
        </Select>
      } append={<Button type="primary" icon="search">搜索</Button>} />
    </div>
  )
}
```
:::

### 尺寸

::: demo 可通过 `size` 属性指定输入框的尺寸，除了默认的大小外，还提供了 large、small 和 mini 三种尺寸。
```js
render() {
  return (
    <div className="inline-input">
      <Input placeholder="请输入内容" size="large" />
      <Input placeholder="请输入内容" />
      <Input placeholder="请输入内容" size="small" />
      <Input placeholder="请输入内容" size="mini" />
    </div>
  )
}
```
:::

### 带输入建议

根据输入内容提供对应的输入建议, 依赖autoComplete

::: demo Autocomplete 是一个可带输入建议的输入框组件，
```js
constructor(props) {
  super(props);

  this.state = {
    restaurants: [
      { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
      { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
      { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
      { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
      { "value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
      { "value": "贡茶", "address": "上海市长宁区金钟路633号" },
      { "value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号" },
      { "value": "茶芝兰（奶茶，手抓饼）", "address": "上海市普陀区同普路1435号" },
      { "value": "十二泷町", "address": "上海市北翟路1444弄81号B幢-107" },
      { "value": "星移浓缩咖啡", "address": "上海市嘉定区新郁路817号" },
      { "value": "阿姨奶茶/豪大大", "address": "嘉定区曹安路1611号" },
      { "value": "新麦甜四季甜品炸鸡", "address": "嘉定区曹安公路2383弄55号" },
      { "value": "Monica摩托主题咖啡店", "address": "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F" },
      { "value": "浮生若茶（凌空soho店）", "address": "上海长宁区金钟路968号9号楼地下一层" },
      { "value": "NONO JUICE  鲜榨果汁", "address": "上海市长宁区天山西路119号" },
      { "value": "CoCo都可(北新泾店）", "address": "上海市长宁区仙霞西路" },
      { "value": "快乐柠檬（神州智慧店）", "address": "上海市长宁区天山西路567号1层R117号店铺" },
      { "value": "Merci Paul cafe", "address": "上海市普陀区光复西路丹巴路28弄6号楼819" },
      { "value": "猫山王（西郊百联店）", "address": "上海市长宁区仙霞西路88号第一层G05-F01-1-306" },
      { "value": "枪会山", "address": "上海市普陀区棕榈路" },
      { "value": "纵食", "address": "元丰天山花园(东门) 双流路267号" },
      { "value": "钱记", "address": "上海市长宁区天山西路" },
      { "value": "壹杯加", "address": "上海市长宁区通协路" },
      { "value": "唦哇嘀咖", "address": "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元" },
      { "value": "爱茜茜里(西郊百联)", "address": "长宁区仙霞西路88号1305室" },
      { "value": "爱茜茜里(近铁广场)", "address": "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺" },
      { "value": "鲜果榨汁（金沙江路和美广店）", "address": "普陀区金沙江路2239号金沙和美广场B1-10-6" },
      { "value": "开心丽果（缤谷店）", "address": "上海市长宁区威宁路天山路341号" },
      { "value": "超级鸡车（丰庄路店）", "address": "上海市嘉定区丰庄路240号" },
      { "value": "妙生活果园（北新泾店）", "address": "长宁区新渔路144号" },
      { "value": "香宜度麻辣香锅", "address": "长宁区淞虹路148号" },
      { "value": "凡仔汉堡（老真北路店）", "address": "上海市普陀区老真北路160号" },
      { "value": "港式小铺", "address": "上海市长宁区金钟路968号15楼15-105室" },
      { "value": "蜀香源麻辣香锅（剑河路店）", "address": "剑河路443-1" },
      { "value": "北京饺子馆", "address": "长宁区北新泾街道天山西路490-1号" },
      { "value": "饭典*新简餐（凌空SOHO店）", "address": "上海市长宁区金钟路968号9号楼地下一层9-83室" },
      { "value": "焦耳·川式快餐（金钟路店）", "address": "上海市金钟路633号地下一层甲部" },
      { "value": "动力鸡车", "address": "长宁区仙霞西路299弄3号101B" },
      { "value": "浏阳蒸菜", "address": "天山西路430号" },
      { "value": "四海游龙（天山西路店）", "address": "上海市长宁区天山西路" },
      { "value": "樱花食堂（凌空店）", "address": "上海市长宁区金钟路968号15楼15-105室" },
      { "value": "壹分米客家传统调制米粉(天山店)", "address": "天山西路428号" },
      { "value": "福荣祥烧腊（平溪路店）", "address": "上海市长宁区协和路福泉路255弄57-73号" },
      { "value": "速记黄焖鸡米饭", "address": "上海市长宁区北新泾街道金钟路180号1层01号摊位" },
      { "value": "红辣椒麻辣烫", "address": "上海市长宁区天山西路492号" },
      { "value": "(小杨生煎)西郊百联餐厅", "address": "长宁区仙霞西路88号百联2楼" },
      { "value": "阳阳麻辣烫", "address": "天山西路389号" },
      { "value": "南拳妈妈龙虾盖浇饭", "address": "普陀区金沙江路1699号鑫乐惠美食广场A13" }
    ],
    value1: '',
    value2: ''
  }
}

querySearch(queryString, cb) {
  const { restaurants } = this.state;
  const results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
  // 调用 callback 返回建议列表的数据
  cb(results);
}

createFilter(queryString) {
  return (restaurant) => {
    return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
  };
}

handleSelect(item) {

}

render() {
  return (
    <Layout.Row className="inline-input border-grid">
      <Layout.Col span="12" className="tac">
        <div className="text">激活即列出输入建议</div>
        <AutoComplete
          placeholder="请输入内容"
          value={this.state.value1}
          onFocus={e=>console.log(e, 'onFocus')}
          onBlur={e=>console.log(e, 'onblur')}
          fetchSuggestions={this.querySearch.bind(this)}
          onSelect={this.handleSelect.bind(this)}
        ></AutoComplete>
      </Layout.Col>
      <Layout.Col span="12" className="tac">
        <div className="text">输入后匹配输入建议</div>
        <AutoComplete
          placeholder="请输入内容"
          value={this.state.value2}
          fetchSuggestions={this.querySearch.bind(this)}
          onSelect={this.handleSelect.bind(this)}
          triggerOnFocus={false}
        ></AutoComplete>
      </Layout.Col>
    </Layout.Row>
  )
}
```
:::

### 自定义模板

可自定义输入建议的显示，依赖AutoComplete

::: demo Autocomplete 是一个可带输入建议的输入框组件，
```js
constructor(props) {
  super(props);

  this.state = {
    restaurants: [
      { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
      { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
      { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
      { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
      { "value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
      { "value": "贡茶", "address": "上海市长宁区金钟路633号" },
      { "value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号" },
      { "value": "茶芝兰（奶茶，手抓饼）", "address": "上海市普陀区同普路1435号" },
      { "value": "十二泷町", "address": "上海市北翟路1444弄81号B幢-107" },
      { "value": "星移浓缩咖啡", "address": "上海市嘉定区新郁路817号" },
      { "value": "阿姨奶茶/豪大大", "address": "嘉定区曹安路1611号" },
      { "value": "新麦甜四季甜品炸鸡", "address": "嘉定区曹安公路2383弄55号" },
      { "value": "Monica摩托主题咖啡店", "address": "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F" },
      { "value": "浮生若茶（凌空soho店）", "address": "上海长宁区金钟路968号9号楼地下一层" },
      { "value": "NONO JUICE  鲜榨果汁", "address": "上海市长宁区天山西路119号" },
      { "value": "CoCo都可(北新泾店）", "address": "上海市长宁区仙霞西路" },
      { "value": "快乐柠檬（神州智慧店）", "address": "上海市长宁区天山西路567号1层R117号店铺" },
      { "value": "Merci Paul cafe", "address": "上海市普陀区光复西路丹巴路28弄6号楼819" },
      { "value": "猫山王（西郊百联店）", "address": "上海市长宁区仙霞西路88号第一层G05-F01-1-306" },
      { "value": "枪会山", "address": "上海市普陀区棕榈路" },
      { "value": "纵食", "address": "元丰天山花园(东门) 双流路267号" },
      { "value": "钱记", "address": "上海市长宁区天山西路" },
      { "value": "壹杯加", "address": "上海市长宁区通协路" },
      { "value": "唦哇嘀咖", "address": "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元" },
      { "value": "爱茜茜里(西郊百联)", "address": "长宁区仙霞西路88号1305室" },
      { "value": "爱茜茜里(近铁广场)", "address": "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺" },
      { "value": "鲜果榨汁（金沙江路和美广店）", "address": "普陀区金沙江路2239号金沙和美广场B1-10-6" },
      { "value": "开心丽果（缤谷店）", "address": "上海市长宁区威宁路天山路341号" },
      { "value": "超级鸡车（丰庄路店）", "address": "上海市嘉定区丰庄路240号" },
      { "value": "妙生活果园（北新泾店）", "address": "长宁区新渔路144号" },
      { "value": "香宜度麻辣香锅", "address": "长宁区淞虹路148号" },
      { "value": "凡仔汉堡（老真北路店）", "address": "上海市普陀区老真北路160号" },
      { "value": "港式小铺", "address": "上海市长宁区金钟路968号15楼15-105室" },
      { "value": "蜀香源麻辣香锅（剑河路店）", "address": "剑河路443-1" },
      { "value": "北京饺子馆", "address": "长宁区北新泾街道天山西路490-1号" },
      { "value": "饭典*新简餐（凌空SOHO店）", "address": "上海市长宁区金钟路968号9号楼地下一层9-83室" },
      { "value": "焦耳·川式快餐（金钟路店）", "address": "上海市金钟路633号地下一层甲部" },
      { "value": "动力鸡车", "address": "长宁区仙霞西路299弄3号101B" },
      { "value": "浏阳蒸菜", "address": "天山西路430号" },
      { "value": "四海游龙（天山西路店）", "address": "上海市长宁区天山西路" },
      { "value": "樱花食堂（凌空店）", "address": "上海市长宁区金钟路968号15楼15-105室" },
      { "value": "壹分米客家传统调制米粉(天山店)", "address": "天山西路428号" },
      { "value": "福荣祥烧腊（平溪路店）", "address": "上海市长宁区协和路福泉路255弄57-73号" },
      { "value": "速记黄焖鸡米饭", "address": "上海市长宁区北新泾街道金钟路180号1层01号摊位" },
      { "value": "红辣椒麻辣烫", "address": "上海市长宁区天山西路492号" },
      { "value": "(小杨生煎)西郊百联餐厅", "address": "长宁区仙霞西路88号百联2楼" },
      { "value": "阳阳麻辣烫", "address": "天山西路389号" },
      { "value": "南拳妈妈龙虾盖浇饭", "address": "普陀区金沙江路1699号鑫乐惠美食广场A13" }
    ],
    value: ''
  }
}

querySearch(queryString, cb) {
  const { restaurants } = this.state;
  const results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
  // 调用 callback 返回建议列表的数据
  cb(results);
}

createFilter(queryString) {
  return (restaurant) => {
    return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
  };
}

handleSelect(item) {

}

render() {
  return (
    <AutoComplete
      className="my-autocomplete"
      icon="edit"
      placeholder="请输入内容"
      value={this.state.value}
      fetchSuggestions={this.querySearch.bind(this)}
      customItem={this.props.customItem}
      onSelect={this.handleSelect.bind(this)}
    ></AutoComplete>
  )
}
```
:::

### 远程搜索

从服务端搜索数据，依赖AutoComplete

::: demo Autocomplete 是一个可带输入建议的输入框组件，
```js
constructor(props) {
  super(props);

  this.state = {
    restaurants: [
      { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
      { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
      { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
      { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
      { "value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
      { "value": "贡茶", "address": "上海市长宁区金钟路633号" },
      { "value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号" },
      { "value": "茶芝兰（奶茶，手抓饼）", "address": "上海市普陀区同普路1435号" },
      { "value": "十二泷町", "address": "上海市北翟路1444弄81号B幢-107" },
      { "value": "星移浓缩咖啡", "address": "上海市嘉定区新郁路817号" },
      { "value": "阿姨奶茶/豪大大", "address": "嘉定区曹安路1611号" },
      { "value": "新麦甜四季甜品炸鸡", "address": "嘉定区曹安公路2383弄55号" },
      { "value": "Monica摩托主题咖啡店", "address": "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F" },
      { "value": "浮生若茶（凌空soho店）", "address": "上海长宁区金钟路968号9号楼地下一层" },
      { "value": "NONO JUICE  鲜榨果汁", "address": "上海市长宁区天山西路119号" },
      { "value": "CoCo都可(北新泾店）", "address": "上海市长宁区仙霞西路" },
      { "value": "快乐柠檬（神州智慧店）", "address": "上海市长宁区天山西路567号1层R117号店铺" },
      { "value": "Merci Paul cafe", "address": "上海市普陀区光复西路丹巴路28弄6号楼819" },
      { "value": "猫山王（西郊百联店）", "address": "上海市长宁区仙霞西路88号第一层G05-F01-1-306" },
      { "value": "枪会山", "address": "上海市普陀区棕榈路" },
      { "value": "纵食", "address": "元丰天山花园(东门) 双流路267号" },
      { "value": "钱记", "address": "上海市长宁区天山西路" },
      { "value": "壹杯加", "address": "上海市长宁区通协路" },
      { "value": "唦哇嘀咖", "address": "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元" },
      { "value": "爱茜茜里(西郊百联)", "address": "长宁区仙霞西路88号1305室" },
      { "value": "爱茜茜里(近铁广场)", "address": "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺" },
      { "value": "鲜果榨汁（金沙江路和美广店）", "address": "普陀区金沙江路2239号金沙和美广场B1-10-6" },
      { "value": "开心丽果（缤谷店）", "address": "上海市长宁区威宁路天山路341号" },
      { "value": "超级鸡车（丰庄路店）", "address": "上海市嘉定区丰庄路240号" },
      { "value": "妙生活果园（北新泾店）", "address": "长宁区新渔路144号" },
      { "value": "香宜度麻辣香锅", "address": "长宁区淞虹路148号" },
      { "value": "凡仔汉堡（老真北路店）", "address": "上海市普陀区老真北路160号" },
      { "value": "港式小铺", "address": "上海市长宁区金钟路968号15楼15-105室" },
      { "value": "蜀香源麻辣香锅（剑河路店）", "address": "剑河路443-1" },
      { "value": "北京饺子馆", "address": "长宁区北新泾街道天山西路490-1号" },
      { "value": "饭典*新简餐（凌空SOHO店）", "address": "上海市长宁区金钟路968号9号楼地下一层9-83室" },
      { "value": "焦耳·川式快餐（金钟路店）", "address": "上海市金钟路633号地下一层甲部" },
      { "value": "动力鸡车", "address": "长宁区仙霞西路299弄3号101B" },
      { "value": "浏阳蒸菜", "address": "天山西路430号" },
      { "value": "四海游龙（天山西路店）", "address": "上海市长宁区天山西路" },
      { "value": "樱花食堂（凌空店）", "address": "上海市长宁区金钟路968号15楼15-105室" },
      { "value": "壹分米客家传统调制米粉(天山店)", "address": "天山西路428号" },
      { "value": "福荣祥烧腊（平溪路店）", "address": "上海市长宁区协和路福泉路255弄57-73号" },
      { "value": "速记黄焖鸡米饭", "address": "上海市长宁区北新泾街道金钟路180号1层01号摊位" },
      { "value": "红辣椒麻辣烫", "address": "上海市长宁区天山西路492号" },
      { "value": "(小杨生煎)西郊百联餐厅", "address": "长宁区仙霞西路88号百联2楼" },
      { "value": "阳阳麻辣烫", "address": "天山西路389号" },
      { "value": "南拳妈妈龙虾盖浇饭", "address": "普陀区金沙江路1699号鑫乐惠美食广场A13" }
    ],
    value: ''
  }
}

querySearchAsync(queryString, cb) {
  const { restaurants } = this.state;
  const results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;

  clearTimeout(this.timeout);

  this.timeout = setTimeout(() => {
    cb(results);
  }, 3000 * Math.random());
}

createFilter(queryString) {
  return (restaurant) => {
    return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
  };
}

handleSelect(item) {

}

render() {
  return (
    <AutoComplete
      placeholder="请输入内容"
      value={this.state.value}
      fetchSuggestions={this.querySearchAsync.bind(this)}
      onSelect={this.handleSelect.bind(this)}
    ></AutoComplete>
  )
}
```
:::

### Input Attributes

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| type         | 类型   | string  | text/textarea | text |
| value         | 绑定值           | string, number  | — | — |
| maxLength     | 最大输入长度      | number          |  —  | — |
| minLength     | 最小输入长度      | number          | — | — |
| placeholder   | 输入框占位文本    | string          | — | — |
| disabled      | 禁用            | boolean         | — | false   |
| size          | 输入框尺寸，只在 `type!="textarea"` 时有效      | string          | large, small, mini  | — |
| icon          | 输入框尾部图标    | string          | — | — |
| rows          | 输入框行数，只对 `type="textarea"` 有效  |  number | — |  2   |
| autosize      | 自适应内容高度，只对 `type="textarea"` 有效，可传入对象，如，{ minRows: 2, maxRows: 6 }  |  boolean/object | — |  false   |
| autoComplete | 原生属性，自动补全 | string | on, off | off |
| name | 原生属性 | string | — | — |
| readOnly | 原生属性，是否只读 | boolean | — | false |
| max | 原生属性，设置最大值 | — | — | — |
| min | 原生属性，设置最小值 | — | — | — |
| step | 原生属性，设置输入字段的合法数字间隔 | — | — | — |
| resize | 控制是否能被用户缩放 | string | none, both, horizontal, vertical | — |
| autoFocus | 原生属性，自动获取焦点 | boolean | true, false | false |
| onIconClick | 点击 Input 内的图标的钩子函数 | function | — | — |
| trim          | 对input内容进行trim    | boolean    | — | false |

### Autocomplete Attributes

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| placeholder   | 输入框占位文本   | string          | — | — |
| disabled      | 禁用            | boolean         | — | false   |
| value         | 必填值输入绑定值   | string  | — | — |
| customItem  | 通过该参数指定自定义的输入建议列表项的组件名 | Element  | — | — |
| fetchSuggestions | 返回输入建议的方法，仅当你的输入建议数据 resolve 时，通过调用 callback(data:[]) 来返回它  | Function(queryString, callback)  | — | — |
| popperClass | Autocomplete 下拉列表的类名 | string | — | — |
| triggerOnFocus | 是否在输入框 focus 时显示建议列表 | boolean | — | true |
| onIconClick | 点击图标的回调函数 | function | — | — |
| icon          | 输入框尾部图标    | string          | — | — |

### Autocomplete Events
| 事件名称 | 说明 | 回调参数 |
|---------|--------|---------|
| onSelect | 点击选中建议项时触发 | 选中建议项 |
