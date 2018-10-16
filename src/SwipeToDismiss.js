import React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';

class SwipeToDismiss extends React.Component {
  constructor(props) {
    super(props);

    this.node = null;

    this.state = {
      positionLeft: 0,
      pressedPosition: false,
      animate: false,
      opacity: 1,
      removing: false,
    };

    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
  }

  componentDidMount() {
    this.node = findDOMNode(this);

    document.body.addEventListener('mouseup', this.onMouseUp);
  }

  componentWillUnmount() {
    document.body.removeEventListener('mouseup', this.onMouseUp);
  }

  onMouseMove(event) {
    const {
      pressedPosition,
      removing,
    } = this.state;

    if (removing) return;

    if (pressedPosition) {
      let newPositionLeft = event.screenX - pressedPosition;
      const directionValue = this.props.direction === 'right' ? 1 : -1
      const newState = JSON.parse(JSON.stringify(this.state));
      if ((this.props.direction === 'right' && newPositionLeft >= (this.node.offsetWidth * this.props.distanceBeforeDissmiss / 100)) || (this.props.direction === 'left' && newPositionLeft * directionValue >= (this.node.offsetWidth * this.props.distanceBeforeDissmiss / 100)) ) {
        newPositionLeft = newPositionLeft + this.node.offsetWidth * directionValue;
        newState.animate = true;
        newState.removing = true;
        setTimeout(() => {
          this.node.style.height = '0'
          this.node.remove();
        }, 500)
      }
      else {
        if (this.props.direction === 'right') {
          newPositionLeft = newPositionLeft < 0 ? 0 : newPositionLeft;
        } else {
          newPositionLeft = newPositionLeft > 0 ? 0 : newPositionLeft;
        }
      }

      console.log(newPositionLeft);
      newState.positionLeft = newPositionLeft;
      newState.opacity = (100 - (newPositionLeft * directionValue * 100 / (this.node.offsetWidth * 2))) / 100;

      this.setState(newState);
    }
  }

  onMouseDown(event) {
    this.setState({
      pressedPosition: event.screenX,
      animate: false,
    });
  }

  onMouseUp() {
    const {
      removing,
    } = this.state;

    if (!removing) {
      this.setState({
        pressedPosition: false,
        positionLeft: 0,
        animate: true,
        opacity: 1,
      });
    }
  }

  remove() {
    const {
      onDismiss,
      distanceBeforeDissmiss,
    } = this.props;

    setTimeout(() => onDismiss(), 300);
  }

  render() {
    const {
      children,
    } = this.props;

    const {
      positionLeft,
      animate,
      opacity,
    } = this.state;

    const style = {
      transform: `translateX(${positionLeft}px)`,
      opacity,
    };

    if (animate) {
      style.transition = 'transform 0.3s ease, opacity 0.5s ease';
    }

    const child = React.Children.only(children);

    const newChildProps = {
      style,
      onMouseMove: this.onMouseMove,
      onMouseDown: this.onMouseDown,

      className: child.props.className,
    };

    return React.cloneElement(child, newChildProps);
  }
}

SwipeToDismiss.propTypes = {
  onDismiss: PropTypes.func.isRequired,
  distanceBeforeDissmiss: PropTypes.number,
  direction: PropTypes.string,
};

SwipeToDismiss.defaultProps = {
  distanceBeforeDissmiss: 100,
  direction: 'right',
};

export default SwipeToDismiss;
