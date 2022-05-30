"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
Object.defineProperty(exports, "useSwipeToDismiss", {
  enumerable: true,
  get: function get() {
    return _useSwipeToDismiss["default"];
  }
});

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactDom = require("react-dom");

var _useSwipeToDismiss = _interopRequireDefault(require("./useSwipeToDismiss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var SwipeToDismiss = /*#__PURE__*/function (_React$Component) {
  _inherits(SwipeToDismiss, _React$Component);

  var _super = _createSuper(SwipeToDismiss);

  function SwipeToDismiss(props) {
    var _this;

    _classCallCheck(this, SwipeToDismiss);

    _this = _super.call(this, props);
    _this.node = null;
    _this.state = {
      positionLeft: 0,
      pressedPosition: false,
      animate: false,
      opacity: 1,
      removing: false
    };
    _this.onMouseMove = _this.onMouseMove.bind(_assertThisInitialized(_this));
    _this.onMouseUp = _this.onMouseUp.bind(_assertThisInitialized(_this));
    _this.onMouseDown = _this.onMouseDown.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(SwipeToDismiss, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.node = (0, _reactDom.findDOMNode)(this);
      document.body.addEventListener('mouseup', this.onMouseUp);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.body.removeEventListener('mouseup', this.onMouseUp);
    }
  }, {
    key: "onMouseMove",
    value: function onMouseMove(event) {
      var _this2 = this;

      var _this$state = this.state,
          pressedPosition = _this$state.pressedPosition,
          removing = _this$state.removing;
      var _this$props = this.props,
          distanceBeforeDismiss = _this$props.distanceBeforeDismiss,
          direction = _this$props.direction;
      if (removing) return;

      if (pressedPosition) {
        var newPositionLeft = event.screenX - pressedPosition;
        var directionValue = direction === 'right' ? 1 : -1;
        var newState = JSON.parse(JSON.stringify(this.state));

        if (direction === 'right' && newPositionLeft >= this.node.offsetWidth * distanceBeforeDismiss / 100 || direction === 'left' && newPositionLeft * directionValue >= this.node.offsetWidth * distanceBeforeDismiss / 100) {
          newPositionLeft = newPositionLeft + this.node.offsetWidth * directionValue;
          newState.animate = true;
          newState.removing = true;
          setTimeout(function () {
            _this2.remove();
          }, 500);
        } else {
          if (direction === 'right') {
            newPositionLeft = newPositionLeft < 0 ? 0 : newPositionLeft;
          } else {
            newPositionLeft = newPositionLeft > 0 ? 0 : newPositionLeft;
          }
        }

        newState.positionLeft = newPositionLeft;
        newState.opacity = (100 - newPositionLeft * directionValue * 100 / (this.node.offsetWidth * 2)) / 100;
        this.setState(newState);
      }
    }
  }, {
    key: "onMouseDown",
    value: function onMouseDown(event) {
      this.setState({
        pressedPosition: event.screenX,
        animate: false
      });
    }
  }, {
    key: "onMouseUp",
    value: function onMouseUp() {
      var removing = this.state.removing;

      if (!removing) {
        this.setState({
          pressedPosition: false,
          positionLeft: 0,
          animate: true,
          opacity: 1
        });
      }
    }
  }, {
    key: "remove",
    value: function remove() {
      var _this3 = this;

      var _this$props2 = this.props,
          onDismiss = _this$props2.onDismiss,
          removeDOM = _this$props2.removeDOM;
      setTimeout(function () {
        if (removeDOM) {
          _this3.node.remove();
        }

        onDismiss();
      }, 300);
    }
  }, {
    key: "render",
    value: function render() {
      var children = this.props.children;
      var _this$state2 = this.state,
          positionLeft = _this$state2.positionLeft,
          animate = _this$state2.animate,
          opacity = _this$state2.opacity;
      var style = {
        transform: "translateX(".concat(positionLeft, "px)"),
        opacity: opacity
      };

      if (animate) {
        style.transition = 'transform 0.3s ease, opacity 0.5s ease';
      }

      var child = _react["default"].Children.only(children);

      var newChildProps = {
        style: style,
        onMouseMove: this.onMouseMove,
        onMouseDown: this.onMouseDown,
        className: child.props.className
      };
      return _react["default"].cloneElement(child, newChildProps);
    }
  }]);

  return SwipeToDismiss;
}(_react["default"].Component);

SwipeToDismiss.propTypes = {
  onDismiss: _propTypes["default"].func.isRequired,
  distanceBeforeDismiss: _propTypes["default"].number,
  removeDOM: _propTypes["default"].bool,
  direction: _propTypes["default"].string
};
SwipeToDismiss.defaultProps = {
  distanceBeforeDismiss: 100,
  direction: 'right',
  removeDOM: false
};
var _default = SwipeToDismiss;
exports["default"] = _default;