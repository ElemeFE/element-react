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

var Tabs = function (_Component) {
  _inherits(Tabs, _Component);

  function Tabs(props) {
    _classCallCheck(this, Tabs);

    var _this = _possibleConstructorReturn(this, (Tabs.__proto__ || Object.getPrototypeOf(Tabs)).call(this, props));

    var children = props.children,
        activeName = props.activeName;


    children = _react2.default.Children.toArray(children);

    _this.state = {
      children: children,
      currentName: activeName || children[0].props.name,
      barStyle: {}
    };
    return _this;
  }

  _createClass(Tabs, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.calcBarStyle(true);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      if (nextProps.activeName !== this.props.activeName) {
        this.setState({
          currentName: nextProps.activeName
        }, function () {
          return _this2.calcBarStyle();
        });
      }

      if (nextProps.children !== this.props.children) {
        this.setState({
          children: _react2.default.Children.toArray(nextProps.children)
        });
      }
    }
  }, {
    key: 'handleTabRemove',
    value: function handleTabRemove(tab, index, e) {
      var _state = this.state,
          children = _state.children,
          currentName = _state.currentName;
      var onTabRemove = this.props.onTabRemove;


      e.stopPropagation();

      if (children[index].props.name === currentName) {
        var nextChild = children[index + 1];
        var prevChild = children[index - 1];

        this.setState({
          currentName: nextChild ? nextChild.props.name : prevChild ? prevChild.props.name : '-1'
        });
      }

      children.splice(index, 1);

      this.setState({
        children: children
      }, function () {
        onTabRemove && onTabRemove(tab, e);
      });
    }
  }, {
    key: 'handleTabClick',
    value: function handleTabClick(tab, e) {
      var _this3 = this;

      if (tab.props.disabled) {
        return false;
      }

      this.setState({
        currentName: tab.props.name
      }, function () {
        var onTabClick = _this3.props.onTabClick;


        _this3.calcBarStyle();
        onTabClick && onTabClick(tab, e);
      });
    }
  }, {
    key: 'calcBarStyle',
    value: function calcBarStyle(firstRendering) {
      var _this4 = this;

      if (this.props.type || !this.tabs.length) return {};

      var style = {};
      var offset = 0;
      var tabWidth = 0;
      var children = this.state.children instanceof Array ? this.state.children : [this.state.children];

      children.every(function (item, index) {
        var $el = _this4.tabs[index];

        if (item.props.name !== _this4.state.currentName) {
          offset += $el.clientWidth;
          return true;
        } else {
          tabWidth = $el.clientWidth;
          return false;
        }
      });

      style.width = tabWidth + 'px';
      style.transform = 'translateX(' + offset + 'px)';

      if (!firstRendering) {
        style.transition = 'transform .3s cubic-bezier(.645,.045,.355,1), -webkit-transform .3s cubic-bezier(.645,.045,.355,1)';
      }

      this.setState({
        barStyle: style
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      var _state2 = this.state,
          children = _state2.children,
          currentName = _state2.currentName,
          barStyle = _state2.barStyle;
      var _props = this.props,
          type = _props.type,
          closable = _props.closable;

      var tabsCls = this.classNames({
        'el-tabs': true,
        'el-tabs--card': type === 'card',
        'el-tabs--border-card': type === 'border-card'
      });
      this.tabs = [];

      return _react2.default.createElement(
        'div',
        { style: this.style(), className: this.className(tabsCls) },
        _react2.default.createElement(
          'div',
          { className: 'el-tabs__header' },
          _react2.default.Children.map(children, function (item, index) {
            var _item$props = item.props,
                name = _item$props.name,
                label = _item$props.label,
                disabled = _item$props.disabled;

            var tabCls = _this5.classNames({
              'el-tabs__item': true,
              'is-active': name === currentName,
              'is-disabled': disabled,
              'is-closable': closable || item.props.closable
            });

            return _react2.default.createElement(
              'div',
              { key: 'el-tabs__item-' + index, ref: function ref(tab) {
                  return tab && _this5.tabs.push(tab);
                }, name: name, className: tabCls, onClick: function onClick(e) {
                  return _this5.handleTabClick(item, e);
                } },
              label,
              _react2.default.createElement(
                _libs.View,
                { show: closable || item.props.closable },
                _react2.default.createElement('span', { className: 'el-icon-close', onClick: function onClick(e) {
                    return _this5.handleTabRemove(item, index, e);
                  } })
              )
            );
          }),
          _react2.default.createElement(
            _libs.View,
            { show: !type },
            _react2.default.createElement('div', { className: 'el-tabs__active-bar', style: barStyle })
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'el-tabs__content' },
          _react2.default.Children.map(children, function (item) {
            var name = item.props.name;

            // let transitionName = '';
            //
            // if (name === currentName) {
            //   transitionName = 'slideInRight';
            // }

            return _react2.default.createElement(
              _libs.View,
              { show: name === currentName },
              item
            );
          })
        )
      );
    }
  }]);

  return Tabs;
}(_libs.Component);

var _default = Tabs;
exports.default = _default;


Tabs.propTypes = {
  type: _libs.PropTypes.oneOf(['card', 'border-card']),
  closable: _libs.PropTypes.bool,
  activeName: _libs.PropTypes.string,
  onTabClick: _libs.PropTypes.func,
  onTabRemove: _libs.PropTypes.func
};

Tabs.defaultProps = {
  closable: false
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Tabs, 'Tabs', 'src/tabs/Tabs.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/tabs/Tabs.jsx');
}();

;