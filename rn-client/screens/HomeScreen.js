import React, { useState } from 'react';
import { StyleSheet, View, Image, Button, ImageBackground } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { signIn, logOut } from '../store/user';
import { getPredictions, getRankedBeers } from '../store/beer';
import Touchable from 'react-native-platform-touchable';
import QuestionsComponent from '../components/QuestionsComponent';


const HomeScreen = props => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const dispatchSignIn = () => dispatch(signIn());
  const dispatchLogOut = () => dispatch(logOut());
  const dispatchGetPredictions = () => dispatch(getPredictions());

  const ranked = useSelector(state => state.beer.ranked);
  const [isQuizzing, setIsQuizzing] = useState(true)
  const dispatchGetRankedBeers = () => dispatch(getRankedBeers());
  const returnHomeHandler = () => {
    setIsQuizzing(false)
    dispatchGetRankedBeers()
    props.navigation.navigate('Recs')
  }

  return (
    <View style={styles.container}>
      {user.signedIn ? (
        <LoggedInPage
          {...user}
          {...props}
          name={user.name}
          photoUrl={user.photoUrl}
          logOut={dispatchLogOut}
          getPredictions={dispatchGetPredictions}
          ranked={ranked}
          isQuizzing={isQuizzing}
          returnHomeHandler={returnHomeHandler}
        />
      ) : (
        <LoginPage signIn={dispatchSignIn} />
      )}
    </View>
  );
};

const LoginPage = props => {
  return (
      <ImageBackground
        source={
          __DEV__
            ? require('../assets/images/aipa-matrix.jpg')
            : require('../assets/images/aipa-matrix.jpg')
        }
        style={{width: '100%', height: '100%', position: 'absolute', bottom: 0}}
      >
      <View style={styles.headerbottom}>
        <Button title="Sign in with Google" onPress={props.signIn} style={styles.headerbottom} />
      </View>

      </ImageBackground>
  );
};

const LoggedInPage = props => {
  const _handlePressQuiz = () => {
    props.navigation.navigate('Quiz');
  };
  const _handlePressRecs = () => {
    props.navigation.navigate('Recs')
  }
  const _handlePressWish = () => {
    navName = 'Wish List'
    props.navigation.navigate('Wish')
  }

  if (!props.ranked.length) return (
    <QuestionsComponent
      visible={props.isQuizzing}
      returnHome={props.returnHomeHandler}
    />
  )

  return (
    <View style={styles.container}>
      <ImageBackground
              source={
                __DEV__
                  ? require('../assets/images/aipa-home.jpg')
                  : require('../assets/images/aipa-home.jpg')
              }
              style={{width: '100%', height: '100%', position: 'absolute', bottom: 0}}
            >
        <View style={styles.buttonBox}>


      <Touchable
        style={styles.option}
        onPress={_handlePressRecs}
      >
        <Image source={
                __DEV__
                  ? require('../assets/images/suggest.png')
                  : require('../assets/images/suggest.png')
              }
              style={{width: '100%', resizeMode: 'contain', height: '100%'}}
            />
      </Touchable>
      <Touchable
        style={styles.option}
        onPress={() => {props.navigation.navigate('Graphs')}}
      >
        <Image source={
                __DEV__
                  ? require('../assets/images/visualize.png')
                  : require('../assets/images/visualize.png')
              }
              style={{width: '100%', resizeMode: 'contain', height: '100%'}}
            />
      </Touchable>
      <Touchable
        style={styles.option}
        onPress={_handlePressWish}
      >
        <Image source={
                __DEV__
                  ? require('../assets/images/wishlist.png')
                  : require('../assets/images/wishlist.png')
              }
              style={{width: '100%', resizeMode: 'contain', height: '100%'}}
            />
      </Touchable>
      <Touchable
        style={{...styles.option}}
        onPress={() => props.navigation.navigate('RealSettings')}
      >
        <Image source={
                __DEV__
                  ? require('../assets/images/settings.png')
                  : require('../assets/images/settings.png')
              }
              style={{width: '100%', resizeMode: 'contain', height: '100%'}}
            />
      </Touchable>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingVertical: 0,
    marginBottom: 0,
    marginEnd: 0,
    marginVertical: 0,
    height: '100%'
  },
  header: {
    fontSize: 25
  },
  headerbottom: {
    fontSize: 35,
    bottom: 25,
    width: '100%',
    position: 'absolute',
    alignContent: 'center'
  },
  option: {
    paddingHorizontal: 15,
    paddingVertical: 0,
    marginBottom: 0,
    marginEnd: 0,
    marginVertical: 0,
    height: '20%',
    flex: 4,
    justifyContent: 'flex-end',
  },
  optionText: {
    fontSize: 15,
    marginTop: 1
  },
  buttonBox: {
    bottom: 0,
    width: '100%',
    height: '80%',
    position: 'absolute',
    flex: 0,
    justifyContent: 'flex-end',
    paddingVertical: 0,
    marginBottom: 5,
    marginEnd: 0,
    marginVertical: 0
  }
});

HomeScreen.navigationOptions = {
  title: 'Home'
};

export default HomeScreen;
