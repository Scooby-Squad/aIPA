import React from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import StarRating from 'react-native-star-rating';


const SingleBeerView = props => {
  const beer = props.navigation.getParam('beer')
  return (
    <View style={styles.container}>
      <View style={styles.nameRating}>
        <Text style={styles.text}>Beer Name Here: {beer.name}</Text>
        <StarRating disabled={false} rating={beer.rating} maxStars={5} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 19,
  },
  nameRating: {
    justifyContent: 'space-around'
  }
});

export default SingleBeerView;
