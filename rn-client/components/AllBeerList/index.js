import React, { useState, useEffect } from 'react';
import allBeers, { types } from '../../store/beerDb';
import { View, Text, FlatList, Button } from 'react-native';
import renderSeparator from './Seperator';
import renderHeader from './Header';
import styles from './style-sheet';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../../store/search';

// COMPONENT
export default function AllList(props) {
  // DISPATCHER
  const dispatch = useDispatch();

  // GLOBAL STATE
  const list = useSelector(state => state.search);

  // LOCAL STATE
  const [type, setType] = useState('Select Type');
  const [search, setSearch] = useState('');
  const [typeIndex, setTypeIndex] = useState(100);

  // INITIAL RENDER
  useEffect(() => {
    dispatch(actions.search('', 0));
  }, []);

  // SEARCH CHANGE HANDLER
  const changeHandler = async (query, selection, beerTypeId) => {
    await setSearch(query);
    await setType(selection);
    await setTypeIndex(beerTypeId);
    dispatch(actions.search(query, beerTypeId));
  };

  // IF SELECTION MADE RENDER THIS
  let render = (
    <View>
      <FlatList
        data={list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.flatview}>
            <View style={styles.text}>
              <Text style={styles.name}>
                {item.name.length > 30
                  ? `${item.name.slice(0, 30)}...`
                  : item.name}
              </Text>
              <Text style={styles.brewer}>
                {item.brewer.length > 35
                  ? `${item.brewer.slice(0, 35)}...`
                  : item.brewer}
              </Text>
            </View>
            <View style={styles.stars}>
              <Button
                style={{ fontSize: 5 }}
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
          changeHandler,
        })}
      />
    </View>
  );
  // RENDER
  return render;
}
