import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import {logOut} from '../store/user'
import { useDispatch } from 'react-redux';

const RealSettings = props => {
    const dispatch = useDispatch();
    const dispatchLogOut = () => {
        dispatch(logOut());
        props.navigation.navigate('Home')
    }

  return (
    <View style={styles.container}>
      <Touchable
        style={styles.option}
        background={Touchable.Ripple('#ccc', false)}
        onPress={dispatchLogOut}
      >
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionText}>Log Out</Text>
          </View>
        </View>
      </Touchable>
      <Touchable
        style={styles.option}
        background={Touchable.Ripple('#ccc', false)}
        onPress={dispatchLogOut}
      >
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionText}>Retake Quiz</Text>
          </View>
        </View>
      </Touchable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 19,
  },
  nameRating: {
    justifyContent: 'space-around',
  },
});

export default RealSettings;
