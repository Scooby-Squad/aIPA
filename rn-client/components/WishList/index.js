import React from "react";
import { getWishlist } from "../../store/beer";
import List from "../List";

export default function WishList(props) {
  const rankedState = state => state.beer.wishlist;
  const ratingToUse = 'rating';
  const listToUse = "wishlist";
  const sort = (a, b) =>
    a.rating < b.rating
      ? 1
      : a.rating === b.rating ? (a.name > b.name ? 1 : -1) : -1;

  return (
    <List
      {...props}
      listToUse={listToUse}
      ratingToUse={ratingToUse}
      selectorCB={rankedState}
      sortCB={sort}
      dispatchCreator={getWishlist}
    />
  );
}
