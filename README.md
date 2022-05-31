# react-swipe-to-dismiss
[![npm version](https://img.shields.io/npm/v/react-swipe-to-dismiss?logo=npm)](https://www.npmjs.com/package/react-swipe-to-dismiss)
[![npm downloads](https://img.shields.io/npm/dw/react-swipe-to-dismiss?logo=npm)](https://www.npmjs.com/package/react-swipe-to-dismiss)
[![npm size](https://img.shields.io/bundlephobia/min/react-swipe-to-dismiss?logo=npm)](https://www.npmjs.com/package/react-swipe-to-dismiss)

Swipe to dismiss hook for notifications

### [Demo](https://react-swipe-to-dismiss.netlify.app)

## Install via [npm](https://www.npmjs.com/package/react-react-tiny-dnd)

```shell
npm install react-react-tiny-dnd
```

or

```shell
yarn add react-react-tiny-dnd
```

## Usage
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
