import React from 'react';

import Chat from './screens/Chat';
import Login from './screens/Login';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      chats: [],
    };
  }

  _sendMessage(message) {
    this.setState({
      chats: [...this.state.chats, {
        id: this.state.chats.length,
        username: this.state.username,
        text: message,
      }]
    });
  }

  _renderLogin() {
    return (
      <Login
        register={ username => this.setState({ username }) }
      />
    );
  }

  _renderChat() {
    return (
      <Chat
        username={this.state.username}
        chats={this.state.chats}
        sendMessage={this._sendMessage.bind(this)}
        logout={() => this.setState({ username: '' })}
      />
    );
  }

  render() {
    // show login page if not registered (no username)
    if (!this.state.username) return this._renderLogin();
    else return this._renderChat();
  }
}
