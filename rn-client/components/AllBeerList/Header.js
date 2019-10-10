import React from 'react';
import { View, Text } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { Searchbar } from 'react-native-paper';
import styles, { space } from './style-sheet';

const renderHeader = props => (
  <View>
    <Text>{space}</Text>
    <Searchbar
      placeholder="Search"
      onChangeText={query => {
        props.changeHandler(query, props.type, props.typeIndex);
      }}
      value={props.search}
    />
    <Dropdown
      style={styles.dropDown}
      label={props.type}
      data={props.types}
      onChangeText={(selection, index) => {
        props.changeHandler(props.search, selection, index);
      }}
    />
  </View>
);
export default renderHeader;
