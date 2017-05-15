import * as React from 'react'
import { Rate } from 'element-react'
import { Rate as RateNext } from 'element-react/next'

class Component extends React.Component<{}, {}> {
  onChange = () => { }
  render() {
    return (
      <div>
        <Rate className="className" style={{ width: 100 }} />
        <Rate
          colors={['#99A9BF', '#F7BA2A', '#FF9900']}
          texts={['极差', '失望', '一般', '满意', '惊喜']}
          showText={true}
          textColor="red"
          disabled={true}
          value={2}
          onChange={this.onChange}
          textTemplate="{value}"
          lowThreshold={1}
          highThreshold={4}
          max={5}
          voidColor="blue"
          disabledVoidColor="gray"
          iconClasses={['el1', 'el2']}
          voidIconClass="el4"
          disabledVoidIconClass="el5"
          allowHalf={true}
        />

        <RateNext className="className" style={{ width: 100 }} />
        <RateNext
          colors={['#99A9BF', '#F7BA2A', '#FF9900']}
          texts={['极差', '失望', '一般', '满意', '惊喜']}
          showText={true}
          textColor="red"
          disabled={true}
          value={2}
          onChange={this.onChange}
          textTemplate="{value}"
          lowThreshold={1}
          highThreshold={4}
          max={5}
          voidColor="blue"
          disabledVoidColor="gray"
          iconClasses={['el1', 'el2']}
          voidIconClass="el4"
          disabledVoidIconClass="el5"
          allowHalf={true}
        />
      </div>
    )
  }
}
