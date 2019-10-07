import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, Modal} from 'react-native'

// import {withApollo} from 'react-apollo'
// import gql from 'graphql-tag'
import RatingsList from './RatingsList'
import SingleQuestion from './SingleQuestion'
import RatingInput from './RatingInput'

const tempData = { questions: [{
  question: 'Beer 1',
},
{
  question: 'Beer 2'
}]}

const QuestionsComponent = props => { // remove commented/unused code
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

  // if you're keeping hooks in here, EVERYONE should feel comfortable talking & teaching me about this
  const [quizData, setQuizData] = useState([])
  const [currIdx, setCurrIdx] = useState(0)
  const [enteredRating, setEnteredRating] = useState(0)
  const [isQuizFinished, setQuizFinished] = useState(false)
  const {returnHome} = props

  const ratingInputHandler = enteredText => {
    setEnteredRating(enteredText)
  }

  // look into possibly refactoring this. this feels like a lot of extra functionality is going on in here that could be modularized
  const addRatingHandler = (rating) => {
    if (rating.length === 0) return
    setEnteredRating(rating)
    const copyQuizData = quizData.map((question, index) => {
      if (index === currIdx) {
        let skipped = false
        return {...question, rating, skipped}
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
        const data = tempData
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
      <View style={styles.container}>
        {isQuizFinished ? (
          <RatingsList quizData={quizData} />
        ) : (
          <View style={styles.container}>
            <Text>{currIdx + 1}/{quizData.length}</Text>
            <SingleQuestion quizData={quizData} currIdx={currIdx} />
            <RatingInput
              ratingInputHandler={ratingInputHandler}
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

// good to break styles up separately like this
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
