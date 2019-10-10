import React, { useEffect } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
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
  const dispatch = useDispatch();
  const {sortCB, dispatchCreator, selectorCB} = props


  useEffect(() => {
    const fetchData = () => dispatch(dispatchCreator());
    fetchData();
  }, []);

  const beers = useSelector(selectorCB)
  let rendered =
    (
    <View style={styles.container}>
      <View>
        {beers
          .sort(sortCB)
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
    </View>)

  let loading = <Text> Loading </Text>;

  return beers ? rendered : loading;
}
