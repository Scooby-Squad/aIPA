import React from 'react';
import { StyleSheet, Text, View, Image, Button, ImageBackground } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { signIn, logOut } from '../store/user';
import { getPredictions } from '../store/beer';
import Touchable from 'react-native-platform-touchable';

const HomeScreen = props => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const dispatchSignIn = () => dispatch(signIn());
  const dispatchLogOut = () => dispatch(logOut());
  const dispatchGetPredictions = () => dispatch(getPredictions());

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
  return (
    <View style={styles.container}>
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
          {/* <Touchable
            style={styles.option}
            background={Touchable.Ripple('#ccc', false)}
            onPress={_handlePressRecs}
          >
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.optionTextContainer}>
                <Text style={styles.optionText}>Get Predictions</Text>
              </View>
            </View>
          </Touchable>
          <Touchable
            style={styles.option}
            background={Touchable.Ripple('#ccc', false)}
            onPress={() => {props.navigation.navigate('Graphs')}}
          >
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.optionTextContainer}>
                <Text style={styles.optionText}>View Graphs</Text>
              </View>
            </View>
          </Touchable>
          <Touchable
            style={styles.option}
            background={Touchable.Ripple('#ccc', false)}
            onPress={props.logOut}
          >
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.optionTextContainer}>
                <Text style={styles.optionText}>Log Out</Text>
              </View>
            </View>
          </Touchable> */}
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around'
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
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    paddingVertical: 0,
    flex: 4,
    justifyContent: 'flex-end'
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderBottomColor: '#EDEDED'
  },
  optionText: {
    fontSize: 15,
    marginTop: 1
  },
  buttonBox: {
    bottom: 0,
    width: '100%',
    height: '75%',
    position: 'absolute',
    flex: 0,
    justifyContent: 'flex-end'
  }
});

export default HomeScreen;
