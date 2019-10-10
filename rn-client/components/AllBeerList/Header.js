import React from 'react';
import { View, Text } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import styles, { space } from './style-sheet';

const renderHeader = props => (
  <View>
    <Text>{space}</Text>
    <Dropdown
      style={styles.dropDown}
      label={props.search}
      data={props.types}
      onChangeText={(selection, index) => {
        props.selectionHandler(index, selection);
      }}
    />
  </View>
);
export default renderHeader;
