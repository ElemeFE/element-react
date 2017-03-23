## Pagination

If you have too much data to display in one page, use pagination.

### Basic usage

:::demo Set `layout` with different pagination elements you wish to display separated with a comma. Pagination elements are: `prev` (a button navigating to the previous page), `next` (a button navigating to the next page), `pager` (page list), `jumper` (a jump-to input), `total` (total item count), `size` (a select to determine page size) and `->`(every element after this symbol will be pulled to the right).
```js
render() {
  return (
    <div className="first">
      <div className="block">
        <span className="demonstration">When you have few pages</span>
        <Pagination layout="prev, pager, next" total={50}/>
      </div>
      <div className="block">
        <span className="demonstration">When you have more than 7 pages</span>
        <Pagination layout="prev, pager, next" total={1000}/>
      </div>
    </div>
  )
}
```
:::

### Small Pagination

Use small pagination in the case of limited space.

:::demo Just set the `small` attribute to `true` and the Pagination becomes smaller.
```js
render() {
  return <Pagination layout="prev, pager, next" total={50} small={true}/>
}
```
:::

### More elements

Add more modules based on your scenario.

:::demo This example is a complete use case. It uses `size-change` and `current-change` event to handle page size changes and current page changes. `page-sizes` accepts an array of integers, each of which represents a different page size in the `sizes` select options, e.g. `[100, 200, 300, 400]` indicates that the select will have four options: 100, 200, 300 or 400 items per page.

```js
render() {
  return (
    <div className="last">
      <div className="block">
        <span className="demonstration">Total item count</span>
        <Pagination layout="total, prev, pager, next" total={1000}/>
      </div>
      <div className="block">
        <span className="demonstration">Change page size</span>
        <Pagination layout="sizes, prev, pager, next" total={1000} pageSizes={[100, 200, 300, 400]} pageSize={1000}/>
      </div>
      <div className="block">
        <span className="demonstration">Jump to</span>
        <Pagination layout="prev, pager, next, jumper" total={1000} pageSize={100} currentPage={5}/>
      </div>
      <div className="block">
        <span className="demonstration">All combined</span>
        <Pagination layout="total, sizes, prev, pager, next, jumper" total={400} pageSizes={[100, 200, 300, 400]} pageSize={100} currentPage={5}/>
      </div>
    </div>
  )
}
```
:::

### Attributes
| Attribute      | Description          | Type      | Accepted Values       | Default  |
|--------------------|----------------------------------------------------------|-------------------|-------------|--------|
| small              |   whether to use small pagination    | boolean |      —       | false |
| pageSize              | item count of each page  | number |      —       | 10 |
| total | total item count | number | — | — |
| pageCount | total page count. Set either `total` or `page-count` and pages will be displayed; if you need `pageSizes`, `total` is required | number | — | — |
| currentPage | current page number | number | — | 1 |
| layout | layout of Pagination, elements separated with a comma | string | `sizes`, `prev`, `pager`, `next`, `jumper`, `->`, `total`, `slot` | 'prev, pager, next, jumper, ->, total'  |
| pageSizes | options of item count per page | number[] | — |  [10, 20, 30, 40, 50, 100] |

### Events
| Event Name | Description | Parameters |
|---------|--------|---------|
| onSizeChange | triggers when `page-size` changes | the new `page-size` |
| onCurrentChange | triggers when `current-page` changes | the new `current-page` |
