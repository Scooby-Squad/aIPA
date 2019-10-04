import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, Modal} from 'react-native'

// import {withApollo} from 'react-apollo'
// import gql from 'graphql-tag'
import RatingsList from './RatingsList'
import SingleQuestion from './SingleQuestion'
import RatingInput from './RatingInput'

const QuestionsComponent = props => {
  // const query = gql`
  //   query {
  //     questions {
  //       id
  //       question
  //       answer
  //       category {
  //         title
  //       }
  //     }
  //   }
  // `
  const [quizData, setQuizData] = useState([])
  const [currIdx, setCurrIdx] = useState(0)
  const [enteredRating, setEnteredRating] = useState('')
  const [isQuizFinished, setQuizFinished] = useState(false)
  const {returnHome} = props

  const ratingInputHandler = enteredText => {
    setEnteredRating(enteredText)
  }

  const addRatingHandler = () => {
    if (enteredRating.length === 0) return
    const copyQuizData = quizData.map((question, index) => {
      if (index === currIdx) {
        let skipped = false
        return {...question, enteredRating, skipped}
      } else return {...question}
    })
    setQuizData(copyQuizData)
    setEnteredRating('')
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
        const data = [{}]
        // const {data} = await props.client.query({
        //   query,
        //   fetchPolicy: 'no-cache'
        // })
        if (data && data.questions) {
          setQuizData(data.questions)
          // data.questions.forEach(question => {
          //   console.log('question', question.question)
          //   console.log('answer', question.answer)
          // })
          // console.log('questions', data.questions)
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
      {/* <View style={styles.container}>
        {isQuizFinished ? (
          <RatingsList quizData={quizData} />
        ) : (
          <View style={styles.container}>
            <SingleQuestion quizData={quizData} currIdx={currIdx} />
            <RatingInput
              ratingInputHandler={ratingInputHandler}
              enteredRating={enteredRating}
              addRatingHandler={addRatingHandler}
              onCancel={props.onCancel}
            />
          </View>
        )}
      </View> */}
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
