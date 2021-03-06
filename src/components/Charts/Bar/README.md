---
order: 101
title: Bar图形参数说明
---

## option 参数说明

### title 
- 标题组件，包含主标题和副标题。

> 在 ECharts 2.x 中单个 ECharts 实例最多只能拥有一个标题组件。但是在 ECharts 3 中可以存在任意多个标题组件，这在需要标题进行排版，或者单个实例中的多个图表都需要标题时会比较有用。


| 参数名 | 参数类型 | 参数数据类型 | 参数说明 | 参数默认值 | 
| --- | --- | --- | --- | --- |
| id | 可选 | string | 组件 ID。默认不指定。指定则可用于在 option 或者 API 中引用组件。| '' |
| show | 必选 | boolean | 是否显示标题组件。| false |
| text | 可选 | string | 主标题文本，支持使用 \n 换行。 | '' |
| link | 可选 | string | 主标题文本超链接。| '' |
| target | 可选 | string | 指定窗口打开主标题超链接。'self' 当前窗口打开;'blank' 新窗口打开 | '' | 
| subtext | 可选 | string | 副标题文本，支持使用 \n 换行。| '' |


------

### legend
- 图例组件。
- 图例组件展现了不同系列的标记(symbol)，颜色和名字。可以通过点击图例控制哪些系列不显示。
- ECharts 3 中单个 echarts 实例中可以存在多个图例组件，会方便多个图例的布局。
- 当图例数量过多时，可以使用 滚动图例（垂直） 或 滚动图例（水平），参见：legend.type

| 参数名 | 参数类型 | 参数数据类型 | 参数说明 | 参数默认值 | 
| --- | --- | --- | --- | --- |
| type | 可选 | string | 图例的类型。可选值：`'plain'`：普通图例。缺省就是普通图例。`'scroll'`：可滚动翻页的图例。当图例数量较多时可以使用。| '' |
| id | 可选 | string | 组件 ID。默认不指定。指定则可用于在 option 或者 API 中引用组件。| '' |
| show | 可选 | boolean | 是否显示图例组件。| false |
| data | 可选 | array | 图例的数据数组。数组项通常为一个字符串，每一项代表一个系列的 name（如果是饼图，也可以是饼图单个数据的 name）。图例组件会自动根据对应系列的图形标记（symbol）来绘制自己的颜色和标记，特殊字符串 ''（空字符串）或者 '\n'（换行字符串）用于图例的换行。\n如果 data 没有被指定，会自动从当前系列中获取。多数系列会取自 series.name 或者 series.encode 的 seriesName 所指定的维度。如 饼图 and 漏斗图 等会取自 series.data 中的 name。\n 如果要设置单独一项的样式，也可以把该项写成配置项对象。此时必须使用 name 属性对应表示系列的 name。 | data: [{name: '系列1',// 强制设置图形为圆。icon: 'circle',// 设置文本为红色textStyle: {color: 'red'}}] |
| data.name | string | 图例项的名称，应等于某系列的name值（如果是饼图，也可以是饼图单个数据的 name）。 | '' |
| data.icon | string | 图例项的 icon。ECharts 提供的标记类型包括 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'。可以通过 'image://url' 设置为图片，其中 URL 为图片的链接，或者 dataURI。 | 'none' |




------

------

### tooltip 
- 提示框组件。
- 

## 将DOM Refs 暴露给父组件

在极少数情况下, 你可能希望在父组件中引用子节点的DOM节点。
> 通常不建议这么做, 因为它会打破组件的封装，但它偶尔可用于触发焦点或者测量子DOM节点的大小或者位置。

虽然你可以向子组件调价ref, 但这不是一个理想的解决方案, 因为你只能获取组件实例而不是DOM节点。并且, 它还在函数组件上无效。

