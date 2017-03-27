import React from 'react';

import Chat from './screens/Chat';
import Login from './screens/Login';
import { getChats, postChat, } from './api/api';

const POLL_INTERVAL = 500;

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      chats: [],
    };
  }

  componentWillMount() {
    this.interval = setInterval(() => {
      getChats().then(chats => this.setState({ chats }))
    }, POLL_INTERVAL)
  }

  componentWillUnmount() {
    this.interval && clearInterval(this.interval);
  }


  _sendMessage(message) {
    postChat({
      username: this.state.username,
      text: message,
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
