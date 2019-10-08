import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch } from "react-redux";
import StarRating from 'react-native-star-rating';
import {updateUserBeer} from '../store/beer'




export default function Single (props) {

  const [data, setData] = useState(props.navigation.getParam('beer'))
  const dispatch = useDispatch();

  useEffect(() => {
        const fetchData = async () => (
          await dispatch(updateUserBeer(data.beer))
        )
        fetchData();
    }, [data.beer]);
  
  onStarRatingPress = (rating) => {
      let newBeer = data
      newBeer.rating = rating
      setData(newBeer)
      console.log(newBeer)
  }
  return (
    <View style={styles.container}>
      <View style={styles.nameRating}>
        <Text style={styles.text}>Name: {data.name}</Text>
        <StarRating 
          disabled={false} 
          rating={Number(data.rating)} 
          maxStars={5} 
          selectedStar={(rating) => this.onStarRatingPress(rating)}
          fullStarColor={'blue'}
            />
      </View>
    </View>
  )
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


