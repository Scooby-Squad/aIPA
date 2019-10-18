import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

const SingleQuestion = props => {
  const {quizData, currIdx} = props
  return (
    <View style={styles.contentContainer}>
      <View style={styles.question}>
        <Text style={styles.name}>{quizData[currIdx].name}</Text>
        <Text style={styles.brew}>Brewed By {quizData[currIdx].brewer}</Text>
        <Text style={styles.brew}>{quizData[currIdx].style}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 30,
    justifyContent: 'center'
  },
  question: {
    paddingTop: 50
  },
  name: {
    padding: 10,
    fontSize: 26,
    fontWeight: 'bold',
  },
  brew: {
    padding: 10,
    fontSize: 22,
    fontStyle: "italic"
  },
  questionText: {
    fontSize: 22,
    padding: 10,
    textAlign: 'center'
  }
})

export default SingleQuestion
