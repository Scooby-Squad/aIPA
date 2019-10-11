import React, { useState, useEffect } from 'react';
import {types} from '../store/beerDb'
import renderHeader from './AllBeerList/Header'
import { View, Button, Text, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import StarRating from 'react-native-star-rating';
import renderSeparator from './AllBeerList/Seperator'
import styles from './AllBeerList/style-sheet'
import { searchRanked, blankSearch } from '../store/beer'


export default function List(props) {
  const dispatch = useDispatch();
  const {sortCB, dispatchCreator, selectorCB} = props

  // GLOBAL STATE
  const list = useSelector(state => state.beer.rankSearch);

  // LOCAL STATE
  const [type, setType] = useState('Select Type');
  const [search, setSearch] = useState('');
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
    dispatch(searchRanked(query, beerTypeId));
  };


  useEffect(() => {
    const fetchData = () => dispatch(dispatchCreator());
    fetchData();
  }, []);

  const beers = useSelector(selectorCB)
  let rendered =
    (
    <View>
      <FlatList
        data={list.sort(sortCB)}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
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
                  rating={Number(item.rating)}
                  maxStars={5}
                  starSize={15}
                  fullStarColor="blue"
                />
              <Button
                  style={{fontSize: 5}}
                  title="View"
                  onPress={() =>
                    props.navigation.navigate('SingleBeer', { item })
                  }
                />
            </View>
          </View>
        )}
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
    </View>)

  let loading = <Text> Loading </Text>;

  return beers ? rendered : loading;
}
