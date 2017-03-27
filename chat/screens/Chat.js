import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import Message from '../components/Message';

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: '' };
  }

  _sendMessage() {
    this.props.sendMessage(this.state.message);
    this.refs.input.clear();
  }

  render() {
    return (
      <View style={styles.wrap}>
        <View style={styles.statusBar}/>
        <View style={styles.navbar}>
          <Text>{`Hi, ${this.props.username}!`}</Text>
          <TouchableOpacity onPress={this.props.logout}>
            <Text style={styles.button}>Logout</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.chats}>
          {this.props.chats.map(x => <Message key={x.id} {...x} />)}
        </ScrollView>

        <TextInput
          ref={'input'}
          style={styles.input}
          onChangeText={ message => this.setState({ message }) }
          onSubmitEditing={this._sendMessage.bind(this)}
          blurOnSubmit={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  statusBar: {
    height: 20,
  },
  navbar: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'black',
    padding: 10,
  },
  chats: {
    flex: 1,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: 'black',
  },
});
