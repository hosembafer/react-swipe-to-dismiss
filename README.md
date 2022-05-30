# react-swipe-to-dismiss
Swipe to dismiss hook for notifications

## Install
React-swipe-to-dismiss is available via [npm](https://www.npmjs.com/package/react-swipe-to-dismiss).
```
npm install --save react-swipe-to-dismiss
```

## Example
You may see an example <a href="https://rawgit.com/hosembafer/react-swipe-to-dismiss/master/example/build/index.html" target="_blank">here</a>.
```js
import { useSwipeToDismiss } from 'react-swipe-to-dismiss';

const MessageItem = () => {
  const ref = useRef();
  useSwipeToDismiss(ref, onDismiss, false, 50, 'right');

  return (
    <div className="Message" ref={ref}>
      Your changes has been saved.
    </div>
  );
}

```

### Props
- **onDismiss** - function. If a component swiped more than its width then it will be called.
- **distanceBeforeDismiss** - number. Distance in pixels from where lib will trigger **onDismiss**
- **removeDOM** - boolean. Remove from DOM when element reaches **distanceBeforeDismiss**
- **direction** - enum(left, right). In which direction user can swipe the element