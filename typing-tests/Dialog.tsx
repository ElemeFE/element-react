import * as React from 'react'
import { Dialog } from 'element-react'
import { Dialog as DialogNext } from 'element-react/next'

class Component extends React.Component<{}, {}> {
  onCancel = () => { }
  render() {
    return (
      <div>
        <Dialog visible={true} />
        <Dialog visible={true} size="tiny" />
        <Dialog visible={true} size="small" />
        <Dialog visible={true} size="full" />
        <Dialog visible={false} title="提示" size="large" top="20%" modal={true} customClass="class" lockScroll={true} closeOnClickModal={true} closeOnPressEscape={true} onCancel={this.onCancel} className="className" style={{ width: 100 }}>
          <Dialog.Body>
            <div>body</div>
          </Dialog.Body>
          <Dialog.Footer>
            <div>footer</div>
          </Dialog.Footer>
        </Dialog>
        <Dialog.Body className="className" style={{ width: 100 }}>
          <div>body</div>
        </Dialog.Body>
        <Dialog.Footer className="className" style={{ width: 100 }}>
          <div>footer</div>
        </Dialog.Footer>

        <DialogNext visible={true} />
        <DialogNext visible={true} size="tiny" />
        <DialogNext visible={true} size="small" />
        <DialogNext visible={true} size="full" />
        <DialogNext visible={false} title="提示" size="large" top="20%" modal={true} customClass="class" lockScroll={true} closeOnClickModal={true} closeOnPressEscape={true} onCancel={this.onCancel} className="className" style={{ width: 100 }}>
          <DialogNext.Body>
            <div>body</div>
          </DialogNext.Body>
          <DialogNext.Footer>
            <div>footer</div>
          </DialogNext.Footer>
        </DialogNext>
        <DialogNext.Body className="className" style={{ width: 100 }}>
          <div>body</div>
        </DialogNext.Body>
        <DialogNext.Footer className="className" style={{ width: 100 }}>
          <div>footer</div>
        </DialogNext.Footer>
      </div>
    )
  }
}
