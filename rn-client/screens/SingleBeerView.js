import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, ImageBackground } from "react-native";
import { useDispatch } from "react-redux";
import StarRating from "react-native-star-rating";
import Hyperlink from "react-native-hyperlink";
import {
  updateUserBeer,
  getRankedBeers,
  addToWishlistThunk,
  removeFromWishlistThunk
} from "../store/beer";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    margin: 25
  },
  text: {
    alignSelf: "center",
    fontSize: 19
  },
  stat: {
    fontSize: 21,
    alignSelf: "auto",
    fontStyle: "italic"
  },
  textLarge: {
    color: "brown",
    fontSize: 29,
    fontWeight: "bold"
  },
  nameRating: {
    alignItems: "center",
    justifyContent: "space-around"
  },
  location: {
    textDecorationLine: "underline",
    alignSelf: "center",
    fontSize: 19
  }
});

// eslint-disable-next-line complexity
export default function Single(props) {
  const [data, setData] = useState(props.navigation.getParam("item"));
  const dispatch = useDispatch();

  useEffect(
    () => {
      const dispatchers = async () => {
        await dispatch(updateUserBeer(data));
        await dispatch(getRankedBeers());
      };
      dispatchers();
    },
    [data]
  );

  const onStarRatingPress = async rating => {
    await setData({ ...data, rating });
  };

  const onAddWishlistPress = async beer => {
    await dispatch(addToWishlistThunk(beer));
    await setData({ ...data, rating: "0" });
  };

  const onRemoveWishlistPress = async beer => {
    await dispatch(removeFromWishlistThunk(beer));
    await setData({ ...data, rating: null });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={
          __DEV__
            ? require("../assets/images/single-beer.png")
            : require("../assets/images/single-beer.png")
        }
        style={{
          width: "110%",
          height: "110%",
          bottom: 0,
          position: "absolute",
          opacity: 0.6
        }}
      />
      <View style={styles.nameRating}>
        <Text style={styles.textLarge}>{data.name}</Text>
        <StarRating
          disabled={false}
          iconSet="Ionicons"
          emptyStar="ios-star-outline"
          fullStar="ios-star"
          rating={Number(data.rating)}
          maxStars={5}
          selectedStar={rating => onStarRatingPress(rating)}
          fullStarColor="#b8860b"
        />
        {data.brewer ? (
          <Text style={styles.stat}>Brewed by {data.brewer}</Text>
        ) : (
          <Text />
        )}
        {data.type ? (
          <Text style={styles.stat}>Type: {data.type}</Text>
        ) : (
          <Text />
        )}
        {data.abv ? (
          <Text style={styles.stat}>ABV: {Math.round(data.abv * 10) / 10}</Text>
        ) : (
          <Text />
        )}
        {data.ibu > 0 ? (
          <Text style={styles.stat}>IBU: {data.ibu}</Text>
        ) : (
          <Text />
        )}
        {data.srm > 0 ? (
          <Text style={styles.stat}>SRM: {data.srm}</Text>
        ) : (
          <Text />
        )}
        {data.description ? (
          <Text style={styles.text}>
            {data.description.length > 600
              ? "    " + data.description.slice(0, 600).concat("...")
              : "    " + data.description}
          </Text>
        ) : (
          <Text />
        )}
        {data.website ? (
          <Hyperlink
            linkDefault={true}
            linkStyle={{ color: "blue", fontSize: 20 }}
          >
            <Text style={styles.text}>{data.website}</Text>
          </Hyperlink>
        ) : (
          <Text />
        )}
        <Text />
        {data.address ? (
          <Text style={styles.location}>{data.address}</Text>
        ) : (
          <Text />
        )}
        <Text style={styles.location}>
          {data.city ? `${data.city}, ` : ""}
          {data.state ? `${data.state}, ` : ""}
          {data.country ? `${data.country}` : ""}
        </Text>
        {data.coordinates ? (
          <Text style={styles.location}>Coordinates: {data.coordinates}</Text>
        ) : (
          <Text />
        )}
      </View>
      {!data.rating ? (
        <Button
          title="Add to wishlist"
          color="blue"
          onPress={() => {
            onAddWishlistPress(data);
          }}
        />
      ) : (
        <Text />
      )}
      {data.rating === "0" ? (
        <Button
          title="Remove from wishlist"
          color="blue"
          onPress={() => {
            onRemoveWishlistPress(data);
          }}
        />
      ) : (
        <Text />
      )}
    </View>
  );
}
