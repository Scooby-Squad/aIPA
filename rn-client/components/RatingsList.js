import React from 'react'
import {FlatList, View, ScrollView, Text, StyleSheet} from 'react-native'

const RatingsList = props => {
  const {quizData} = props
  return (
    <ScrollView style={styles.contentContainer}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={quizData}
        renderItem={({item}) => {
          return (
            <View style={styles.contentContainer}>
              <Text>Beer: {item.name}</Text>
              <View>
                <Text>
                  Your Rating: {item.rating == 0 ? 'Skipped' : item.rating}
                </Text>
              </View>
            </View>
          )
        }}
      />
    </ScrollView>
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
