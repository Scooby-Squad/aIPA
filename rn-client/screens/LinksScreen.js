import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import RankedList from '../components/RankedList';

export default function LinksScreen(props) {
  return (
    <ScrollView style={styles.container}>
      <RankedList navigation={props.navigation} />
    </ScrollView>
  );
}

LinksScreen.navigationOptions = {
  title: 'Beer Rankings',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
