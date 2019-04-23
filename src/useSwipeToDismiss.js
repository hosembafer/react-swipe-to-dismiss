import {useCallback, useEffect, useState} from 'react';

const useSwipeToDismiss = (ref, onDismiss, removeDOM, distanceBeforeDismiss, direction) => {
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

  const onMouseDown = (event) => {
    setPressedPosition(event.screenX);
    setAnimate(false);
  };


  useEffect(() => {
    document.body.addEventListener('mouseup', onMouseUp);
    return () => document.body.removeEventListener('mouseup', onMouseUp);
  });

  const style = {
    transform: `translateX(${positionLeft}px)`,
    opacity,
  };

  if (animate) {
    style.transition = 'transform 0.3s ease, opacity 0.5s ease';
  }

  return {
    onMouseMove,
    onMouseDown,
    style,
  };
};

export default useSwipeToDismiss;
