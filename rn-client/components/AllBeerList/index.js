import React, { useState, useEffect } from 'react';
import allBeers, { types } from '../../store/beerDb';
import { View, Text, FlatList } from 'react-native';
import renderSeparator from './Seperator';
import renderHeader from './Header';
import styles from './style-sheet';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../../store/search';

// COMPONENT
export default function AllList() {
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
    dispatch(actions.blank());
  }, []);

  // SEARCH CHANGE HANDLER
  const changeHandler = async (query, selection, beerTypeId) => {
    await setSearch(query);
    await setType(selection);
    await setTypeIndex(beerTypeId);
    dispatch(actions.search(query, beerTypeId));
  };

  // IF SELECTION MADE RENDER THIS
  let rendered = (
    <View style={styles.container}>
      <FlatList
        data={list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.flatview}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.brewer}>{item.brewer}</Text>
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
    </View>
  );
  // IF NO SELECTION MADE RENDER THIS
  let loading = <Text style={styles.loading}> Loading... </Text>;
  // RENDER
  return list ? rendered : loading;
}
