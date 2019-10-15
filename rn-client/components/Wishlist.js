import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import { getWishlist } from '../store/beer';
import List from './List'

export default function WishList(props) {
  const wishlistState = state => state.beer.wishlist;
  // need to run getPredictions upon completion of quiz
  const ratingToUse = 'prediction'
  const listToUse = 'wishlist'
  const starColorToUse = 'gray'
  const sort = (a, b) =>
    (a.prediction < b.prediction
      ? 1
      : a.prediction === b.prediction ? (a.name > b.name ? 1 : -1) : -1)

  return <List {...props} listToUse={listToUse} ratingToUse={ratingToUse} selectorCB={wishlistState} sortCB={sort} dispatchCreator={getWishlist} starColorToUse={starColorToUse} />
}
