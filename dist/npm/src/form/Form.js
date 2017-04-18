'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _libs = require('../../libs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Form = function (_Component) {
  _inherits(Form, _Component);

  function Form(props) {
    _classCallCheck(this, Form);

    var _this = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));

    _this.state = {
      fields: {},
      fieldLength: 0
    };
    return _this;
  }

  _createClass(Form, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        component: this
      };
    }
  }, {
    key: 'addField',
    value: function addField(field) {
      this.state.fields[field.props.prop] = field;
      this.state.fieldLength++;
    }
  }, {
    key: 'removeField',
    value: function removeField(field) {
      delete this.state.fields[field.props.prop];
      this.state.fieldLength--;
    }
  }, {
    key: 'resetFields',
    value: function resetFields() {
      var fields = this.state.fields;


      for (var key in fields) {
        fields[key].resetField();
      }
    }
  }, {
    key: 'validate',
    value: function validate(callback) {
      var _state = this.state,
          fields = _state.fields,
          fieldLength = _state.fieldLength;

      var count = 0,
          valid = true;

      for (var key in fields) {
        fields[key].validate('', function (errors) {
          if (errors) {
            valid = false;
          }

          if (++count === fieldLength) {
            callback(valid);
          }
        });
      }
    }
  }, {
    key: 'validateField',
    value: function validateField(prop, cb) {
      var fields = this.state.fields;

      var field = fields[prop];

      if (!field) {
        throw new Error('must call validateField with valid prop string!');
      }

      field.validate('', cb);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'form',
        { style: this.style(), className: this.className('el-form', this.props.labelPosition && 'el-form--label-' + this.props.labelPosition, {
            'el-form--inline': this.props.inline
          }) },
        this.props.children
      );
    }
  }]);

  return Form;
}(_libs.Component);

var _default = Form;
exports.default = _default;


Form.childContextTypes = {
  component: _libs.PropTypes.any
};

Form.propTypes = {
  model: _libs.PropTypes.object,
  rules: _libs.PropTypes.object,
  labelPosition: _libs.PropTypes.oneOf(['right', 'left', 'top']),
  labelWidth: _libs.PropTypes.oneOfType([_libs.PropTypes.string, _libs.PropTypes.number]),
  labelSuffix: _libs.PropTypes.string,
  inline: _libs.PropTypes.bool
};

Form.defaultProps = {
  labelPosition: 'right',
  labelSuffix: ''
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Form, 'Form', 'src/form/Form.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/form/Form.jsx');
}();

;