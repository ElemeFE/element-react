import React from 'react';
import ClickOutside from 'react-click-outside';
import { Component, PropTypes } from '../../libs';
import PickerDropdown from './components/PickerDropdown';
import Color from './color';


class ColorPicker extends Component {
  constructor(props) {
    super(props);

    const color = new Color({
      enableAlpha: this.props.showAlpha,
      format: this.props.colorFormat
    });

    this.state = {
      value: this.props.value,
      color: color,
      showPicker: false,
      showPanelColor: false,
    }
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
      onChange: this.handleChange.bind(this),
    }
  }

  handleChange(color) {
    this.setState({ value: color.value, color });
  }

  confirmValue(value) {
    const { onChange } = this.props;
    this.setState({ showPicker: false }, () => onChange(value));
  }

  clearValue() {
    this.setState({
      showPicker: false,
      showPanelColor: false,
      value: null,
    }, () => {
      this.props.onChange(null);
      this.resetColor();
    });
  }

  hide() {
    this.setState({
      showPicker: false,
    }, () => this.resetColor());
  }

  resetColor() {
    const { value, color } = this.state;
    if (value) {
      color.fromString(value);
      this.setState({ color });
    }
  }

  handleClickOutside() {
    this.setState({ showPicker: false });
  }

  render() {
    const { showAlpha } = this.props;
    const { value, color, showPicker, showPanelColor } = this.state;

    let displayedColor;
    if (!value && !showPanelColor) {
      displayedColor = 'transparent';
    } else {
      const { r, g, b } = color.toRgb();
      displayedColor = showAlpha
        ? `rgba(${ r }, ${ g }, ${ b }, ${ color.get('alpha') / 100 })`
        : `rgb(${ r }, ${ g }, ${ b })`;
    }
    return (
      <div className="el-color-picker">
        <div className="el-color-picker__trigger" onClick={() => this.setState({ showPicker: !showPicker })}>
          <span className={this.classNames({'el-color-picker__color': true, 'is-alpha': showAlpha })}>
            <span
              className="el-color-picker__color-inner"
              style={{ backgroundColor: displayedColor }}
            >
            </span>
            {!value && !showPanelColor && <span className="el-color-picker__empty el-icon-close"></span>}
          </span>
          <span className="el-color-picker__icon el-icon-caret-bottom"></span>
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
    )
  }
}

ColorPicker.childContextTypes = {
  onChange: PropTypes.func,
}


ColorPicker.propTypes = {
  value: PropTypes.string,
  showAlpha: PropTypes.bool,
  colorFormat: PropTypes.string,
  onChange: PropTypes.func,
}

export default ClickOutside(ColorPicker);
