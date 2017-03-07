'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var hsv2hsl = function hsv2hsl(hue, sat, val) {
  var sl = void 0,
      l = void 0;

  l = (2 - sat) * val;
  sl = sat * val;
  sl /= l < 1 ? l : 2 - l;
  sl = sl || 0;
  l /= 2;
  return [hue, sl, l];
};

// Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
// <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>
var isOnePointZero = function isOnePointZero(n) {
  return typeof n === 'string' && n.indexOf('.') !== -1 && parseFloat(n) === 1;
};

var isPercentage = function isPercentage(n) {
  return typeof n === 'string' && n.indexOf('%') !== -1;
};

// Take input from [0, n] and return it as [0, 1]
var bound01 = function bound01(value, max) {
  if (isOnePointZero(value)) value = '100%';

  var processPercent = isPercentage(value);
  value = Math.min(max, Math.max(0, parseFloat(value)));

  // Automatically convert percentage into number
  if (processPercent) {
    value = parseInt(value * max, 10) / 100;
  }

  // Handle floating point rounding errors
  if (Math.abs(value - max) < 0.000001) {
    return 1;
  }

  // Convert into [0, 1] range if it isn't already
  return value % max / parseFloat(max);
};

var INT_HEX_MAP = { 10: 'A', 11: 'B', 12: 'C', 13: 'D', 14: 'E', 15: 'F' };

var toHex = function toHex(_ref) {
  var r = _ref.r,
      g = _ref.g,
      b = _ref.b;

  var hexOne = function hexOne(value) {
    value = Math.min(Math.round(value), 255);
    var high = Math.floor(value / 16);
    var low = value % 16;
    return '' + (INT_HEX_MAP[high] || high) + (INT_HEX_MAP[low] || low);
  };

  if (isNaN(r) || isNaN(g) || isNaN(b)) return '';

  return '#' + hexOne(r) + hexOne(g) + hexOne(b);
};

var HEX_INT_MAP = { A: 10, B: 11, C: 12, D: 13, E: 14, F: 15 };

var parseHexChannel = function parseHexChannel(hex) {
  if (hex.length === 2) {
    return (HEX_INT_MAP[hex[0].toUpperCase()] || +hex[0]) * 16 + (HEX_INT_MAP[hex[1].toUpperCase()] || +hex[1]);
  }

  return HEX_INT_MAP[hex[1].toUpperCase()] || +hex[1];
};

var hsl2hsv = function hsl2hsv(hue, sat, light) {
  sat = sat / 100;
  light = light / 100;
  var smin = sat;
  var lmin = Math.max(light, 0.01);
  var sv = void 0;
  var v = void 0;

  light *= 2;
  sat *= light <= 1 ? light : 2 - light;
  smin *= lmin <= 1 ? lmin : 2 - lmin;
  v = (light + sat) / 2;
  sv = light === 0 ? 2 * smin / (lmin + smin) : 2 * sat / (light + sat);

  return {
    h: hue,
    s: sv * 100,
    v: v * 100
  };
};

// `rgbToHsv`
// Converts an RGB color value to HSV
// *Assumes:* r, g, and b are contained in the set [0, 255] or [0, 1]
// *Returns:* { h, s, v } in [0,1]
var rgb2hsv = function rgb2hsv(r, g, b) {
  r = bound01(r, 255);
  g = bound01(g, 255);
  b = bound01(b, 255);

  var max = Math.max(r, g, b);
  var min = Math.min(r, g, b);
  var h = void 0,
      s = void 0;
  var v = max;

  var d = max - min;
  s = max === 0 ? 0 : d / max;

  if (max === min) {
    h = 0; // achromatic
  } else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return { h: Math.round(h * 360), s: Math.round(s * 100), v: Math.round(v * 100) };
};

// `hsvToRgb`
// Converts an HSV color value to RGB.
// *Assumes:* h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
// *Returns:* { r, g, b } in the set [0, 255]
var hsv2rgb = function hsv2rgb(h, s, v) {
  h = bound01(h, 360) * 6;
  s = bound01(s, 100);
  v = bound01(v, 100);

  var i = Math.floor(h);
  var f = h - i;
  var p = v * (1 - s);
  var q = v * (1 - f * s);
  var t = v * (1 - (1 - f) * s);
  var mod = i % 6;
  var r = [v, q, p, p, t, v][mod];
  var g = [t, v, v, q, p, p][mod];
  var b = [p, p, t, v, v, q][mod];

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
};

var Color = function () {
  function Color(options) {
    _classCallCheck(this, Color);

    this._hue = 0;
    this._saturation = 100;
    this._value = 100;
    this._alpha = 100;

    this.enableAlpha = false;
    this.format = 'hex';
    this.value = '';

    options = options || {};

    for (var option in options) {
      if (options.hasOwnProperty(option)) {
        this[option] = options[option];
      }
    }

    this.doOnChange();
  }

  _createClass(Color, [{
    key: 'set',
    value: function set(prop, value) {
      if (arguments.length === 1 && (typeof prop === 'undefined' ? 'undefined' : _typeof(prop)) === 'object') {
        for (var p in prop) {
          if (prop.hasOwnProperty(p)) {
            this.set(p, prop[p]);
          }
        }

        return;
      }

      this['_' + prop] = value;
      this.doOnChange();
    }
  }, {
    key: 'get',
    value: function get(prop) {
      return this['_' + prop];
    }
  }, {
    key: 'toRgb',
    value: function toRgb() {
      return hsv2rgb(this._hue, this._saturation, this._value);
    }
  }, {
    key: 'fromString',
    value: function fromString(value) {
      var _this = this;

      if (!value) {
        this._hue = 0;
        this._saturation = 100;
        this._value = 100;

        this.doOnChange();
        return;
      }

      var fromHSV = function fromHSV(h, s, v) {
        _this._hue = h;
        _this._saturation = s;
        _this._value = v;

        _this.doOnChange();
      };

      if (value.indexOf('hsl') !== -1) {
        var parts = value.replace(/hsla|hsl|\(|\)/gm, '').split(/\s|,/g).filter(function (val) {
          return val !== '';
        }).map(function (val, index) {
          return index > 2 ? parseFloat(val) : parseInt(val, 10);
        });

        if (parts.length === 4) {
          this._alpha = Math.floor(parseFloat(parts[3]) * 100);
        }
        if (parts.length >= 3) {
          var _hsl2hsv = hsl2hsv(parts[0], parts[1], parts[2]),
              h = _hsl2hsv.h,
              s = _hsl2hsv.s,
              v = _hsl2hsv.v;

          fromHSV(h, s, v);
        }
      } else if (value.indexOf('hsv') !== -1) {
        var _parts = value.replace(/hsva|hsv|\(|\)/gm, '').split(/\s|,/g).filter(function (val) {
          return val !== '';
        }).map(function (val, index) {
          return index > 2 ? parseFloat(val) : parseInt(val, 10);
        });

        if (_parts.length === 4) {
          this._alpha = Math.floor(parseFloat(_parts[3]) * 100);
        }
        if (_parts.length >= 3) {
          fromHSV(_parts[0], _parts[1], _parts[2]);
        }
      } else if (value.indexOf('rgb') !== -1) {
        var _parts2 = value.replace(/rgba|rgb|\(|\)/gm, '').split(/\s|,/g).filter(function (val) {
          return val !== '';
        }).map(function (val, index) {
          return index > 2 ? parseFloat(val) : parseInt(val, 10);
        });

        if (_parts2.length === 4) {
          this._alpha = Math.floor(parseFloat(_parts2[3]) * 100);
        }
        if (_parts2.length >= 3) {
          var _rgb2hsv = rgb2hsv(_parts2[0], _parts2[1], _parts2[2]),
              _h = _rgb2hsv.h,
              _s = _rgb2hsv.s,
              _v = _rgb2hsv.v;

          fromHSV(_h, _s, _v);
        }
      } else if (value.indexOf('#') !== -1) {
        var hex = value.replace('#', '').trim();
        var r = void 0,
            g = void 0,
            b = void 0;

        if (hex.length === 3) {
          r = parseHexChannel(hex[0] + hex[0]);
          g = parseHexChannel(hex[1] + hex[1]);
          b = parseHexChannel(hex[2] + hex[2]);
        } else if (hex.length === 6) {
          r = parseHexChannel(hex.substring(0, 2));
          g = parseHexChannel(hex.substring(2, 4));
          b = parseHexChannel(hex.substring(4));
        }

        var _rgb2hsv2 = rgb2hsv(r, g, b),
            _h2 = _rgb2hsv2.h,
            _s2 = _rgb2hsv2.s,
            _v2 = _rgb2hsv2.v;

        fromHSV(_h2, _s2, _v2);
      }
    }
  }, {
    key: 'doOnChange',
    value: function doOnChange() {
      var _hue = this._hue,
          _saturation = this._saturation,
          _value = this._value,
          _alpha = this._alpha,
          format = this.format;


      if (this.enableAlpha) {
        switch (format) {
          case 'hsl':
            {
              var hsl = hsv2hsl(_hue, _saturation / 100, _value / 100);
              this.value = 'hsla(' + _hue + ', ' + Math.round(hsl[1] * 100) + '%, ' + Math.round(hsl[2] * 100) + '%, ' + _alpha / 100 + ')';
              break;
            }
          case 'hsv':
            this.value = 'hsva(' + _hue + ', ' + Math.round(_saturation) + '%, ' + Math.round(_value) + '%, ' + _alpha / 100 + ')';
            break;
          default:
            {
              var _hsv2rgb = hsv2rgb(_hue, _saturation, _value),
                  r = _hsv2rgb.r,
                  g = _hsv2rgb.g,
                  b = _hsv2rgb.b;

              this.value = 'rgba(' + r + ', ' + g + ', ' + b + ', ' + _alpha / 100 + ')';
            }
        }
      } else {
        switch (format) {
          case 'hsl':
            {
              var _hsl = hsv2hsl(_hue, _saturation / 100, _value / 100);
              this.value = 'hsl(' + _hue + ', ' + Math.round(_hsl[1] * 100) + '%, ' + Math.round(_hsl[2] * 100) + '%)';
              break;
            }
          case 'hsv':
            this.value = 'hsv(' + _hue + ', ' + Math.round(_saturation) + '%, ' + Math.round(_value) + '%)';
            break;
          case 'rgb':
            {
              var _hsv2rgb2 = hsv2rgb(_hue, _saturation, _value),
                  _r = _hsv2rgb2.r,
                  _g = _hsv2rgb2.g,
                  _b = _hsv2rgb2.b;

              this.value = 'rgb(' + _r + ', ' + _g + ', ' + _b + ')';
              break;
            }
          default:
            this.value = toHex(hsv2rgb(_hue, _saturation, _value));
        }
      }
    }
  }]);

  return Color;
}();

var _default = Color;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(hsv2hsl, 'hsv2hsl', 'src/color-picker/color.js');

  __REACT_HOT_LOADER__.register(isOnePointZero, 'isOnePointZero', 'src/color-picker/color.js');

  __REACT_HOT_LOADER__.register(isPercentage, 'isPercentage', 'src/color-picker/color.js');

  __REACT_HOT_LOADER__.register(bound01, 'bound01', 'src/color-picker/color.js');

  __REACT_HOT_LOADER__.register(INT_HEX_MAP, 'INT_HEX_MAP', 'src/color-picker/color.js');

  __REACT_HOT_LOADER__.register(toHex, 'toHex', 'src/color-picker/color.js');

  __REACT_HOT_LOADER__.register(HEX_INT_MAP, 'HEX_INT_MAP', 'src/color-picker/color.js');

  __REACT_HOT_LOADER__.register(parseHexChannel, 'parseHexChannel', 'src/color-picker/color.js');

  __REACT_HOT_LOADER__.register(hsl2hsv, 'hsl2hsv', 'src/color-picker/color.js');

  __REACT_HOT_LOADER__.register(rgb2hsv, 'rgb2hsv', 'src/color-picker/color.js');

  __REACT_HOT_LOADER__.register(hsv2rgb, 'hsv2rgb', 'src/color-picker/color.js');

  __REACT_HOT_LOADER__.register(Color, 'Color', 'src/color-picker/color.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/color-picker/color.js');
}();

;