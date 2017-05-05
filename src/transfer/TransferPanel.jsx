/* @flow */
import React from 'react';
import { Component, PropTypes, View } from '../../libs';
import Input from '../input';
import Checkbox from '../checkbox';
import i18n from '../locale';

type Props = {
  data: Array<Object>,
  renderContent?: Function,
  placeholder?: string,
  title?: string,
  filterable?: boolean,
  footerFormat: Object,
  filterMethod?: Function,
  propsAlias: Object,
  onChange: Function,
  checked: Array<Object>,
  hasChecked?: boolean,
  noChecked?: boolean,
  children: React.Element<any>
};

type defaultProps = {
  data: Array<Object>,
  footerFormat: Object,
  onChange: Function,
}

type State = {
  query: string,
  inputHover: boolean
};

export default class TransferPanel extends Component {
  props: Props;
  state: State;

  static propTypes = {
    data: PropTypes.array,
    renderContent: PropTypes.func,
    placeholder: PropTypes.string,
    title: PropTypes.string,
    filterable: PropTypes.bool,
    footerFormat: PropTypes.object,
    filterMethod: PropTypes.func,
    propsAlias: PropTypes.object,
    onChange: PropTypes.func,
    checked: PropTypes.array
  };

  static defaultProps: defaultProps = {
    data: [],
    footerFormat: {},
    propsAlias: {},
    onChange() {}
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      query: '',
      inputHover: false
    };
  }

  handleMouseEnter = () => this.setState({ inputHover: true });

  handleMouseLeave = () => this.setState({ inputHover: false });

  clearQuery = () => {
    if (this.inputIcon === 'circle-close') {
      this.setState({ query: '' });
    }
  };

  handleAllCheckedChange = (ischecked: boolean) => {
    const checked = ischecked
      ? this.checkableData.map(item => item[this.keyProp])
      : [];
    this.props.onChange(checked);
  };

  handleCheckedChange = (value: Array<Object>) => {
    this.props.onChange(value);
  };

  handleInputChange = (value: string) => {
    this.setState({ query: value });
  };

  get allChecked(): boolean {
    const checkableDataKeys = this.checkableData.map(
      item => item[this.keyProp]
    );
    return checkableDataKeys.length > 0 &&
      checkableDataKeys.every(item => this.props.checked.includes(item));
  }

  get filteredData(): Array<Object> {
    return this.props.data.filter(item => {
      if (typeof this.props.filterMethod === 'function') {
        return this.props.filterMethod(this.state.query, item);
      } else {
        const label = item[this.labelProp] || item[this.keyProp].toString();
        return label.toLowerCase().includes(this.state.query.toLowerCase());
      }
    });
  }

  get checkableData(): Array<Object> {
    return this.filteredData.filter(item => !item[this.disabledProp]);
  }

  get checkedSummary(): string {
    const checkedLength = this.props.checked.length;
    const dataLength = this.props.data.length;
    const { noChecked, hasChecked } = this.props.footerFormat;
    if (noChecked && hasChecked) {
      return checkedLength > 0
        ? hasChecked
            .replace(/\${checked}/g, checkedLength)
            .replace(/\${total}/g, dataLength)
        : noChecked.replace(/\${total}/g, dataLength);
    } else {
      return checkedLength > 0
        ? i18n.t('el.transfer.hasCheckedFormat', {
            total: dataLength,
            checked: checkedLength
          })
        : i18n.t('el.transfer.noCheckedFormat', { total: dataLength });
    }
  }

  get isIndeterminate(): boolean {
    const checkedLength = this.props.checked.length;
    return checkedLength > 0 && checkedLength < this.checkableData.length;
  }

  get hasNoMatch(): boolean {
    const { query } = this.state;
    return query.length > 0 && this.filteredData.length === 0;
  }

  get inputIcon(): 'circle-close' | 'search' {
    const { query, inputHover } = this.state;
    return query.length > 0 && inputHover ? 'circle-close' : 'search';
  }

  get labelProp(): string {
    return this.props.propsAlias.label;
  }

  get keyProp(): string {
    return this.props.propsAlias.key;
  }

  get disabledProp(): string {
    return this.props.propsAlias.disabled;
  }

  render(): React.Element<any> {
    const {
      filterable,
      title,
      data,
      renderContent,
      checked,
      placeholder
    } = this.props;
    const { query } = this.state;
    return (
      <div className="el-transfer-panel">
        <p className="el-transfer-panel__header">{title}</p>

        <div className="el-transfer-panel__body">
          {filterable &&
            <Input
              className="el-transfer-panel__filter"
              value={query}
              size="small"
              placeholder={placeholder}
              icon={this.inputIcon}
              onMouseEnter={this.handleMouseEnter}
              onMouseLeave={this.handleMouseLeave}
              onIconClick={this.clearQuery}
              onChange={this.handleInputChange}
            />}
          <View show={!this.hasNoMatch && data.length > 0}>
            <Checkbox.Group
              value={checked}
              v-show=""
              className={this.classNames({
                'is-filterable': filterable,
                'el-transfer-panel__list': true
              })}
              onChange={this.handleCheckedChange}
            >
              {this.filteredData.map((item, index) => (
                <Checkbox
                  className="el-transfer-panel__item"
                  label={item[this.labelProp]}
                  disabled={item[this.disabledProp]}
                  value={item[this.keyProp]}
                  key={index}
                >
                  <OptionContent
                    option={item}
                    renderContent={renderContent}
                    labelProp={this.labelProp}
                    keyProp={this.keyProp}
                  />
                </Checkbox>
              ))}
            </Checkbox.Group>
          </View>

          <View show={this.hasNoMatch}>
            <p className="el-transfer-panel__empty">
              {i18n.t('el.transfer.noMatch')}
            </p>
          </View>
          <View show={data.length === 0 && !this.hasNoMatch}>
            <p className="el-transfer-panel__empty">
              {i18n.t('el.transfer.noData')}
            </p>
          </View>
        </div>
        <p className="el-transfer-panel__footer">
          <Checkbox
            checked={this.allChecked}
            onChange={this.handleAllCheckedChange}
            indeterminate={this.isIndeterminate}
          >
            {this.checkedSummary}
          </Checkbox>
          {this.props.children}
        </p>
      </div>
    );
  }
}

const OptionContent = ({ option, renderContent, labelProp, keyProp }) => {
  return renderContent
    ? renderContent(option)
    : <span>{option[labelProp] || option[keyProp]}</span>;
};
