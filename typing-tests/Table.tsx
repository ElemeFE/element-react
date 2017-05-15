import * as React from 'react'
import { Table } from 'element-react'
import { Table as TableNext } from 'element-react/next'

class Component extends React.Component<{}, {}> {
  state = {
    columns: [
      {
        label: "日期",
        prop: "date",
        width: 180
      },
      {
        label: "姓名",
        prop: "name",
        width: 180
      },
      {
        label: "地址",
        prop: "address"
      }
    ],
    data: [{
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    }, {
      date: '2016-05-04',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1517 弄'
    }, {
      date: '2016-05-01',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1519 弄'
    }, {
      date: '2016-05-03',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1516 弄'
    }, {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    }, {
      date: '2016-05-04',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1517 弄'
    }, {
      date: '2016-05-01',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1519 弄'
    }, {
      date: '2016-05-03',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1516 弄'
    }]
  }
  render() {
    const { columns, data } = this.state
    return (
      <div>
        <Table className="className" style={{ width: 100 }} />
        <Table
          columns={columns}
          data={data}
          border={true}
          height={250}
        />

        <TableNext className="className" style={{ width: 100 }} />
        <TableNext
          columns={columns}
          data={data}
          border={true}
          height={250}
        />
      </div>
    )
  }
}

// TODO: 完善 Table 的测试
