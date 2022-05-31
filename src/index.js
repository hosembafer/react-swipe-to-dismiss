import { useCallback, useEffect, useState } from 'react';

const getScreenX = (event) => {
  let screenX;
  if (event instanceof TouchEvent) {
    screenX = event.touches[0].screenX;
  } else {
    screenX = event.screenX;
  }
  return screenX;
};

export const useSwipeToDismiss = (ref, onDismiss, removeDOM = false, distanceBeforeDismiss = 100, direction = 'right') => {
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
    event.preventDefault();
    if (removing) return;

    const screenX = getScreenX(event);

    if (pressedPosition) {
      let newPositionLeft = screenX - pressedPosition;
      const directionValue = direction === 'right' ? 1 : -1;

      if ((direction === 'right' && newPositionLeft >= (node.offsetWidth * distanceBeforeDismiss / 100)) || (direction === 'left' && newPositionLeft * directionValue >= (node.offsetWidth * distanceBeforeDismiss / 100))) {
        newPositionLeft = newPositionLeft + node.offsetWidth * directionValue;
        setAnimate(true);
        setRemoving(true);
        remove();
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
    const screenX = getScreenX(event);

    setPressedPosition(screenX);
    setAnimate(false);
  }, [setPressedPosition, setAnimate]);

  useEffect(() => {
    if (!node) {
      setOpacity(1.1); // forceUpdate
    }

    if (node) {
      node.addEventListener('mousedown', onMouseDown);
      node.addEventListener('touchstart', onMouseDown);
    }
    return () => {
      if (node) {
        node.removeEventListener('mousedown', onMouseDown);
        node.removeEventListener('touchstart', onMouseDown);
      }
    };
  }, [node, onMouseDown, setOpacity]);

  useEffect(() => {
    document.body.addEventListener('mouseup', onMouseUp);
    document.body.addEventListener('mousemove', onMouseMove);

    document.body.addEventListener('touchmove', onMouseMove, { passive: false });
    document.body.addEventListener('touchend', onMouseUp);

    return () => {
      document.body.removeEventListener('mouseup', onMouseUp);
      document.body.removeEventListener('mousemove', onMouseMove);

      document.body.removeEventListener('touchmove', onMouseMove);
      document.body.removeEventListener('touchend', onMouseMove);
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
