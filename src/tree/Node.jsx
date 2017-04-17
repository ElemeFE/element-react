/* @flow */

import React from 'react';
import debounce from 'throttle-debounce/debounce';

import { PropTypes, Component } from '../../libs';
import { watchPropertyChange, IDGenerator } from '../../libs/utils';
import CollapseTransition from './CollapseTransition';
import Checkbox from '../checkbox';

type Props = {
  nodeModel: Object,
  renderContent?: Function,
  context: Object
};

function NodeContent(props: Props) {
  const { nodeModel, renderContent, context } = props;

  if (typeof renderContent === 'function') {
    return renderContent(Object.freeze(context));
  } else {
    return <span className="el-tree-node__label">{nodeModel.label}</span>;
  }
}

NodeContent.propTypes = {
  nodeModel: PropTypes.object.isRequired,
  renderContent: PropTypes.func,
  context: PropTypes.object.isRequired
};

type State = {
  expanded: boolean,
  childNodeRendered: boolean,
  isShowCheckbox: boolean
};

export default class Node extends Component {
  state: State;

  constructor(props: Object) {
    super(props);

    this.state = {
      expanded: false,
      childNodeRendered: false,
      isShowCheckbox: false
    };
    this.state.isShowCheckbox = props.treeNode.isShowCheckbox;

    this.oldChecked = false;
    this.oldIndeterminate = false;
    this.idGen = new IDGenerator();
  }

  componentDidMount(): void {
    const nodeModel = this.props.nodeModel;
    const childrenKey = this.props.options.children || 'children';

    const triggerChange = debounce(20, (...args) => {
      if (this.isDeconstructed) return;
      this.handleSelectChange.apply(this, args);
    });

    this.loadHandler = this.enhanceLoad(nodeModel);
    this.watchers = {
      [this.idGen.next()]: watchPropertyChange(
        nodeModel,
        'indeterminate',
        value => {
          triggerChange(nodeModel.checked, value);
        }
      ),
      [this.idGen.next()]: watchPropertyChange(nodeModel, 'checked', value => {
        triggerChange(value, nodeModel.indeterminate);
      }),
      [this.idGen.next()]: watchPropertyChange(nodeModel, 'loading', () => {
        this.setState({});
      })
    };

    if (nodeModel.data != null) {
      this.watchers[
        this.idGen.next()
      ] = watchPropertyChange(nodeModel.data, childrenKey, () => {
        nodeModel.updateChildren();
        this.setState({}); //force update view
      });
    }
  }

  componentWillUnmount(): void {
    this.loadHandler();
    // clear watchs
    for (let w in this.watchers) {
      if (this.watchers[w]) {
        this.watchers[w]();
      }
    }
    this.isDeconstructed = true;
  }

  enhanceLoad(nodeModel: Object): Function {
    const load = nodeModel.load;
    const enhanced = (...args) => {
      load.apply(null, args);
      this.setState({});
    };
    nodeModel.load = enhanced;
    return () => {
      nodeModel.load = load;
    };
  }

  handleSelectChange(checked: boolean, indeterminate: boolean): void {
    const { onCheckChange, nodeModel } = this.props;

    // !NOTE: 原码是 && 的关系，感觉有bug
    if (
      this.oldChecked !== checked || this.oldIndeterminate !== indeterminate
    ) {
      onCheckChange(nodeModel.data, checked, indeterminate);
      this.setState({}); //force update
    }

    this.oldChecked = checked;
    this.oldIndeterminate = indeterminate;
  }

  handleClick(): void {
    this.props.treeNode.setCurrentNode(this);
  }

  handleExpandIconClick(event: SyntheticEvent): void {
    let target = event.target;
    const { nodeModel, onNodeClicked } = this.props;
    if (target instanceof HTMLElement) {
      if (
        (target.tagName.toUpperCase() !== 'DIV' &&
          target.parentNode &&
          target.parentNode.nodeName.toUpperCase() !== 'DIV') ||
        target.nodeName.toUpperCase() === 'LABEL'
      )
        return;
      if (this.state.expanded) {
        nodeModel.collapse();
        this.setState({ expanded: false }, () =>
          this.refs.collapse.triggerChange());
      } else {
        nodeModel.expand(() => {
          this.setState({ expanded: true, childNodeRendered: true }, () =>
            this.refs.collapse.triggerChange());
        });
      }

      onNodeClicked(nodeModel.data, nodeModel, this);
    }
  }

  handleUserClick(): void {
    const nodeModel = this.props.nodeModel;
    if (nodeModel.indeterminate) {
      nodeModel.setChecked(nodeModel.checked, true);
    }
  }

  handleCheckChange(checked: boolean): void {
    this.props.nodeModel.setChecked(checked, true);
  }

  render(): React.Element<any> {
    const { childNodeRendered, expanded } = this.state;
    const { treeNode, nodeModel, renderContent, isShowCheckbox } = this.props;

    return (
      <div
        onClick={this.handleClick.bind(this)}
        className={this.classNames('el-tree-node', {
          expanded: childNodeRendered && expanded,
          'is-current': treeNode.getCurrentNode() === this
        })}
      >
        <div
          className="el-tree-node__content"
          style={{ paddingLeft: `${nodeModel.level * 16}px` }}
          onClick={this.handleExpandIconClick.bind(this)}
        >
          <span
            className={this.classNames('el-tree-node__expand-icon', {
              'is-leaf': nodeModel.isLeaf,
              expanded: !nodeModel.isLeaf && expanded
            })}
          />
          {isShowCheckbox &&
            <Checkbox
              checked={nodeModel.checked}
              onChange={this.handleCheckChange.bind(this)}
              indeterminate={nodeModel.indeterminate}
            />}
          {nodeModel.loading &&
            <span className="el-tree-node__icon el-icon-loading"> </span>}
          <NodeContent
            nodeModel={nodeModel}
            renderContent={renderContent}
            context={this}
          />
        </div>
        <CollapseTransition isShow={expanded} ref="collapse">
          <div className="el-tree-node__children">
            {nodeModel.childNodes.map((e, idx) => {
              let props = Object.assign({}, this.props, { nodeModel: e });
              return <Node {...props} key={idx} />;
            })}
          </div>
        </CollapseTransition>
      </div>
    );
  }
}

Node.propTypes = {
  nodeModel: PropTypes.object,
  options: PropTypes.object,
  renderContent: PropTypes.func,
  treeNode: PropTypes.object.isRequired,
  isShowCheckbox: PropTypes.bool,
  onCheckChange: PropTypes.func,
  onNodeClicked: PropTypes.func
};

Node.defaultProps = {
  nodeModel: {},
  options: {},
  onCheckChange() {},
  onNodeClicked() {}
};
