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
        activeName = props.activeName,
        value = props.value;


    children = _react2.default.Children.toArray(children);

    _this.state = {
      children: children,
      currentName: value || activeName || children[0].props.name,
      barStyle: {},
      navStyle: {
        transform: ''
      },
      scrollable: false,
      scrollNext: false,
      scrollPrev: false
    };
    return _this;
  }

  _createClass(Tabs, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.calcBarStyle(true);
      this.update();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevState.scrollable !== this.state.scrollable) {
        this.scrollToActiveTab();
      }
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

      if (nextProps.value !== this.props.value) {
        this.setState({
          currentName: nextProps.value
        }, function () {
          return _this2.calcBarStyle();
        });
      }

      if (nextProps.children !== this.props.children) {
        this.setState({
          children: _react2.default.Children.toArray(nextProps.children)
        }, function () {
          return _this2.update();
        });
      }
    }
  }, {
    key: 'handleTabAdd',
    value: function handleTabAdd() {
      var _props = this.props,
          onTabAdd = _props.onTabAdd,
          onTabEdit = _props.onTabEdit;


      onTabEdit && onTabEdit('add');
      onTabAdd && onTabAdd();
    }
  }, {
    key: 'handleTabRemove',
    value: function handleTabRemove(tab, index, e) {
      var _state = this.state,
          children = _state.children,
          currentName = _state.currentName;
      var _props2 = this.props,
          onTabRemove = _props2.onTabRemove,
          onTabEdit = _props2.onTabEdit;


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
        onTabEdit && onTabEdit('remove', tab);
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
        _this3.scrollToActiveTab();
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
    key: 'scrollPrev',
    value: function scrollPrev() {
      var containerWidth = this.refs.navScroll.offsetWidth;
      var currentOffset = this.getCurrentScrollOffset();
      if (!currentOffset) return;
      var newOffset = currentOffset > containerWidth ? currentOffset - containerWidth : 0;
      this.setOffset(newOffset);
    }
  }, {
    key: 'scrollNext',
    value: function scrollNext() {
      var navWidth = this.refs.nav.offsetWidth;
      var containerWidth = this.refs.navScroll.offsetWidth;
      var currentOffset = this.getCurrentScrollOffset();
      if (navWidth - currentOffset <= containerWidth) return;
      var newOffset = navWidth - currentOffset > containerWidth * 2 ? currentOffset + containerWidth : navWidth - containerWidth;
      this.setOffset(newOffset);
    }
  }, {
    key: 'scrollToActiveTab',
    value: function scrollToActiveTab() {
      if (!this.state.scrollable) return;

      var nav = this.refs.nav;
      var activeTab = nav.querySelector('.is-active');
      var navScroll = this.refs.navScroll;
      var activeTabBounding = activeTab.getBoundingClientRect();
      var navScrollBounding = navScroll.getBoundingClientRect();
      var navBounding = nav.getBoundingClientRect();
      var currentOffset = this.getCurrentScrollOffset();
      var newOffset = currentOffset;

      if (activeTabBounding.left < navScrollBounding.left) {
        newOffset = currentOffset - (navScrollBounding.left - activeTabBounding.left);
      }

      if (activeTabBounding.right > navScrollBounding.right) {
        newOffset = currentOffset + activeTabBounding.right - navScrollBounding.right;
      }

      if (navBounding.right < navScrollBounding.right) {
        newOffset = nav.offsetWidth - navScrollBounding.width;
      }

      this.setOffset(Math.max(newOffset, 0));
    }
  }, {
    key: 'getCurrentScrollOffset',
    value: function getCurrentScrollOffset() {
      var navStyle = this.state.navStyle;

      return navStyle.transform ? Number(navStyle.transform.match(/translateX\(-(\d+(\.\d+)*)px\)/)[1]) : 0;
    }
  }, {
    key: 'setOffset',
    value: function setOffset(value) {
      this.setState({
        navStyle: {
          transform: 'translateX(-' + value + 'px)'
        }
      });
    }
  }, {
    key: 'update',
    value: function update() {
      var navWidth = this.refs.nav.offsetWidth;
      var containerWidth = this.refs.navScroll.offsetWidth;
      var currentOffset = this.getCurrentScrollOffset();

      if (containerWidth < navWidth) {
        var _currentOffset = this.getCurrentScrollOffset();
        this.setState({
          scrollable: true,
          scrollablePrev: _currentOffset,
          scrollableNext: _currentOffset + containerWidth < navWidth
        });

        if (navWidth - _currentOffset < containerWidth) {
          this.setOffset(navWidth - containerWidth);
        }
      } else {
        this.setState({
          scrollable: false
        });

        if (currentOffset > 0) {
          this.setOffset(0);
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      var _state2 = this.state,
          children = _state2.children,
          currentName = _state2.currentName,
          barStyle = _state2.barStyle,
          navStyle = _state2.navStyle,
          scrollable = _state2.scrollable,
          scrollNext = _state2.scrollNext,
          scrollPrev = _state2.scrollPrev;
      var _props3 = this.props,
          type = _props3.type,
          addable = _props3.addable,
          closable = _props3.closable,
          editable = _props3.editable;

      var tabsCls = this.classNames({
        'el-tabs': true,
        'el-tabs--card': type === 'card',
        'el-tabs--border-card': type === 'border-card'
      });
      var addButton = editable || addable ? _react2.default.createElement(
        'span',
        {
          className: 'el-tabs__new-tab',
          onClick: function onClick() {
            return _this5.handleTabAdd();
          }
        },
        _react2.default.createElement('i', { className: 'el-icon-plus' })
      ) : null;
      var scrollBtn = scrollable ? [_react2.default.createElement(
        'span',
        { key: 'el-tabs__nav-prev',
          className: scrollable.prev ? 'el-tabs__nav-prev' : 'el-tabs__nav-prev is-disabled',
          onClick: function onClick() {
            return _this5.scrollPrev();
          }
        },
        _react2.default.createElement('i', { className: 'el-icon-arrow-left' })
      ), _react2.default.createElement(
        'span',
        { key: 'el-tabs__nav-next',
          className: scrollable.next ? 'el-tabs__nav-next' : 'el-tabs__nav-next is-disabled',
          onClick: function onClick() {
            return _this5.scrollNext();
          }
        },
        _react2.default.createElement('i', { className: 'el-icon-arrow-right' })
      )] : null;
      this.tabs = [];

      return _react2.default.createElement(
        'div',
        { style: this.style(), className: this.className(tabsCls) },
        _react2.default.createElement(
          'div',
          { className: 'el-tabs__header' },
          addButton,
          _react2.default.createElement(
            'div',
            { className: scrollable ? 'el-tabs__nav-wrap is-scrollable' : 'el-tabs__nav-wrap' },
            scrollBtn,
            _react2.default.createElement(
              'div',
              { className: 'el-tabs__nav-scroll', ref: 'navScroll' },
              _react2.default.createElement(
                'div',
                { className: 'el-tabs__nav', ref: 'nav', style: navStyle },
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
                      { show: editable || closable || item.props.closable },
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
              )
            )
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
  activeName: _libs.PropTypes.string,
  value: _libs.PropTypes.string,
  closable: _libs.PropTypes.bool,
  addable: _libs.PropTypes.bool,
  editable: _libs.PropTypes.bool,
  onTabClick: _libs.PropTypes.func,
  onTabRemove: _libs.PropTypes.func,
  onTabAdd: _libs.PropTypes.func,
  onTabEdit: _libs.PropTypes.func
};

Tabs.defaultProps = {
  closable: false,
  addable: false,
  edidable: false
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