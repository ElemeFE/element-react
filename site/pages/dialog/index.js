/**
 * Created by elemelyn on 16/10/25.
 */

import './style.scss';

import React from 'react';
import { Dialog, Layout, Button } from '../../../src';

const Row = Layout.Row;
const Col = Layout.Col;

export default class Playground extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dialogVisible1: false,
      dialogVisible2: false,
      dialogVisible3: false
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
            <Dialog title="提示"
                    size="tiny"
                    visible={ this.state.dialogVisible1 }
                    onCancel={ e => this.handleDialogClose(1) }
            >
              <Dialog.Body>
                <span>这是一段信息</span>
              </Dialog.Body>
              <Dialog.Footer className="dialog-footer">
                <Button onClick={ () => this.handleDialogClose(1) }>取 消</Button>
                <Button type="primary" onClick={ () => this.handleDialogClose(1) }>确 定</Button>
              </Dialog.Footer>
            </Dialog>
          </div>
        </section>

        <section className="demo-section">
          <div className="demo-header">
            <h3>自定义内容</h3>
            <p>Dialog 组件的内容可以是任意的，甚至可以是表格或表单，下面是应用了 Element Table 和 Form 组件的两个样例。</p>
          </div>

          <div className="demo-content demo-dialog">
            <Button type="text" onClick={ () => this.setState({ dialogVisible2: true }) } type="text">打开嵌套表格的 Dialog</Button>
            <Dialog title="收货地址"
                    visible={ this.state.dialogVisible2 }
                    onCancel={ (e) => this.handleDialogClose(2) }
            >
              <Dialog.Body>
                TODO: 待 Table 实现
                <el-table data="gridData">
                  <el-table-column property="date" label="日期" width="150"></el-table-column>
                  <el-table-column property="name" label="姓名" width="200"></el-table-column>
                  <el-table-column property="address" label="地址"></el-table-column>
                </el-table>
              </Dialog.Body>
            </Dialog>

            <Button type="text" onClick={ () => this.setState({ dialogVisible3: true }) } type="text">打开嵌套表单的 Dialog</Button>
            <Dialog title="收货地址"
                    visible={ this.state.dialogVisible3 }
                    onCancel={ (e) => this.handleDialogClose(3) }
            >
              <Dialog.Body>
                TODO: 待 Form 实现
                <el-form model="form">
                  <el-form-item label="活动名称" label-width="formLabelWidth">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="活动区域" label-width="formLabelWidth">
                    <el-select v-model="form.region" placeholder="请选择活动区域">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
              </Dialog.Body>

              <Dialog.Footer className="dialog-footer">
                <Button onClick={ () => this.handleDialogClose(3) }>取 消</Button>
                <Button type="primary" onClick={ () => this.handleDialogClose(3) }>确 定</Button>
              </Dialog.Footer>
            </Dialog>
          </div>
        </section>
      </div>
    )
  }
}