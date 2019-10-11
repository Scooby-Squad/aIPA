import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import StarRating from 'react-native-star-rating';
import { updateUserBeer, getRankedBeers } from '../store/beer';

export default function Single(props) {
  const [data, setData] = useState(props.navigation.getParam('beer'));
  const dispatch = useDispatch();

  useEffect(
    () => {
      const dispatchers = async () => {
        await dispatch(updateUserBeer(data));
        await dispatch(getRankedBeers());
      };
      dispatchers();
    },
    [data]
  );

  const onStarRatingPress = async rating => {
    await setData({ ...data, rating });
  };

  return (
    <View style={styles.container}>
      <View style={styles.nameRating}>
        <Text style={styles.text}>Name: {data.name}</Text>
        <StarRating
          disabled={false}
          iconSet="Ionicons"
          emptyStar="ios-star-outline"
          fullStar="ios-star"
          rating={Number(data.rating)}
          maxStars={5}
          selectedStar={rating => onStarRatingPress(rating)}
          fullStarColor="blue"
        />
      </View>
      {!data.rating ? (<Button title="Add to wishlist" />) : <Text></Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 19
  },
  nameRating: {
    justifyContent: 'space-around'
  }
});
