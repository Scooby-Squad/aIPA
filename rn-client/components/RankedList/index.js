import React from 'react';
import { getRankedBeers } from '../../store/beer';
import List from '../List'

export default function RankedList(props) {
  const rankedState = state => state.beer.ranked;
  const ratingToUse = 'rating';
  const listToUse = 'ranked';
  const starColorToUse = 'blue';
  const sort = (a, b) =>
    (a.rating < b.rating
      ? 1
      : a.rating === b.rating ? (a.name > b.name ? 1 : -1) : -1)

  return <List {...props} listToUse={listToUse} ratingToUse={ratingToUse} selectorCB={rankedState} sortCB={sort} dispatchCreator={getRankedBeers} starColorToUse={starColorToUse} />
}
