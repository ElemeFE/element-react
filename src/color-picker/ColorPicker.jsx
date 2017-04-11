/* @flow */

import React from 'react';
import ClickOutside from 'react-click-outside';
import { Component, PropTypes } from '../../libs';
import PickerDropdown from './components/PickerDropdown';
import Color from './color';
import type { ColorType, ColorPickerState } from './Types';

class ColorPicker extends Component {
  state: ColorPickerState;

  static defaultProps = {
    onChange() {}
  };

  constructor(props: Object) {
    super(props);

    const color: ColorType = new Color({
      enableAlpha: this.props.showAlpha,
      format: this.props.colorFormat
    });

    this.state = {
      value: this.props.value,
      color: color,
      showPicker: false,
      showPanelColor: false
    };
  }

  componentDidMount() {
    const { value, color } = this.state;
    if (value) {
      color.fromString(value);
      this.setState({ color });
    }
    this.popperElm = this.refs.dropdown;
  }

  getChildContext() {
    return {
      onChange: this.handleChange.bind(this)
    };
  }

  handleChange(color: ColorType): void {
    this.setState({ value: color.value, color });
  }

  confirmValue(): void {
    const { value } = this.state;
    const { onChange } = this.props;
    this.setState({ showPicker: false }, () => onChange(value));
  }

  clearValue(): void {
    this.setState(
      {
        showPicker: false,
        showPanelColor: false,
        value: null
      },
      () => {
        this.props.onChange(null);
        this.resetColor();
      }
    );
  }

  hide(): void {
    this.setState(
      {
        showPicker: false
      },
      () => this.resetColor()
    );
  }

  resetColor(): void {
    const { value, color } = this.state;
    if (value) {
      color.fromString(value);
      this.setState({ color });
    }
  }

  handleClickOutside(): void {
    this.setState({ showPicker: false });
  }

  render(): React.Element<any> {
    const { showAlpha } = this.props;
    const { value, color, showPicker, showPanelColor } = this.state;

    let displayedColor;
    if (!value && !showPanelColor) {
      displayedColor = 'transparent';
    } else {
      const { r, g, b } = color.toRgb();
      const alpha = color.get('alpha');
      if (typeof alpha === 'number') {
        displayedColor = showAlpha
          ? `rgba(${r}, ${g}, ${b}, ${alpha / 100})`
          : `rgb(${r}, ${g}, ${b})`;
      }
    }
    return (
      <div className="el-color-picker">
        <div
          className="el-color-picker__trigger"
          onClick={() => this.setState({ showPicker: !showPicker })}
        >
          <span
            className={this.classNames({
              'el-color-picker__color': true,
              'is-alpha': showAlpha
            })}
          >
            <span
              className="el-color-picker__color-inner"
              style={{ backgroundColor: displayedColor }}
            />
            {!value &&
              !showPanelColor &&
              <span className="el-color-picker__empty el-icon-close" />}
          </span>
          <span className="el-color-picker__icon el-icon-caret-bottom" />
        </div>
        <PickerDropdown
          ref="dropdown"
          showPicker={showPicker}
          color={color}
          onPick={() => this.confirmValue()}
          onClear={() => this.clearValue()}
          showAlpha={showAlpha}
        />
      </div>
    );
  }
}

ColorPicker.childContextTypes = {
  onChange: PropTypes.func
};

ColorPicker.propTypes = {
  value: PropTypes.string,
  showAlpha: PropTypes.bool,
  colorFormat: PropTypes.string,
  onChange: PropTypes.func
};

export default ClickOutside(ColorPicker);
