import * as React from 'react'
import { Transfer } from 'element-react'
import { Transfer as TransferNext } from 'element-react/next'

class Component extends React.Component<{}, {}> {
  state = {
    data: [{
      value: 1,
      desc: `备选项 ${1}`,
      disabled: 1 % 4 === 0
    }]
  }
  onChange = (value, direction, movedKeys) => { }
  render() {
    const { data } = this.state
    return (
      <div>
        <Transfer className="className" style={{ width: 100 }} />
        <Transfer
          data={[]}
          titles={['1', '2']}
          buttonTexts={['1', '2']}
          filterPlaceholder="filterPlaceholder"
          filterMethod={() => { }}
          leftDefaultChecked={[]}
          rightDefaultChecked={[]}
          renderContent={(h, option) => { }}
          value={data}
          footerFormat={{ noChecked: '共 ${total} 项', hasChecked: '已选 ${checked}/${total} 项' }}
          filterable={true}
          propsAlias={{
            key: 'value',
            label: 'desc'
          }}
          onChange={this.onChange}
          leftFooter={(<div>footer</div>)}
          rightFooter={(<div>footer</div>)}
        />

        <TransferNext className="className" style={{ width: 100 }} />
        <TransferNext
          data={[]}
          titles={['1', '2']}
          buttonTexts={['1', '2']}
          filterPlaceholder="filterPlaceholder"
          filterMethod={() => { }}
          leftDefaultChecked={[]}
          rightDefaultChecked={[]}
          renderContent={(h, option) => { }}
          value={data}
          footerFormat={{ noChecked: '共 ${total} 项', hasChecked: '已选 ${checked}/${total} 项' }}
          filterable={true}
          propsAlias={{
            key: 'value',
            label: 'desc'
          }}
          onChange={this.onChange}
          leftFooter={(<div>footer</div>)}
          rightFooter={(<div>footer</div>)}
        />
      </div>
    )
  }
}
