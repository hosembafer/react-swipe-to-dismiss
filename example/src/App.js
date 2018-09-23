import React, { Component } from 'react';
import './App.css';

import SwipeToDelete from 'react-swipe-to-delete';

class App extends Component {
  state = {
    messages: [
      'Your changes has been saved.',
      'Please verify your email.',
      'Foo',
      'Bar',
    ],
  };

  remove = (indexToRemove) => {
    const messages = this.state.messages.filter((it, index) => index !== indexToRemove);

    this.setState({
      messages,
    });
  };

  render() {
    const {
      messages,
    } = this.state;

    return (
      <div className="App">
        <div className={'MessageList'}>
          {messages.map((it, index) => (
            <SwipeToDelete
              key={btoa(it)}
              onDelete={() => this.remove(index)}
            >
              <div className={'Message'}>
                {it}
              </div>
            </SwipeToDelete>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
