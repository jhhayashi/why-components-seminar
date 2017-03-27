import React from 'react';
import { StyleSheet, Text, View, } from 'react-native';

export default (props) => (
  <View style={styles.wrap}>
    <Text style={styles.text}>{`${props.username}: ${props.text}`}</Text>
  </View>
);

const styles = StyleSheet.create({
  wrap: {
    height: 30,
    borderRadius: 15,
    backgroundColor: 'blue',
    marginBottom: 10,
    marginRight: 10,
    marginLeft: 10,
    padding: 5,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
  },
});
