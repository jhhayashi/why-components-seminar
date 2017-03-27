import React from 'react';
import { StyleSheet, Text, TextInput, View, } from 'react-native';

export default class Login extends React.Component {
  render() {
    return (
      <View style={styles.wrap}>
        <Text style={styles.title}>Please enter a username:</Text>
        <TextInput
            style={styles.input}
            onChangeText={ username => this.setState({ username }) }
            onSubmitEditing={() => this.props.register(this.state.username) }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    paddingBottom: 10,
  },
  input: {
    alignSelf: 'center',
    height: 40,
    width: 150,
    padding: 5,
    borderWidth: 1,
    borderColor: 'black',
  },
});
