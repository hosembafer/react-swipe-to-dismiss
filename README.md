# react-swipe-to-delete
Swipe to delete Component for notifications

## Install
React-swipe-to-delete is available via [npm](https://www.npmjs.com/package/react-swipe-to-delete).
```
npm install --save react-swipe-to-delete
```

## Usage
react-swipe-to-delete decorate your component, not wrapping, so you can use it on layouts too.
When your component become swiped more than it's width, it will be removed and onDelete callback will be fired.

### Example
You may see an example [here](https://rawgit.com/hosembafer/react-swipe-to-delete/master/example/build/index.html).
```js
// Import
import SwipeToDelete from 'react-swipe-to-delete';

// Use
<SwipeToDelete
  onDelete={() => this.props.remove()}
>
  <div className="Message">
    Your changes has been saved.
  </div>
</SwipeToDelete>

```

### Props
- **onDelete** - function. If a component swiped more than its width then it will be called.