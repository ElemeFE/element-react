/* @flow */

import React from 'react';
import { Component, PropTypes } from '../../libs';
import Button from '../button';
import TransferPanel from './TransferPanel';

import i18n from '../locale';

type Props = {
  data: Array<Object>,
  titles: Array<string>,
  buttonTexts: Array<string>,
  filterPlaceholder?: string,
  filterMethod?: Function,
  leftDefaultChecked: Array<Object>,
  rightDefaultChecked: Array<Object>,
  renderContent?: Function,
  value: Array<Object>,
  footerFormat?: Object,
  filterable?: boolean,
  propsAlias: {
    label: string,
    key: string,
    disabled: string
  },
  onChange: Function,
  leftFooter?: React.Element<any>,
  rightFooter?: React.Element<any>
};

type State = {
  leftChecked: Array<Object>,
  rightChecked: Array<Object>
};

export default class Transfer extends Component {
  props: Props;
  state: State;
  static propTypes = {
    data: PropTypes.array,
    titles: PropTypes.array,
    buttonTexts: PropTypes.array,
    filterPlaceholder: PropTypes.string,
    filterMethod: PropTypes.func,
    leftDefaultChecked: PropTypes.array,
    rightDefaultChecked: PropTypes.array,
    renderContent: PropTypes.func,
    value: PropTypes.array,
    footerFormat: PropTypes.object,
    filterable: PropTypes.bool,
    propsAlias: PropTypes.object,
    onChange: PropTypes.func,
    leftFooter: PropTypes.node,
    rightFooter: PropTypes.node
  };

  static defaultProps = {
    data: [],
    titles: [],
    buttonTexts: [],
    filterPlaceholder: '',
    leftDefaultChecked: [],
    rightDefaultChecked: [],
    value: [],
    footerFormat: {},
    propsAlias: {
      label: 'label',
      key: 'key',
      disabled: 'disabled'
    },
    onChange() {}
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      leftChecked: [],
      rightChecked: []
    };
  }

  componentWillMount() {
    const { leftDefaultChecked, rightDefaultChecked } = this.props;
    if (leftDefaultChecked.length) {
      this.setState({ leftChecked: leftDefaultChecked })
    }
    if (rightDefaultChecked.length) {
      this.setState({ rightChecked: rightDefaultChecked })
    }
  }

  onSourceCheckedChange = (val: Array<Object>) => {
    this.setState({ leftChecked: val });
  };

  onTargetCheckedChange = (val: Array<Object>) => {
    this.setState({ rightChecked: val });
  };

  addToLeft = () => {
    const { value } = this.props;
    const { rightChecked } = this.state;
    let currentValue = value.slice();
    rightChecked.forEach(item => {
      const index = currentValue.indexOf(item);
      if (index > -1) {
        currentValue.splice(index, 1);
      }
    });
    this.setState({ rightChecked: [] }, () =>
      this.props.onChange(currentValue, 'left', rightChecked));
  };

  addToRight = () => {
    const { value } = this.props;
    const { leftChecked } = this.state;
    let currentValue = value.slice();
    leftChecked.forEach(item => {
      if (!value.includes(item)) {
        currentValue = currentValue.concat(item);
      }
    });
    this.setState({ leftChecked: [] }, () =>
      this.props.onChange(currentValue, 'right', leftChecked));
  };

  get sourceData(): Array<Object> {
    const { data, value, propsAlias } = this.props;
    return data.filter(item => !value.includes(item[propsAlias.key]));
  }

  get targetData(): Array<Object> {
    const { data, value, propsAlias } = this.props;
    return data.filter(item => value.includes(item[propsAlias.key]));
  }

  render(): React.Element<any> {
    const {
      filterPlaceholder,
      titles,
      buttonTexts,
      propsAlias,
      filterable,
      filterMethod,
      footerFormat,
      leftFooter,
      rightFooter,
      renderContent
    } = this.props;
    const { leftChecked, rightChecked } = this.state;

    return (
      <div className="el-transfer">
        <TransferPanel
          propsAlias={propsAlias}
          data={this.sourceData}
          title={titles[0] || i18n.t('el.transfer.titles.0')}
          checked={leftChecked}
          filterable={filterable}
          filterMethod={filterMethod}
          footerFormat={footerFormat}
          renderContent={renderContent}
          placeholder={
            filterPlaceholder || i18n.t('el.transfer.filterPlaceholder')
          }
          onChange={this.onSourceCheckedChange}
        >
          {leftFooter}
        </TransferPanel>
        <div className="el-transfer__buttons">
          <Button
            type="primary"
            size="small"
            onClick={this.addToLeft}
            disabled={rightChecked.length === 0}
          >
            <i className="el-icon-arrow-left" />
            {buttonTexts[0] !== undefined && <span>{buttonTexts[0]}</span>}
          </Button>
          <Button
            type="primary"
            size="small"
            onClick={this.addToRight}
            disabled={leftChecked.length === 0}
          >
            {buttonTexts[1] !== undefined && <span>{buttonTexts[1]}</span>}
            <i className="el-icon-arrow-right" />
          </Button>
        </div>
        <TransferPanel
          propsAlias={propsAlias}
          data={this.targetData}
          title={titles[1] || i18n.t('el.transfer.titles.1')}
          checked={rightChecked}
          filterable={filterable}
          filterMethod={filterMethod}
          footerFormat={footerFormat}
          renderContent={renderContent}
          placeholder={
            filterPlaceholder || i18n.t('el.transfer.filterPlaceholder')
          }
          onChange={this.onTargetCheckedChange}
        >
          {rightFooter}
        </TransferPanel>
      </div>
    );
  }
}
