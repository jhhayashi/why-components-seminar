import React from 'react';
import { Text, } from 'react-native';

export default (props) => (
  <Text>{`${props.username}: ${props.text}`}</Text>
);
