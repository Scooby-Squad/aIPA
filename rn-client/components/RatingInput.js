import React, {useRef, useState, useEffect} from 'react'
import {ScrollView, View, StyleSheet, Button, Text, Animated} from 'react-native'
import StarRating from 'react-native-star-rating'
import Constants from 'expo-constants'
import LoadingBar from './LoadingBar'

const RatingInput = props => {
  const {addRatingHandler} = props
  return (
    <ScrollView
      keyboardShouldPersistTaps="always"
      contentContainerStyle={styles.container}
    >
      <StarRating
        disabled={false}
        maxStars={5}
        fullStarColor="blue"
        rating={props.rating}
        selectedStar={(rating) => addRatingHandler(rating, false)}
      />
      <View style={styles.buttons}>
        <View style={styles.button}>
          <Button title="Skip" onPress={() => addRatingHandler(undefined, true)} />
        </View>
        <View style={styles.button}>
          <Button title="Quit" color="red" onPress={props.returnHomeHandler} />
        </View>
      </View>
      <LoadingBar currentQuestion={props.currentQuestion} totalQuestions={props.totalQuestions} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    width: '80%',
    marginBottom: 10
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%'
  },
  button: {
    width: '40%'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  // progressBar: {
  //   height: 20,
  //   width: '100%',
  //   backgroundColor: 'white',
  //   borderColor: '#000',
  //   borderWidth: 2,
  //   borderRadius: 5,
  //   flexDirection: 'row'
  // },
  // animatedView: {
  //   position: 'absolute',
  //   left: 0,
  //   right: 0,
  //   top: 0,
  //   bottom: 0,
  //   backgroundColor: '#8BED4F',
  //   width: '50%'
  // }
})

export default RatingInput
