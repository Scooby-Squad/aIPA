import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import { getPredictions } from '../../store/beer';
import List from '../List'

export default function RecommendedList(props) {
  const predictionsState = state => state.beer.predictions;
  // need to run getPredictions upon completion of quiz
  const ratingToUse = 'prediction'
  const listToUse = 'predictions'
  const starColorToUse = 'gray'
  const sort = (a, b) =>
    (a.prediction < b.prediction
      ? 1
      : a.prediction === b.prediction ? (a.name > b.name ? 1 : -1) : -1)

  return <List {...props} listToUse={listToUse} ratingToUse={ratingToUse} selectorCB={predictionsState} sortCB={sort} dispatchCreator={getPredictions} starColorToUse={starColorToUse} />
}
