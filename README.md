# react-swipe-to-dismiss
Swipe to dismiss Component for notifications

## Install
React-swipe-to-dismiss is available via [npm](https://www.npmjs.com/package/react-swipe-to-dismiss).
```
npm install --save react-swipe-to-dismiss
```

## Usage
react-swipe-to-dismiss decorate your component, not wrapping, so you can use it on layouts too.
When your component become swiped more than it's width, it will be removed and onDismiss callback will be fired.

### Example
You may see an example <a href="https://rawgit.com/hosembafer/react-swipe-to-dismiss/master/example/build/index.html" target="_blank">here</a>.
```js
// Import
import SwipeToDismiss from 'react-swipe-to-dismiss';

// Use
<SwipeToDismiss
  onDismiss={() => this.props.remove()}
>
  <div className="Message">
    Your changes has been saved.
  </div>
</SwipeToDismiss>

```

### Props
- **onDismiss** - function. If a component swiped more than its width then it will be called.
- **distanceBeforeDismiss** - number. Distance in pixels from where lib will trigger **onDismiss**
- **removeDOM** - boolean. Remove from DOM when element reaches **distanceBeforeDismiss**
- **direction** - enum(left, right). In which direction user can swipe the element