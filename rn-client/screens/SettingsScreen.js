import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import AllBeerList from '../components/AllBeerList';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff'
  }
});

export default function SearchScreen(props) {
  return (
    <ScrollView style={styles.container}>
      <AllBeerList navigation={props.navigation} />
    </ScrollView>
  );
}

SearchScreen.navigationOptions = {
  title: 'Search'
};
