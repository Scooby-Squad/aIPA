import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, ImageBackground } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { signIn, logOut } from '../store/user';
import { getPredictions, getRankedBeers } from '../store/beer';
import Touchable from 'react-native-platform-touchable';
import QuestionsComponent from '../components/QuestionsComponent';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
    // <View>
      <ImageBackground
            source={
              __DEV__
                ? require('../assets/images/aipa-matrix.jpg')
                : require('../assets/images/aipa-matrix.jpg')
            }
            style={{width: '100%', height: '100%', position: 'absolute', bottom: 0}}
            // style={{width: '100%', height: '100%', justifyContent: 'left', position: 'absolute', bottom: 0}}
          >
            <View style={styles.headerbottom}>
              <Button title="Sign in with Google" onPress={props.signIn} style={styles.headerbottom} />
            </View>

      </ImageBackground>
    // </View>
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
    props.navigation.navigate('Wish')
  }

  if (!props.ranked.length) return (
    <QuestionsComponent
      visible={props.isQuizzing}
      returnHome={props.returnHomeHandler}
      // onCancel={cancelQuizHandler}
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
{/* dh
      <ImageBackground
              source={
                __DEV__
                  ? require('../assets/images/aipa-matrix-top.jpg')
                  : require('../assets/images/aipa-matrix-top.jpg')
              }
              style={{width: '100%', height: '100%', position: 'absolute', bottom: 0}}
            >
      
        <View style={styles.buttonBox}>
          <Touchable
            style={styles.option}
            background={Touchable.Ripple('#ccc', false)}
            onPress={_handlePressQuiz}
          >
            <Image source={
                __DEV__
                  ? require('../assets/images/suggest.png')
                  : require('../assets/images/suggest.png')
              }
              style={{width: '100%', resizeMode: 'contain'}}
            />
          </Touchable>
          <Touchable
            style={styles.option}
            background={Touchable.Ripple('#ccc', false)}
            onPress={_handlePressQuiz}
          >
            <Image source={
                __DEV__
                  ? require('../assets/images/suggest.png')
                  : require('../assets/images/suggest.png')
              }
              style={{width: '100%', resizeMode: 'contain'}}
            />
          </Touchable>
          <Touchable
            style={styles.option}
            background={Touchable.Ripple('#ccc', false)}
            onPress={_handlePressQuiz}
          >
            <Image source={
                __DEV__
                  ? require('../assets/images/suggest.png')
                  : require('../assets/images/suggest.png')
              }
              style={{width: '100%', resizeMode: 'contain'}}
            />
          </Touchable>
          <Touchable
            style={styles.option}
            background={Touchable.Ripple('#ccc', false)}
            onPress={_handlePressQuiz}
          >
            <Image source={
                __DEV__
                  ? require('../assets/images/suggest.png')
                  : require('../assets/images/suggest.png')
              }
              style={{width: '100%', resizeMode: 'contain'}}
            />
          </Touchable>
          

        </View>
      </ImageBackground>
    */}
    </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#FFF',
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
  // image: {
  //   marginTop: 0,
  //   width: 150,
  //   height: 150,
  //   borderColor: 'rgba(0,0,0,0.2)',
  //   borderWidth: 3,
  //   borderRadius: 150
  // },
  // optionsTitleText: {
  //   fontSize: 16,
  //   marginLeft: 15,
  //   marginTop: 9,
  //   marginBottom: 12
  // },
  // optionIconContainer: {
  //   marginRight: 9
  // },
  option: {
    // backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    paddingVertical: 0,
    marginBottom: 0,
    marginEnd: 0,
    marginVertical: 0,
    height: '20%',
    flex: 4,
    justifyContent: 'flex-end',
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderBottomColor: '#EDEDED'
    // backgroundColor: '#EEEEEE'
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

export default HomeScreen;
