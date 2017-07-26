import * as React from 'react'
import { Pagination } from 'element-react'
import { Pagination as PaginationNext } from 'element-react/next'

class Component extends React.Component<{}, {}> {
  onCurrentChange = (currentPage) => { }
  onSizeChange = (size) => { }
  layout: 'total, prev, pager, next'
  render() {
    return (
      <div>
        <Pagination className="className" style={{ width: 100 }} />
        <Pagination pageSize={2} small={true} total={5} pageCount={4} currentPage={2} layout={this.layout} pageSizes={[1, 2, 3, 4]} onCurrentChange={this.onCurrentChange} onSizeChange={this.onSizeChange} />

        <PaginationNext className="className" style={{ width: 100 }} />
        <PaginationNext pageSize={2} small={true} total={5} pageCount={4} currentPage={2} layout={this.layout} pageSizes={[1, 2, 3, 4]} onCurrentChange={this.onCurrentChange} onSizeChange={this.onSizeChange} />
      </div>
    )
  }
}
