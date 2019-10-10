import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { getRankedBeers } from '../../store/beer';
import List from '../List'

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
  const rankedState = state => state.beer.ranked;
  const sort = (a, b) =>
    (a.rating < b.rating
      ? 1
      : a.rating === b.rating ? (a.name > b.name ? 1 : -1) : -1)

  return <List {...props} selectorCB={rankedState} sortCB={sort} dispatchCreator={getRankedBeers} />
}
