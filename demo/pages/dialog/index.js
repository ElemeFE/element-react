/**
 * Created by elemelyn on 16/10/25.
 */

import './style.scss';

import React from 'react';
import { Dialog, Layout, Button } from '../../../src';
import classnames from 'classnames';

const Row = Layout.Row;
const Col = Layout.Col;

export default class Playground extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dialogVisible1: false,
    };
  }

  handleDialogClose(index) {
    this.setState({
      [`dialogVisible${index}`]: false
    });
  }

  render() {
    return (
      <div>
        <section className="demo-section">
          <div className="demo-header">
            <h2>Dialog 对话框</h2>
            <p>在保留当前页面状态的情况下，告知用户并承载相关操作。</p>
            <h3>基本用法</h3>
            <p>Dialog 弹出一个对话框，适合需要定制性更大的场景。</p>
          </div>

          <div className="demo-content demo-dialog">
            <Button type="text" onClick={ () => this.setState({ dialogVisible1: true }) }>点击打开 Dialog</Button>

            <Dialog title="提示" visible={ this.state.dialogVisible1 } size="tiny" handleDialogClose={ () => this.handleDialogClose(1) }>
              <span>这是一段信息</span>
              <span slot="footer" class="dialog-footer">
                <Button click="dialogVisible = false">取 消</Button>
                <Button type="primary" click="dialogVisible = false">确 定</Button>
              </span>
            </Dialog>
          </div>
        </section>
      </div>
    )
  }
}