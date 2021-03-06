import React, { useState, useEffect, Fragment } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import SingleQuestion from './SingleQuestion';
import RatingInput from './RatingInput';
import beerQuizData from '../store/beerQuizData';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserBeer } from '../store/beer';
import { logOut } from '../store/user';


// would need to facor in user ratings from db if pulling existing ratings
const beerData = { questions: beerQuizData };

const QuestionsComponent = props => {
  // quiz data to loop through and use for info
  const [quizData, setQuizData] = useState([]);
  // pointer to traverse the quiz data
  const [currIdx, setCurrIdx] = useState(0);
  // used for UX purposes to display rating to user
  const [enteredRating, setRating] = useState(0);
  const [quizStarted, setStartQuiz] = useState(false);
  const userId = useSelector(state => state.user.id);
  const dispatch = useDispatch();
  const { returnHome } = props;

  const addRatingHandler = (rating = 0, skipped = false) => {
    if (rating.length === 0) return;
    // doing this for UX, show a rating and then move to the next item
    setRating(rating);
    setTimeout(() => {
      const copyQuizData = quizData.map((question, index) => {
        if (index === currIdx) {
          return { ...question, rating, skipped, userId };
        } else {
          return { ...question };
        }
      });
      setQuizData(copyQuizData);
      dispatch(updateUserBeer(copyQuizData[currIdx]));
      const nextIdx = currIdx + 1;
      if (nextIdx === quizData.length) {
        setStartQuiz(false);
        returnHome(copyQuizData);
      } else {
        setCurrIdx(nextIdx);
        setRating(parseInt(quizData[currIdx].rating, 10));
      }
    }, 250);
  };

  useEffect(() => {
    const fetchData = () => {
      try {
        const data = beerData;
        if (data && data.questions) {
          setQuizData(data.questions);
          // this line is really just if we can work in prior ratings to retaking test
          setRating(parseInt(data.questions[currIdx].rating, 10));
        }
      } catch (error) {
        console.error('error: ', error);
      }
    };
    fetchData();
  }, []);

  if (quizData.length === 0) return <Text>Loading...</Text>;
  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.container}>
        {!quizStarted ? (
          <Fragment>
            <ImageBackground
              source={
                __DEV__
                  ? require('../assets/images/single-beer.png')
                  : require('../assets/images/single-beer.png')
              }
              style={{
                width: '110%',
                height: '110%',
                bottom: 0,
                position: 'absolute',
                opacity: 0.6,
              }}
            />
            <View style={styles.questionsSplash}>
              <TouchableOpacity onPress={() => setStartQuiz(true)}>
                <View style={styles.splashContainer}>
                  <Text style={styles.splashHeader}>Welcome to aIPA!</Text>
                </View>
                <View style={styles.textContainer}>
                  <Text />
                  <Text />
                  <Text style={styles.splashText}>
                    To help us recommend beer, rate as many of the following
                    beer as you can. The more you rate and the more aggressively
                    you rate them, the better our neural network learns your
                    preferences.
                  </Text>
                  <Text style={styles.splashText} />
                  <Text style={styles.splashText}>Press here to continue</Text>
                </View>
                <View style={styles.splashContainer}>
                  <Text />
                  <Text />
                  <Text style={styles.splashFooter}>
                    {/* Press here to continue */}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => dispatch(logOut())}>
                <View style={styles.splashContainer}>
                  <Text style={styles.splashFooter}>Re-login</Text>
                </View>
              </TouchableOpacity>
            </View>
          </Fragment>
        ) : (
          <View style={styles.container}>
            <ImageBackground
              source={
                __DEV__
                  ? require("../assets/images/quiz-beer.jpg")
                  : require("../assets/images/quiz-beer.jpg")
              }
              style={{
                width: "100%",
                height: "100%",
                bottom: 0,
                position: "absolute",
                opacity: 0.6
              }}
              />
            <SingleQuestion quizData={quizData} currIdx={currIdx} />
            <RatingInput
              rating={enteredRating}
              addRatingHandler={addRatingHandler}
              returnHome={returnHome}
              currentQuestion={currIdx}
              totalQuestions={quizData.length}
            />
          </View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  questionsSplash: {
    // flex: 1,
    height: '100%',
    paddingTop: 20,
    margin: 15,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    height: '40%',
  },
  splashContainer: {
    height: '20%',
    flexWrap: 'wrap',
  },
  splashHeader: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 40,
  },
  splashText: {
    // height: '30%',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 25,
  },
  splashFooter: {
    height: '100%',
    textAlign: 'center',
    fontSize: 20,
  },
  splashContinue: {
    height: '100%',
    fontSize: 20,
    textAlign: 'center',
    bottom: 25,
    position: 'absolute',
  },
});

export default QuestionsComponent;
