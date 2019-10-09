import React from 'react';
import { View, Text } from 'react-native';

export default function Item(props) {
  console.log(props);
  return (
    <View>
      <Text>Name:{` ${props.name}`}</Text>
      <Text>Rating:{` ${props.rating}`}</Text>
    </View>
  );
}
