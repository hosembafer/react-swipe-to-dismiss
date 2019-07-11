"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useSwipeToDismiss = function useSwipeToDismiss(ref, onDismiss) {
  var removeDOM = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var distanceBeforeDismiss = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 100;
  var direction = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'right';
  var node = ref.current;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      removing = _useState2[0],
      setRemoving = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      pressedPosition = _useState4[0],
      setPressedPosition = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      positionLeft = _useState6[0],
      setPositionLeft = _useState6[1];

  var _useState7 = (0, _react.useState)(false),
      _useState8 = _slicedToArray(_useState7, 2),
      animate = _useState8[0],
      setAnimate = _useState8[1];

  var _useState9 = (0, _react.useState)(1),
      _useState10 = _slicedToArray(_useState9, 2),
      opacity = _useState10[0],
      setOpacity = _useState10[1];

  var remove = (0, _react.useCallback)(function () {
    setTimeout(function () {
      if (removeDOM) {
        node.remove();
      }

      onDismiss();
    }, 300);
  }, [removeDOM, node, onDismiss]);
  var onMouseUp = (0, _react.useCallback)(function () {
    if (!removing) {
      setPressedPosition(false);
      setPositionLeft(0);
      setAnimate(true);
      setOpacity(1);
    }
  }, [removing]);
  var onMouseMove = (0, _react.useCallback)(function (event) {
    if (removing) return;

    if (pressedPosition) {
      var newPositionLeft = event.screenX - pressedPosition;
      var directionValue = direction === 'right' ? 1 : -1;

      if (direction === 'right' && newPositionLeft >= node.offsetWidth * distanceBeforeDismiss / 100 || direction === 'left' && newPositionLeft * directionValue >= node.offsetWidth * distanceBeforeDismiss / 100) {
        newPositionLeft = newPositionLeft + node.offsetWidth * directionValue;
        setAnimate(true);
        setRemoving(true);
        setTimeout(function () {
          remove();
        }, 500);
      } else {
        if (direction === 'right') {
          newPositionLeft = newPositionLeft < 0 ? 0 : newPositionLeft;
        } else {
          newPositionLeft = newPositionLeft > 0 ? 0 : newPositionLeft;
        }
      }

      setPositionLeft(newPositionLeft);
      setOpacity((100 - newPositionLeft * directionValue * 100 / (node.offsetWidth * 2)) / 100);
    }
  }, [removing, pressedPosition, direction, distanceBeforeDismiss, node, remove]);
  var onMouseDown = (0, _react.useCallback)(function (event) {
    setPressedPosition(event.screenX);
    setAnimate(false);
  }, [setPressedPosition, setAnimate]);
  (0, _react.useEffect)(function () {
    if (!node) {
      setOpacity(1.1); // forceUpdate
    }

    node && node.addEventListener('mousedown', onMouseDown);
    return function () {
      return node && node.removeEventListener('mousedown', onMouseDown);
    };
  }, [node, onMouseDown, setOpacity]);
  (0, _react.useEffect)(function () {
    document.body.addEventListener('mouseup', onMouseUp);
    document.body.addEventListener('mousemove', onMouseMove);
    return function () {
      document.body.removeEventListener('mouseup', onMouseUp);
      document.body.removeEventListener('mousemove', onMouseMove);
    };
  }, [onMouseUp, onMouseDown, onMouseMove]);
  var style = {
    transform: "translateX(".concat(positionLeft, "px)"),
    opacity: opacity
  };

  if (animate) {
    style.transition = 'transform 0.3s ease, opacity 0.5s ease';
  } else {
    style.transition = '';
  }

  if (node) {
    for (var property in style) {
      node.style[property] = style[property];
    }
  }
};

var _default = useSwipeToDismiss;
exports["default"] = _default;