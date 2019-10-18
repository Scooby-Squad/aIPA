import React from 'react'
import {ScrollView, View, StyleSheet, Button} from 'react-native'
import StarRating from 'react-native-star-rating'
import Constants from 'expo-constants'
import LoadingBar from './LoadingBar'

const RatingInput = props => {
  const {addRatingHandler, returnHome, currentQuestion, totalQuestions} = props
  return (
    <ScrollView
      keyboardShouldPersistTaps="always"
      contentContainerStyle={styles.container}
    >
      <StarRating
        disabled={false}
        maxStars={5}
        fullStarColor="brown"
        rating={props.rating}
        selectedStar={(rating) => addRatingHandler(rating, false)}
      />
      <View style={styles.buttons}>
        <View style={styles.button}>
          <Button title="Skip" onPress={() => addRatingHandler(undefined, true)} />
        </View>
        <View style={styles.button}>
          <Button title="Quit" color="red" onPress={returnHome} />
        </View>
      </View>
      <LoadingBar currentQuestion={currentQuestion} totalQuestions={totalQuestions} />
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
    // backgroundColor: '#ecf0f1',
    padding: 8,
  }
})

export default RatingInput
