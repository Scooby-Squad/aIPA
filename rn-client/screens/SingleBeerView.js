import React from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import StarRating from 'react-native-star-rating';


const SingleBeerView = props => {
  const beer = props.navigation.getParam('beer')
  return (
    <View style={styles.container}>
      <View style={styles.nameRating}>
        <Text style={styles.text}>Beer Name Here: {beer.name}</Text>
        <Text style={styles.text}>{`Beer Rating: ${beer.rating}`}</Text>
        {/* The Rating will probably need to be store in the db so there will be an onPress
      To dispatch a thunk to change the shown stars */}
        <StarRating disabled={false} maxStars={5} />
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
