import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SingleQuestion = props => {
  const { quizData, currIdx } = props;
  return (
    <View style={styles.contentContainer}>
      <View>
        <Text style={styles.categoryText}>Beer</Text>
      </View>
      <View>
        <Text style={styles.questionText}>{quizData[currIdx].question}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 30,
    justifyContent: 'center'
  },
  categoryText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  questionText: {
    fontSize: 22,
    padding: 15,
    textAlign: 'center'
  }
});

export default SingleQuestion;
