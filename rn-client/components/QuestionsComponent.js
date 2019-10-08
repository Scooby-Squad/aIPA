import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, Modal} from 'react-native'
import RatingsList from './RatingsList'
import SingleQuestion from './SingleQuestion'
import RatingInput from './RatingInput'

const tempData = { questions: [{
  question: 'Beer 1',
},
{
  question: 'The 2nd Beer'
}]}

const QuestionsComponent = props => {
  const [quizData, setQuizData] = useState([])
  const [currIdx, setCurrIdx] = useState(0)
  const [enteredRating, setEnteredRating] = useState(0)
  const [isQuizFinished, setQuizFinished] = useState(false)
  const {returnHome} = props

  const addRatingHandler = (rating, skipped = false) => {
    if (rating.length === 0) return
    setEnteredRating(rating)
    const copyQuizData = quizData.map((question, index) => {
      if (index === currIdx) {
        return {...question, rating, skipped}
      } else return {...question}
    })
    setQuizData(copyQuizData)
    setEnteredRating(0)
    const nextIdx = currIdx + 1
    if (nextIdx === quizData.length) {
      setQuizFinished(true)
      returnHome(copyQuizData)
    } else {
      setCurrIdx(nextIdx)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = tempData
        if (data && data.questions) {
          setQuizData(data.questions)
        }
      } catch (error) {
        console.error('error: ', error)
      }
    }
    fetchData()
  }, [])

  if (quizData.length === 0) return <Text>Loading...</Text>
  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.container}>
        {isQuizFinished ? (
          <RatingsList quizData={quizData} />
        ) : (
          <View style={styles.container}>
            <Text>{currIdx + 1}/{quizData.length}</Text>
            <SingleQuestion quizData={quizData} currIdx={currIdx} />
            <RatingInput
              enteredRating={enteredRating}
              addRatingHandler={addRatingHandler}
              onCancel={props.onCancel}
            />
          </View>
        )}
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  contentContainer: {
    paddingTop: 30
  }
})

export default QuestionsComponent
