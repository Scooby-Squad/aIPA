import React from "react";
import { View, Button } from "react-native";
import { useState, useEffect } from "react";

const Parent = props => {
  const [button, setButton] = useState("ranked");
  // CLICK HANDLERS
  const wishHandler = async () => {
    const setter = async () => {
      await setButton("wishlist");
    };
    await setter();
  };
  const rankedHandler = () => {
    console.log("Ranked List");
  };
  const predictionHandler = () => {
    console.log("Prediction List");
  };
  return (
    <View>
      <Button onPress={() => rankedHandler()} title={"Ranked"} />
      <Button onPress={() => wishHandler()} title={"Wish List"} />
      <Button onPress={() => predictionHandler()} title={"Predictions"} />
    </View>
  );
};
export default Parent;
