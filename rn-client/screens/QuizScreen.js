import * as WebBrowser from 'expo-web-browser'
import React, {useState} from 'react'
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button
} from 'react-native'

import {MonoText} from '../components/StyledText'
import QuestionsComponent from '../components/QuestionsComponent'
import RatingsList from '../components/RatingsList'

export default function QuizScreen(props) {
  const [isQuizzing, setIsQuizzing] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [ratingData, setRatingData] = useState([])

  const startQuizHandler = () => {
    setIsQuizzing(true)
    setQuizCompleted(false)
  }

  const returnHomeHandler = answers => {
    setRatingData(answers)
    setIsQuizzing(false)
    setQuizCompleted(true)
  }

  const cancelQuizHandler = () => {
    setIsQuizzing(false)
  }

  return (
    <View style={styles.container}>
      <Text>A quiZ!</Text>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="always"
      >
        <View style={styles.welcomeContainer}>
          <Image
            source={
              __DEV__
                ? require('../assets/images/robot-dev.png')
                : require('../assets/images/robot-prod.png')
            }
            style={styles.welcomeImage}
          />
        </View>

        <View style={styles.getStartedContainer}>
          <Button title="Take Quiz" onPress={startQuizHandler} />
          {isQuizzing ? (
            <QuestionsComponent
              visible={isQuizzing}
              returnHome={returnHomeHandler}
              onCancel={cancelQuizHandler}
            />
          ) : (
            <View />
          )}
          {!isQuizzing && quizCompleted ? (
            <RatingsList quizData={ratingData} />
          ) : (
            <View />
          )}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center'
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)'
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center'
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {width: 0, height: -3},
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center'
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center'
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7'
  }
})
