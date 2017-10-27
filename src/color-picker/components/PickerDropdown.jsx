/* @flow */

import React from 'react';
import SvPanel from './SvPanel';
import HueSlider from './HueSlider';
import AlphaSlider from './AlphaSlider';
import { Component, PropTypes, Transition, View } from '../../../libs';
import Locale from '../../locale';

export default class PickerDropdown extends Component {
  constructor(props: Object) {
    super(props);
  }

  render(): React.Element<any> {
    const { color, showAlpha, onPick, onClear, showPicker } = this.props;
    const currentColor = color.value;
    return (
      <Transition name="el-zoom-in-top">
        <View show={showPicker}>
          <div className="el-color-dropdown el-color-picker__panel">
            <div className="el-color-dropdown__main-wrapper">
              <HueSlider
                ref="hue"
                color={color}
                vertical
                onChange={color => this.props.onChange(color)}
              />
              <SvPanel
                ref="sl"
                color={color}
                onChange={color => this.props.onChange(color)}
              />
            </div>
            {showAlpha && <AlphaSlider ref="alpha" color={color} />}
            <div className="el-color-dropdown__btns">
              <span className="el-color-dropdown__value">{currentColor}</span>
              <a
                href="JavaScript:"
                className="el-color-dropdown__link-btn"
                onClick={() => onClear()}
              >
                {Locale.t('el.colorpicker.clear')}
              </a>
              <button
                className="el-color-dropdown__btn"
                onClick={() => onPick()}
              >
                {Locale.t('el.colorpicker.confirm')}
              </button>
            </div>
          </div>
        </View>
      </Transition>
    );
  }
}

PickerDropdown.propTypes = {
  color: PropTypes.object.isRequired,
  showPicker: PropTypes.bool,
  showAlpha: PropTypes.bool,
  onPick: PropTypes.func,
  onClear: PropTypes.func,
  onChange: PropTypes.func
};

PickerDropdown.defaultProps = {
  onPick() {},
  onClear() {},
  onChange() {}
};
