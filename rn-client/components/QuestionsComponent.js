import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Modal } from "react-native";
import SingleQuestion from "./SingleQuestion";
import RatingInput from "./RatingInput";
import beerQuizData from "../store/beerQuizData";
import { useSelector, useDispatch } from "react-redux";
import { updateUserBeer } from "../store/beer";

const beerData = { questions: beerQuizData };

const QuestionsComponent = props => {
  // quiz data to loop through and use for info
  const [quizData, setQuizData] = useState([]);
  // pointer to traverse the quiz data
  const [currIdx, setCurrIdx] = useState(0);
  // used for UX purposes to display rating to user
  const [enteredRating, setRating] = useState(0);
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
        returnHome(copyQuizData);
      } else {
        setCurrIdx(nextIdx);
        setRating(0);
      }
    }, 250);
  };

  useEffect(() => {
    const fetchData = () => {
      try {
        const data = beerData;
        if (data && data.questions) {
          setQuizData(data.questions);
        }
      } catch (error) {
        console.error("error: ", error);
      }
    };
    fetchData();
  }, []);

  if (quizData.length === 0) return <Text>Loading...</Text>;
  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.container}>
        <View style={styles.container}>
          <SingleQuestion quizData={quizData} currIdx={currIdx} />
          <RatingInput
            rating={enteredRating}
            addRatingHandler={addRatingHandler}
            returnHome={returnHome}
            currentQuestion={currIdx}
            totalQuestions={quizData.length}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  contentContainer: {
    paddingTop: 30
  }
});

export default QuestionsComponent;
