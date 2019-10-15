import React, { useRef, useState, useEffect, Fragment } from "react";
import { Text, View, Animated, StyleSheet } from "react-native";
import Constants from "expo-constants";

const LoadingBar = props => {
  const { currentQuestion, totalQuestions } = props;

  let animation = useRef(new Animated.Value(0));

  useEffect(
    () => {
      Animated.timing(animation.current, {
        toValue: currentQuestion,
        duration: totalQuestions
      }).start();
    },
    [currentQuestion]
  );

  const width = animation.current.interpolate({
    inputRange: [0, totalQuestions],
    outputRange: ["0%", "100%"],
    extrapolate: "clamp"
  });

  return (
    <Fragment>
      <Text>{"\n"}</Text>
      <View style={styles.progressBar}>
        <Animated.View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundColor: "blue",
            width
          }}
        />
      </View>
      <Text>{`${Math.round(currentQuestion / totalQuestions * 100)}%`}</Text>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 8
  },
  progressBar: {
    height: 20,
    width: "100%",
    backgroundColor: "white",
    borderColor: "#000",
    borderWidth: 2,
    borderRadius: 5,
    flexDirection: "row"
  }
});

export default LoadingBar;
