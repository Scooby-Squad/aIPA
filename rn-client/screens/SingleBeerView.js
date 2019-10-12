import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import StarRating from 'react-native-star-rating';
import { updateUserBeer, getRankedBeers, removeFromWishlistThunk } from '../store/beer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 25
  },
  text: {
    fontSize: 19
  },
  textLarge: {
    fontSize: 29
  },
  nameRating: {
    justifyContent: 'space-around'
  }
});

// eslint-disable-next-line complexity
export default function Single(props) {
  const [data, setData] = useState(props.navigation.getParam('item'));
  const dispatch = useDispatch();
  const removeFromWishlist = async () => { await dispatch(removeFromWishlistThunk(data.id)); }

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

  // useEffect(
  //   () => {
  //     const dispatchers = async () => {

  //       await dispatch(updateUserBeer(data));
  //       await dispatch(getRankedBeers());
  //     };
  //     dispatchers();
  //   },
  //   [data.rating]
  // );

  const onStarRatingPress = async rating => {
    await setData({ ...data, rating });
  };

  const onButtonRemoveWishlistPress = async async => {
    await setData({ ...data, rating: null });
  };

  let wishlistStatus = 'none';
  if(data.rating==='0') { wishlistStatus = 'wishlist' }
  else  if(data.rating>0) { wishlistStatus = 'ranked' }

  console.log('single beer view data is', data);
  return (
    <View style={styles.container}>
      <View style={styles.nameRating}>
        <Text style={styles.textLarge}>{data.name}</Text>
        {
          wishlistStatus==='none' ? <><StarRating
              disabled={false}
              iconSet="Ionicons"
              emptyStar="ios-star-outline"
              fullStar="ios-star"
              rating={Number(data.rating)}
              maxStars={5}
              selectedStar={rating => onStarRatingPress(rating)}
              fullStarColor="blue"
            /><Button title="Add to Wishlist" onPress={() => { onStarRatingPress(0); window.alert('added') }} /><Text style={styles.text}>Predicted Score: 100</Text></> : <Text />
        }
        {
          wishlistStatus==='wishlist' ? <><StarRating
              disabled={false}
              iconSet="Ionicons"
              emptyStar="ios-star-outline"
              fullStar="ios-star"
              rating={Number(data.rating)}
              maxStars={5}
              selectedStar={rating => onStarRatingPress(rating)}
              fullStarColor="blue"
            /><Button title="Remove from Wishlist" onPress={() => { removeFromWishlist() }} /><Text style={styles.text}>Predicted Score: 100</Text></> : <Text />
        }
        {
          wishlistStatus==='ranked' ? <StarRating
              disabled={false}
              iconSet="Ionicons"
              emptyStar="ios-star-outline"
              fullStar="ios-star"
              rating={Number(data.rating)}
              maxStars={5}
              selectedStar={rating => onStarRatingPress(rating)}
              fullStarColor="blue"
            /> : <Text />
        }
        {/* <StarRating
          disabled={false}
          iconSet="Ionicons"
          emptyStar="ios-star-outline"
          fullStar="ios-star"
          rating={Number(data.rating)}
          maxStars={5}
          selectedStar={rating => onStarRatingPress(rating)}
          fullStarColor="blue"
        /> */}
        {data.brewer ? (
          <Text style={styles.text}>Brewed by {data.brewer}</Text>
        ) : (
          <Text />
        )}
        {data.type ? (
          <Text style={styles.text}>Type: {data.type}</Text>
        ) : (
          <Text />
        )}
        {data.abv ? <Text style={styles.text}>ABV: {Math.round(data.abv * 10) / 10}</Text> : <Text />}
        {data.ibu > 0 ? (
          <Text style={styles.text}>IBU: {data.ibu}</Text>
        ) : (
          <Text />
        )}
        {data.srm > 0 ? (
          <Text style={styles.text}>SRM: {data.srm}</Text>
        ) : (
          <Text />
        )}
        {data.description ? (
          <Text style={styles.text}>{data.description}</Text>
        ) : (
          <Text />
        )}
        {data.website ? (
          <Text style={styles.text}>{data.website}</Text>
        ) : (
          <Text />
        )}
        <Text />
        {data.address ? (
          <Text style={styles.text}>{data.address}</Text>
        ) : (
          <Text />
        )}
        <Text style={styles.text}>
          {data.city ? `${data.city}, ` : ''}
          {data.state ? `${data.state}, ` : ''}
          {data.country ? `${data.country}` : ''}
        </Text>
        {data.coordinates ? (
          <Text style={styles.text}>Coordinates: {data.coordinates}</Text>
        ) : (
          <Text />
        )}
      </View>
      {!data.rating ? <Button title="Add to wishlist" /> : <Text />}
    </View>
  );
}
