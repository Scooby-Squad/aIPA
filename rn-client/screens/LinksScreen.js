import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import RankedList from "../components/RankedList";
import Parent from "../components/Parent";
import WishList from "../components/WishList";
import PredictionList from "../components/RecommendedList";
import { View, Button } from "react-native";
import { useState, useEffect } from "react";

export default function LinksScreen(props) {
  const [button, setButton] = useState("rankedlist");
  // CLICK HANDLERS
  const wishHandler = async () => {
    const setter = async () => {
      await setButton("wishlist");
    };
    await setter();
  };
  const rankedHandler = async () => {
    const setter = async () => {
      await setButton("rankedlist");
    };
    await setter();
  };
  const predictionHandler = async () => {
    const setter = async () => {
      await setButton("predictionlist");
    };
    await setter();
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <Button onPress={() => rankedHandler()} title={"Ranked"} />
        <Button onPress={() => wishHandler()} title={"Wish List"} />
        <Button onPress={() => predictionHandler()} title={"Predictions"} />
      </View>
      {button == "rankedlist" ? (
        <RankedList navigation={props.navigation} />
      ) : button == "wishlist" ? (
        <WishList navigation={props.navigation} />
      ) : button == "predictionlist" ? (
        <PredictionList navigation={props.navigation} />
      ) : (
        <RankedList navigation={props.navigation} />
      )}
    </ScrollView>
  );
}

LinksScreen.navigationOptions = {
  title: "Beer Rankings"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  }
});
