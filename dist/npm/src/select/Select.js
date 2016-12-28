'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactClickOutside = require('react-click-outside');

var _reactClickOutside2 = _interopRequireDefault(_reactClickOutside);

var _popper = require('popper.js');

var _popper2 = _interopRequireDefault(_popper);

var _libs = require('../../libs');

var _resizeEvent = require('../../libs/utils/resize-event');

var _utils = require('../../libs/utils');

var _tag = require('../tag');

var _tag2 = _interopRequireDefault(_tag);

var _input = require('../input');

var _input2 = _interopRequireDefault(_input);

var _locale = require('../locale');

var _locale2 = _interopRequireDefault(_locale);

var _Dropdown = require('./Dropdown');

var _Dropdown2 = _interopRequireDefault(_Dropdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var sizeMap = {
  'large': 42,
  'small': 30,
  'mini': 22
};

var Select = function (_Component) {
  _inherits(Select, _Component);

  function Select(props) {
    _classCallCheck(this, Select);

    var _this = _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, props));

    _this.state = {
      options: [],
      isSelect: true,
      inputLength: 20,
      inputWidth: 0,
      filteredOptionsCount: 0,
      optionsCount: 0,
      hoverIndex: -1,
      bottomOverflowBeforeHidden: 0,
      cachedPlaceHolder: props.placeholder,
      currentPlaceholder: props.placeholder,
      selectedLabel: '',
      value: props.value
    };

    if (props.multiple) {
      _this.state.selectedInit = true;
      _this.state.selected = [];
    }

    if (props.remote) {
      _this.state.voidRemoteQuery = true;
    }

    _this.debouncedOnInputChange = (0, _utils.debounce)(function () {
      _this.onInputChange();
    }, _this.debounce());
    return _this;
  }

  _createClass(Select, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        component: this
      };
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var _props = this.props,
          remote = _props.remote,
          multiple = _props.multiple;
      var _state = this.state,
          value = _state.value,
          options = _state.options,
          selected = _state.selected;


      this.findDOMNodes();

      if (remote && multiple && Array.isArray(value)) {
        this.setState({
          selected: options.reduce(function (prev, curr) {
            return value.indexOf(curr.props.value) > -1 ? prev.concat(curr) : prev;
          }, [])
        }, function () {
          _this2.resetInputHeight();
        });
      } else {
        var _selected = options.filter(function (option) {
          return option.props.value === value;
        })[0];

        if (_selected) {
          this.state.selectedLabel = _selected.props.label;
        }
      }

      if (selected) {
        this.onSelectedChange(selected);
      }

      (0, _resizeEvent.addResizeListener)(this.root, this.resetInputWidth.bind(this));
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(props, state) {
      if (state.value != this.state.value) {
        this.onValueChange(state.value);
      }

      if (state.visible != this.state.visible) {
        this.onVisibleChange(state.visible);
      }

      if (state.query != this.state.query) {
        this.onQueryChange(state.query);
      }

      if (Array.isArray(state.selected)) {
        if (state.selected.length != this.state.selected.length) {
          this.onSelectedChange(state.selected);
        }
      } else {
        if (state.selected != this.state.selected) {
          this.onSelectedChange(state.selected);
        }
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(props, state) {
      this.findDOMNodes();

      if (this.refs.reference) {
        this.state.inputWidth = this.reference.getBoundingClientRect().width;
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      if (props.placeholder != this.props.placeholder) {
        this.setState({
          currentPlaceholder: props.placeholder
        });
      }
    }
  }, {
    key: 'componentWillUnMount',
    value: function componentWillUnMount() {
      if (this.resetInputWidth()) {
        (0, _resizeEvent.removeResizeListener)(this.root, this.resetInputWidth.bind(this));
      }
    }
  }, {
    key: 'findDOMNodes',
    value: function findDOMNodes() {
      this.reference = _reactDom2.default.findDOMNode(this.refs.reference);
      this.popper = _reactDom2.default.findDOMNode(this.refs.popper);
      this.input = _reactDom2.default.findDOMNode(this.refs.input);
      this.root = _reactDom2.default.findDOMNode(this);

      this.popperJS = new _popper2.default(this.reference, this.popper);
    }
  }, {
    key: 'debounce',
    value: function debounce() {
      return this.props.remote ? 300 : 0;
    }
  }, {
    key: 'handleClickOutside',
    value: function handleClickOutside() {
      this.setState({ visible: false });
    }
  }, {
    key: 'onVisibleChange',
    value: function onVisibleChange(visible) {
      var _props2 = this.props,
          multiple = _props2.multiple,
          filterable = _props2.filterable;
      var _state2 = this.state,
          query = _state2.query,
          dropdownUl = _state2.dropdownUl,
          selected = _state2.selected,
          selectedLabel = _state2.selectedLabel,
          bottomOverflowBeforeHidden = _state2.bottomOverflowBeforeHidden;


      if (!visible) {
        this.reference.querySelector('input').blur();

        if (this.root.querySelector('.el-input__icon')) {
          var elements = this.root.querySelector('.el-input__icon');

          for (var i = 0; i < elements.length; i++) {
            elements[i].classList.remove('is-reverse');
          }
        }

        // this.broadcast('select-dropdown', 'destroyPopper');

        if (this.refs.input) {
          this.input.blur();
        }

        this.resetHoverIndex();

        if (!multiple) {
          if (dropdownUl && selected) {
            bottomOverflowBeforeHidden = _reactDom2.default.findDOMNode(selected).getBoundingClientRect().bottom - this.popper.getBoundingClientRect().bottom;
          }

          if (selected && selected.props.value) {
            selectedLabel = selected.currentLabel();
          }

          this.setState({ bottomOverflowBeforeHidden: bottomOverflowBeforeHidden, selectedLabel: selectedLabel });
        }
      } else {
        var icon = this.root.querySelector('.el-input__icon');

        if (icon && !icon.classList.contains('el-icon-circle-close')) {
          var _elements = this.root.querySelector('.el-input__icon');

          for (var _i = 0; _i < _elements.length; _i++) {
            _elements[_i].classList.add('is-reverse');
          }
        }

        this.popperJS.update();

        if (filterable) {
          query = selectedLabel;

          if (multiple) {
            this.input.focus();
          } else {
            // this.broadcast('input', 'inputSelect');
          }
        }

        if (!dropdownUl) {
          var dropdownChildNodes = this.popper.childNodes;
          dropdownUl = [].filter.call(dropdownChildNodes, function (item) {
            return item.tagName === 'UL';
          })[0];
        }

        if (!multiple && dropdownUl) {
          if (bottomOverflowBeforeHidden > 0) {
            dropdownUl.scrollTop += bottomOverflowBeforeHidden;
          }
        }

        this.setState({ query: query || '', dropdownUl: dropdownUl });
      }
    }
  }, {
    key: 'onValueChange',
    value: function onValueChange(val) {
      var _this3 = this;

      var multiple = this.props.multiple;
      var _state3 = this.state,
          options = _state3.options,
          valueChangeBySelected = _state3.valueChangeBySelected,
          selectedInit = _state3.selectedInit,
          selected = _state3.selected,
          selectedLabel = _state3.selectedLabel,
          currentPlaceholder = _state3.currentPlaceholder,
          cachedPlaceHolder = _state3.cachedPlaceHolder;


      if (valueChangeBySelected) {
        return this.setState({
          valueChangeBySelected: false
        });
      }

      if (multiple && Array.isArray(val)) {
        this.resetInputHeight();

        selectedInit = true;
        selected = [];
        currentPlaceholder = cachedPlaceHolder;

        val.forEach(function (item) {
          var option = _this3.options.filter(function (option) {
            return option.props.value === item;
          })[0];
          if (option) {
            _this3.addOptionToValue(option);
          }
        });
      }

      if (!multiple) {
        var option = options.filter(function (option) {
          return option.props.value === val;
        })[0];

        if (option) {
          this.addOptionToValue(option);
        } else {
          selected = {};
          selectedLabel = '';
        }
      }

      this.setState({ selectedInit: selectedInit, selected: selected, currentPlaceholder: currentPlaceholder, selectedLabel: selectedLabel }, function () {
        _this3.resetHoverIndex();
      });
    }
  }, {
    key: 'onSelectedChange',
    value: function onSelectedChange(val) {
      var _this4 = this;

      var _props3 = this.props,
          multiple = _props3.multiple,
          filterable = _props3.filterable,
          onChange = _props3.onChange;
      var _state4 = this.state,
          query = _state4.query,
          hoverIndex = _state4.hoverIndex,
          inputLength = _state4.inputLength,
          selectedInit = _state4.selectedInit,
          currentPlaceholder = _state4.currentPlaceholder,
          cachedPlaceHolder = _state4.cachedPlaceHolder,
          valueChangeBySelected = _state4.valueChangeBySelected;


      if (multiple) {
        if (val.length > 0) {
          currentPlaceholder = '';
        } else {
          currentPlaceholder = cachedPlaceHolder;
        }

        this.setState({ currentPlaceholder: currentPlaceholder }, function () {
          _this4.resetInputHeight();
        });

        if (selectedInit) {
          return this.setState({
            selectedInit: false
          });
        }

        valueChangeBySelected = true;

        onChange && onChange(val.map(function (item) {
          return item.props.value;
        }));

        // this.dispatch('form-item', 'el.form.change', val);

        if (filterable) {
          query = '';
          hoverIndex = -1;
          inputLength = 20;

          this.refs.input.focus();
        }

        this.setState({ valueChangeBySelected: valueChangeBySelected, query: query, hoverIndex: hoverIndex, inputLength: inputLength }, function () {
          _this4.refs.input.value = '';
        });
      } else {
        if (selectedInit) {
          return this.setState({
            selectedInit: false
          });
        }

        onChange && onChange(val.props.value);
      }
    }
  }, {
    key: 'onQueryChange',
    value: function onQueryChange(query) {
      var _props4 = this.props,
          multiple = _props4.multiple,
          filterable = _props4.filterable,
          remote = _props4.remote,
          remoteMethod = _props4.remoteMethod,
          filterMethod = _props4.filterMethod;
      var _state5 = this.state,
          voidRemoteQuery = _state5.voidRemoteQuery,
          hoverIndex = _state5.hoverIndex,
          options = _state5.options,
          optionsCount = _state5.optionsCount;


      this.popperJS.update();

      if (multiple && filterable) {
        this.resetInputHeight();
      }

      if (remote && typeof remoteMethod === 'function') {
        hoverIndex = -1;
        voidRemoteQuery = query === '';

        remoteMethod(query);

        options.forEach(function (option) {
          option.resetIndex();
        });
      } else if (typeof filterMethod === 'function') {
        filterMethod(query);
      } else {
        this.setState({
          filteredOptionsCount: optionsCount
        }, function () {
          options.forEach(function (option) {
            option.queryChange(query);
          });
        });
      }

      this.setState({ hoverIndex: hoverIndex, voidRemoteQuery: voidRemoteQuery });
    }
  }, {
    key: 'optionsAllDisabled',
    value: function optionsAllDisabled(options) {
      return options.length === options.filter(function (item) {
        return item.props.disabled === true;
      }).length;
    }
  }, {
    key: 'iconClass',
    value: function iconClass() {
      return this.showCloseIcon() ? 'circle-close' : this.props.remote && this.props.filterable ? '' : 'caret-top';
    }
  }, {
    key: 'showCloseIcon',
    value: function showCloseIcon() {
      var criteria = this.props.clearable && this.state.inputHovering && !this.props.multiple && this.state.options.indexOf(this.state.selected) > -1;

      if (!this.root) return false;

      var icon = this.root.querySelector('.el-input__icon');

      if (icon) {
        if (criteria) {
          icon.addEventListener('click', this.deleteSelected.bind(this));
          icon.classList.add('is-show-close');
        } else {
          icon.removeEventListener('click', this.deleteSelected.bind(this));
          icon.classList.remove('is-show-close');
        }
      }

      return criteria;
    }
  }, {
    key: 'emptyText',
    value: function emptyText() {
      var _props5 = this.props,
          loading = _props5.loading,
          filterable = _props5.filterable;
      var _state6 = this.state,
          voidRemoteQuery = _state6.voidRemoteQuery,
          options = _state6.options,
          filteredOptionsCount = _state6.filteredOptionsCount;


      if (loading) {
        return _locale2.default.t('el.select.loading');
      } else {
        if (voidRemoteQuery) {
          this.state.voidRemoteQuery = false;

          return false;
        }

        if (filterable && filteredOptionsCount === 0) {
          return _locale2.default.t('el.select.noMatch');
        }

        if (options.length === 0) {
          return _locale2.default.t('el.select.noData');
        }
      }

      return null;
    }
  }, {
    key: 'doDestroy',
    value: function doDestroy() {
      this.refs.popper.doDestroy();
    }
  }, {
    key: 'handleClose',
    value: function handleClose() {
      this.setState({ visible: false });
    }
  }, {
    key: 'toggleLastOptionHitState',
    value: function toggleLastOptionHitState(hit) {
      var selected = this.state.selected;


      if (!Array.isArray(selected)) return;

      var option = selected[selected.length - 1];

      if (!option) return;

      if (hit === true || hit === false) {
        return option.hitState = hit;
      }

      option.hitState = !option.hitState;

      return option.hitState;
    }
  }, {
    key: 'deletePrevTag',
    value: function deletePrevTag(e) {
      if (e.target.value.length <= 0 && !this.toggleLastOptionHitState()) {
        var selected = this.state.selected;


        selected.pop();

        this.setState({ selected: selected });
      }
    }
  }, {
    key: 'addOptionToValue',
    value: function addOptionToValue(option, init) {
      var _props6 = this.props,
          multiple = _props6.multiple,
          remote = _props6.remote;
      var _state7 = this.state,
          selected = _state7.selected,
          selectedLabel = _state7.selectedLabel,
          hoverIndex = _state7.hoverIndex,
          value = _state7.value;


      if (multiple) {
        if (selected.indexOf(option) === -1 && (remote ? value.indexOf(option.props.value) === -1 : true)) {
          this.selectedInit = !!init;

          selected.push(option);

          this.resetHoverIndex();
        }
      } else {
        this.selectedInit = !!init;

        selected = option;
        selectedLabel = option.currentLabel();
        hoverIndex = option.index;
      }

      this.setState({ selected: selected, selectedLabel: selectedLabel, hoverIndex: hoverIndex });
    }
  }, {
    key: 'managePlaceholder',
    value: function managePlaceholder() {
      var _state8 = this.state,
          currentPlaceholder = _state8.currentPlaceholder,
          cachedPlaceHolder = _state8.cachedPlaceHolder;


      if (currentPlaceholder !== '') {
        currentPlaceholder = this.refs.input.value ? '' : cachedPlaceHolder;
      }

      this.setState({ currentPlaceholder: currentPlaceholder });
    }
  }, {
    key: 'resetInputState',
    value: function resetInputState(e) {
      if (e.keyCode !== 8) {
        this.toggleLastOptionHitState(false);
      }

      this.setState({
        inputLength: this.refs.input.value.length * 15 + 20
      });
    }
  }, {
    key: 'resetInputHeight',
    value: function resetInputHeight() {
      var inputChildNodes = this.reference.childNodes;
      var input = [].filter.call(inputChildNodes, function (item) {
        return item.tagName === 'INPUT';
      })[0];

      input.style.height = Math.max(this.refs.tags.clientHeight + 6, sizeMap[this.props.size] || 36) + 'px';

      this.popperJS.update();
    }
  }, {
    key: 'resetHoverIndex',
    value: function resetHoverIndex() {
      var _this5 = this;

      var multiple = this.props.multiple;
      var _state9 = this.state,
          hoverIndex = _state9.hoverIndex,
          options = _state9.options,
          selected = _state9.selected;


      setTimeout(function () {
        if (!multiple) {
          hoverIndex = options.indexOf(selected);
        } else {
          if (selected.length > 0) {
            hoverIndex = Math.min.apply(null, selected.map(function (item) {
              return options.indexOf(item);
            }));
          } else {
            hoverIndex = -1;
          }
        }

        _this5.setState({ hoverIndex: hoverIndex });
      }, 300);
    }
  }, {
    key: 'toggleMenu',
    value: function toggleMenu() {
      var _props7 = this.props,
          filterable = _props7.filterable,
          disabled = _props7.disabled;
      var _state10 = this.state,
          query = _state10.query,
          visible = _state10.visible;


      if (filterable && query === '' && visible) {
        return;
      }

      if (!disabled) {
        this.setState({
          visible: !visible
        });
      }
    }
  }, {
    key: 'navigateOptions',
    value: function navigateOptions(direction) {
      var _this6 = this;

      var _state11 = this.state,
          visible = _state11.visible,
          hoverIndex = _state11.hoverIndex,
          options = _state11.options;


      if (!visible) {
        return this.setState({
          visible: true
        });
      }

      var skip = void 0;

      if (!this.optionsAllDisabled(options)) {
        if (direction === 'next') {
          hoverIndex++;

          if (hoverIndex === options.length) {
            hoverIndex = 0;
          }

          this.resetScrollTop();

          if (options[hoverIndex].props.disabled === true || options[hoverIndex].props.groupDisabled === true || !options[hoverIndex].state.visible) {
            skip = 'next';
          }
        }

        if (direction === 'prev') {
          hoverIndex--;

          if (hoverIndex < 0) {
            hoverIndex = options.length - 1;
          }

          this.resetScrollTop();

          if (options[hoverIndex].props.disabled === true || options[hoverIndex].props.groupDisabled === true || !options[hoverIndex].state.visible) {
            skip = 'prev';
          }
        }
      }

      this.setState({ hoverIndex: hoverIndex, options: options }, function () {
        if (skip) {
          _this6.navigateOptions(skip);
        }
      });
    }
  }, {
    key: 'resetScrollTop',
    value: function resetScrollTop() {
      // let { hoverIndex, options, dropdownUl } = this.state;
      //
      // console.log(options, hoverIndex, options[hoverIndex]);
      //
      // let bottomOverflowDistance = ReactDOM.findDOMNode(options[hoverIndex]).getBoundingClientRect().bottom - this.popper.getBoundingClientRect().bottom;
      // let topOverflowDistance = ReactDOM.findDOMNode(options[hoverIndex]).getBoundingClientRect().top - this.popper.getBoundingClientRect().top;
      //
      // if (bottomOverflowDistance > 0) {
      //   dropdownUl.scrollTop += bottomOverflowDistance;
      // }
      // if (topOverflowDistance < 0) {
      //   dropdownUl.scrollTop += topOverflowDistance;
      // }
      //
      // this.setState({ dropdownUl });
    }
  }, {
    key: 'selectOption',
    value: function selectOption() {
      var _state12 = this.state,
          hoverIndex = _state12.hoverIndex,
          options = _state12.options;


      if (options[hoverIndex]) {
        this.onOptionClick(options[hoverIndex]);
      }
    }
  }, {
    key: 'deleteSelected',
    value: function deleteSelected(event) {
      event.stopPropagation();

      this.setState({
        selected: {},
        selectedLabel: '',
        visible: false
      });

      if (this.props.onChange) {
        this.props.onChange('');
      }
    }
  }, {
    key: 'deleteTag',
    value: function deleteTag(tag) {
      var selected = this.state.selected.slice(0);
      var index = selected.indexOf(tag);

      if (index > -1) {
        selected.splice(index, 1);
      }

      this.setState({ selected: selected });
    }
  }, {
    key: 'onInputChange',
    value: function onInputChange() {
      if (this.props.filterable && this.state.selectedLabel !== this.state.value) {
        this.setState({
          query: this.state.selectedLabel
        });
      }
    }
  }, {
    key: 'onOptionCreate',
    value: function onOptionCreate(option) {
      this.state.options.push(option);
      this.state.optionsCount++;
      this.state.filteredOptionsCount++;

      this.setState(this.state);
    }
  }, {
    key: 'onOptionDestroy',
    value: function onOptionDestroy(option) {
      var _this7 = this;

      this.state.optionsCount--;
      this.state.filteredOptionsCount--;

      var index = this.state.options.indexOf(option);

      if (index > -1) {
        this.state.options.splice(index, 1);
      }

      this.setState(this.state, function () {
        _this7.state.options.forEach(function (el) {
          if (el != option) {
            el.resetIndex();
          }
        });
      });
    }
  }, {
    key: 'onOptionClick',
    value: function onOptionClick(option) {
      var _this8 = this;

      var multiple = this.props.multiple;
      var _state13 = this.state,
          visible = _state13.visible,
          selected = _state13.selected,
          selectedLabel = _state13.selectedLabel;


      if (!multiple) {
        selected = option;
        selectedLabel = option.currentLabel();
        visible = false;
      } else {
        var optionIndex = -1;

        selected.forEach(function (item, index) {
          if (item === option || item.currentLabel() === option.currentLabel()) {
            optionIndex = index;
          }
        });

        if (optionIndex > -1) {
          selected.splice(optionIndex, 1);
        } else {
          selected.push(option);
        }
      }

      this.setState({ selected: selected, selectedLabel: selectedLabel }, function () {
        _this8.onSelectedChange(_this8.state.selected);
        _this8.setState({ visible: visible });
      });
    }
  }, {
    key: 'onMouseEnter',
    value: function onMouseEnter() {
      this.setState({
        inputHovering: true
      });
    }
  }, {
    key: 'onMouseLeave',
    value: function onMouseLeave() {
      this.setState({
        inputHovering: false
      });
    }
  }, {
    key: 'resetInputWidth',
    value: function resetInputWidth() {
      this.setState({
        inputWidth: this.reference.getBoundingClientRect().width
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this9 = this;

      var _props8 = this.props,
          multiple = _props8.multiple,
          size = _props8.size,
          disabled = _props8.disabled,
          filterable = _props8.filterable,
          loading = _props8.loading;
      var _state14 = this.state,
          selected = _state14.selected,
          inputWidth = _state14.inputWidth,
          inputLength = _state14.inputLength,
          query = _state14.query,
          selectedLabel = _state14.selectedLabel,
          visible = _state14.visible,
          options = _state14.options,
          filteredOptionsCount = _state14.filteredOptionsCount,
          currentPlaceholder = _state14.currentPlaceholder;


      return _react2.default.createElement(
        'div',
        { style: this.style(), className: this.className('el-select', {
            'is-multiple': multiple,
            'is-small': size === 'small'
          }) },
        multiple && _react2.default.createElement(
          'div',
          { ref: 'tags', className: 'el-select__tags', onClick: this.toggleMenu.bind(this), style: {
              maxWidth: inputWidth - 32 + 'px'
            } },
          selected.map(function (el) {
            return _react2.default.createElement(
              _tag2.default,
              {
                type: 'primary',
                key: el.props.value,
                hit: el.hitState,
                closable: true,
                closeTransition: true,
                onClose: _this9.deleteTag.bind(_this9, el)
              },
              el.currentLabel()
            );
          }),
          filterable && _react2.default.createElement('input', {
            ref: 'input',
            type: 'text',
            className: 'el-select__input',
            style: { width: inputLength, maxWidth: inputWidth - 42 },
            defaultValue: query,
            onKeyUp: this.managePlaceholder.bind(this),
            onChange: function onChange(e) {
              clearTimeout(_this9.timeout);

              _this9.timeout = setTimeout(function () {
                _this9.setState({
                  query: _this9.state.value
                });
              }, _this9.debounce());

              _this9.state.value = e.target.value;
            },
            onKeyDown: function onKeyDown(e) {
              _this9.resetInputState(e);

              switch (e.keyCode) {
                case 27:
                  _this9.setState({ visible: false });e.preventDefault();
                  break;
                case 8:
                  _this9.deletePrevTag(e);
                  break;
                case 13:
                  _this9.selectOption();e.preventDefault();
                  break;
                case 38:
                  _this9.navigateOptions('prev');e.preventDefault();
                  break;
                case 40:
                  _this9.navigateOptions('next');e.preventDefault();
                  break;
                default:
                  break;
              }
            }
          })
        ),
        _react2.default.createElement(_input2.default, {
          ref: 'reference',
          value: selectedLabel,
          type: 'text',
          placeholder: currentPlaceholder,
          name: 'name',
          disabled: disabled,
          readOnly: !filterable || multiple,
          icon: this.iconClass(),
          onChange: function onChange(e) {
            return _this9.setState({ selectedLabel: e.target.value });
          },
          onClick: this.toggleMenu.bind(this),
          onIconClick: this.toggleMenu.bind(this),
          onMouseEnter: this.onMouseEnter.bind(this),
          onMouseLeave: this.onMouseLeave.bind(this),
          onKeyUp: this.debouncedOnInputChange.bind(this),
          onKeyDown: function onKeyDown(e) {
            switch (e.keyCode) {
              case 9:
              case 27:
                _this9.setState({ visible: false });e.preventDefault();
                break;
              case 13:
                _this9.selectOption();e.preventDefault();
                break;
              case 38:
                _this9.navigateOptions('prev');e.preventDefault();
                break;
              case 40:
                _this9.navigateOptions('next');e.preventDefault();
                break;
              default:
                break;
            }
          }
        }),
        _react2.default.createElement(
          _libs.Transition,
          { name: 'md-fade-bottom', duration: '200' },
          _react2.default.createElement(
            _libs.View,
            { show: visible && this.emptyText() !== false },
            _react2.default.createElement(
              _Dropdown2.default,
              { ref: 'popper' },
              _react2.default.createElement(
                _libs.View,
                { show: options.length > 0 && filteredOptionsCount > 0 && !loading },
                _react2.default.createElement(
                  'ul',
                  { className: 'el-select-dropdown__list' },
                  this.props.children
                )
              ),
              this.emptyText() && _react2.default.createElement(
                'p',
                { className: 'el-select-dropdown__empty' },
                this.emptyText()
              )
            )
          )
        )
      );
    }
  }]);

  return Select;
}(_libs.Component);

Select.childContextTypes = {
  component: _libs.PropTypes.any
};

Select.propTypes = {
  name: _libs.PropTypes.string,
  value: _libs.PropTypes.any,
  size: _libs.PropTypes.string,
  disabled: _libs.PropTypes.bool,
  clearable: _libs.PropTypes.bool,
  filterable: _libs.PropTypes.bool,
  loading: _libs.PropTypes.bool,
  remote: _libs.PropTypes.bool,
  remoteMethod: _libs.PropTypes.func,
  filterMethod: _libs.PropTypes.func,
  multiple: _libs.PropTypes.bool,
  placeholder: _libs.PropTypes.string,
  onChange: _libs.PropTypes.func
};

Select.defaultProps = {
  placeholder: _locale2.default.t('el.select.placeholder')
};

var _default = (0, _reactClickOutside2.default)(Select);

exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(sizeMap, 'sizeMap', 'src/select/Select.jsx');

  __REACT_HOT_LOADER__.register(Select, 'Select', 'src/select/Select.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/select/Select.jsx');
}();

;