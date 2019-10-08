import React from 'react'
import {FlatList, View, ScrollView, Text, StyleSheet} from 'react-native'

const RatingsList = props => {
  const {quizData} = props
  return (
    <View style={styles.contentContainer}>
      <FlatList
        keyExtractor={(item, index) => item.id}
        data={quizData}
        renderItem={({item}) => {
          return (
            <ScrollView style={styles.contentContainer}>
              <Text>Question: {item.question}</Text>
              <View>
                <Text>
                  Your Rating: {item.rating}
                </Text>
              </View>
            </ScrollView>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 30,
    flex: 1
  },
  correctText: {
    color: 'green'
  },
  incorrectText: {
    color: 'red'
  }
})

export default RatingsList
