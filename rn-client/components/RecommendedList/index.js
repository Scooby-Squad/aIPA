import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { getPredictions } from '../../store/beer';
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

export default function RecommendedList(props) {
  const predictionsState = state => state.beer.predictions;
  // need to run getPredictions upon completion of quiz
  const sort = (a, b) =>
    (a.rating < b.rating
      ? 1
      : a.rating === b.rating ? (a.name > b.name ? 1 : -1) : -1)

  return <List selectorCB={predictionsState} sortCB={sort} dispatchCreator={getPredictions} />
}
