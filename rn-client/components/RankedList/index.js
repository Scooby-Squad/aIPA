import React, { useEffect } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getRankedBeers } from '../../store/beer';
import StarRating from 'react-native-star-rating';

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

export default function List(props) {
  const ranked = useSelector(state => state.beer.ranked);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = () => dispatch(getRankedBeers());
    fetchData();
  }, []);

  let rendered = (
    <View style={styles.container}>
      <View>
        {ranked
          .sort(
            (a, b) =>
              (a.rating < b.rating
                ? 1
                : a.rating === b.rating ? (a.name > b.name ? 1 : -1) : -1)
          )
          .map(beer => {
            return (
              <View style={styles.item} key={beer.id}>
                <Button
                  title={`${beer.name}`}
                  onPress={() =>
                    props.navigation.navigate('SingleBeer', { beer })
                  }
                />
                <StarRating
                  iconSet="Ionicons"
                  emptyStar="ios-star-outline"
                  fullStar="ios-star"
                  stlye={styles.rating}
                  disabled={true}
                  rating={Number(beer.rating)}
                  maxStars={5}
                  starSize={15}
                  fullStarColor="blue"
                />
              </View>
            );
          })}
      </View>
    </View>
  );
  let loading = <Text> Loading </Text>;

  return ranked ? rendered : loading;
}
