import React, {useRef, useState} from 'react';
import './App.css';

import useSwipeToDismiss from './useSwipeToDismiss';

const MessageItem = ({message, onDismiss}) => {
  const ref = useRef(null);

  const restProps = useSwipeToDismiss(ref, onDismiss, false, 100, 'right');

  return <div ref={ref} className={'Message'} {...restProps}>
    {message}
  </div>;
};

function App() {
  const [messages, setMessages] = useState([
    'Your changes has been saved.',
    'Please verify your email.',
    'Foo',
    'Bar',
  ]);

  const handleDismiss = (indexToRemove) => {
    const newMessages = messages.filter((it, index) => index !== indexToRemove);

    setMessages(newMessages);
  };

  return (
    <div className="App">
      <div className={'MessageList'}>
        {messages.map((it, index) => (
          <MessageItem
            key={btoa(it)}
            message={it}
            onDismiss={() => handleDismiss(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
