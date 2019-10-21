import React, { useState, useEffect } from "react";
import { types } from "../store/beerDb";
import renderHeader from "./AllBeerList/Header";
import { View, Button, TouchableOpacity, Text, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import StarRating from "react-native-star-rating";
import renderSeparator from "./AllBeerList/Seperator";
import styles from "./AllBeerList/style-sheet";
import { searchRanked, blankSearch } from "../store/beer";

export default function List(props) {
  const dispatch = useDispatch();
  const { sortCB, dispatchCreator, selectorCB, ratingToUse, listToUse } = props;

  // GLOBAL STATE
  const list = useSelector(state => state.beer.rankSearch);
  const state = useSelector(state => state)


  // LOCAL STATE
  const [type, setType] = useState("Select Type");
  const [search, setSearch] = useState("");
  const [typeIndex, setTypeIndex] = useState(100);

  // INITIAL RENDER
  useEffect(() => {
    dispatch(blankSearch());
  }, []);

  // SEARCH CHANGE HANDLER
  const changeHandler = async (query, selection, beerTypeId) => {
    await setSearch(query);
    await setType(selection);
    await setTypeIndex(beerTypeId);
    dispatch(searchRanked(query, beerTypeId, listToUse));
  };

  useEffect(() => {
    const fetchData = () => dispatch(dispatchCreator());
    fetchData();
  }, []);

  const beers = useSelector(selectorCB);
  let rendered = (
    <View>
      <FlatList
        data={list.sort(sortCB)}
        extraData={state}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
          <View style={styles.flatview}>
            <View style={styles.text}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.brewer}>{item.brewer}</Text>
            </View>
            <View style={styles.stars}>
              <StarRating
                iconSet="Ionicons"
                emptyStar="ios-star-outline"
                fullStar="ios-star"
                stlye={styles.rating}
                disabled={true}
                rating={Number(item[ratingToUse])}
                maxStars={5}
                starSize={15}
                fullStarColor="blue"
              />
              <TouchableOpacity
                onPress={() => {
                  return props.navigation.navigate("SingleBeer", { item })
                }}
              >
                <Text style={styles.button}>View</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}}
        ItemSeparatorComponent={renderSeparator}
        keyExtractor={item => item.id}
        ListHeaderComponent={renderHeader({
          search,
          type,
          typeIndex,
          types,
          styles,
          changeHandler
        })}
      />
    </View>
  );

  let loading = <Text> Loading </Text>;

  return beers ? rendered : loading;
}
