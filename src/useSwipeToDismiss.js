import {useCallback, useEffect, useState} from 'react';

const useSwipeToDismiss = (ref, onDismiss, removeDOM = false, distanceBeforeDismiss = 100, direction = 'right') => {
  const node = ref.current;

  const [removing, setRemoving] = useState(false);
  const [pressedPosition, setPressedPosition] = useState(false);
  const [positionLeft, setPositionLeft] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [opacity, setOpacity] = useState(1);

  const remove = useCallback(() => {
    setTimeout(() => {
      if (removeDOM) {
        node.remove();
      }
      onDismiss();
    }, 300);
  }, [removeDOM, node, onDismiss]);

  const onMouseUp = useCallback(() => {
    if (!removing) {
      setPressedPosition(false);
      setPositionLeft(0);
      setAnimate(true);
      setOpacity(1);
    }
  }, [removing]);

  const onMouseMove = useCallback((event) => {
    if (removing) return;

    if (pressedPosition) {
      let newPositionLeft = event.screenX - pressedPosition;
      const directionValue = direction === 'right' ? 1 : -1;

      if ((direction === 'right' && newPositionLeft >= (node.offsetWidth * distanceBeforeDismiss / 100)) || (direction === 'left' && newPositionLeft * directionValue >= (node.offsetWidth * distanceBeforeDismiss / 100))) {
        newPositionLeft = newPositionLeft + node.offsetWidth * directionValue;
        setAnimate(true);
        setRemoving(true);
        setTimeout(() => {
          remove();
        }, 500);
      }
      else {
        if (direction === 'right') {
          newPositionLeft = newPositionLeft < 0 ? 0 : newPositionLeft;
        } else {
          newPositionLeft = newPositionLeft > 0 ? 0 : newPositionLeft;
        }
      }

      setPositionLeft(newPositionLeft);
      setOpacity((100 - (newPositionLeft * directionValue * 100 / (node.offsetWidth * 2))) / 100);
    }
  }, [removing, pressedPosition, direction, distanceBeforeDismiss, node, remove]);

  const onMouseDown = useCallback((event) => {
    setPressedPosition(event.screenX);
    setAnimate(false);
  }, [setPressedPosition, setAnimate]);

  useEffect(() => {
    if (!node) {
      setOpacity(1.1); // forceUpdate
    }

    node && node.addEventListener('mousedown', onMouseDown);
    return () => node && node.removeEventListener('mousedown', onMouseDown);
  }, [node, onMouseDown, setOpacity]);

  useEffect(() => {
    document.body.addEventListener('mouseup', onMouseUp);
    document.body.addEventListener('mousemove', onMouseMove);

    return () => {
      document.body.removeEventListener('mouseup', onMouseUp);
      document.body.removeEventListener('mousemove', onMouseMove);
    };
  }, [onMouseUp, onMouseDown, onMouseMove]);

  const style = {
    transform: `translateX(${positionLeft}px)`,
    opacity,
  };

  if (animate) {
    style.transition = 'transform 0.3s ease, opacity 0.5s ease';
  }
  else {
    style.transition = '';
  }
  
  if (node) {
    for (let property in style) {
      node.style[property] = style[property];
    }
  }
};

export default useSwipeToDismiss;
