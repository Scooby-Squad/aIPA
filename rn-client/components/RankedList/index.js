import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { getRankedBeers } from '../../store/beer';
import List from '../list'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});

export default function RankedList(props) {
  const ranked = useSelector(state => state.beer.ranked);
  const sort = (a, b) =>
    (a.rating < b.rating
      ? 1
      : a.rating === b.rating ? (a.name > b.name ? 1 : -1) : -1)

  let rendered = <List beers={ranked} sortCB={sort} dispatchCreator={getRankedBeers} />
  let loading = <Text> Loading </Text>;

  return ranked ? rendered : loading;
}
