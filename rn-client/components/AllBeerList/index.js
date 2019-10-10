import React, { useState } from 'react';
import allBeers, { types } from '../../store/beerDb';
import { View, Text, FlatList } from 'react-native';
import renderSeparator from './Seperator';
import renderHeader from './Header';
import styles from './style-sheet';

// COMPONENT
export default function AllList() {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState('All');

  // SELECTION HANDLER
  const selectionHandler = async (type, selection) => {
    await setSearch(selection);
    let newList = [...allBeers];
    if (type > 0) {
      newList = allBeers.filter(beer => {
        return beer.typeId == type;
      });
    }
    await setList(newList);
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
          types,
          styles,
          selectionHandler
        })}
      />
    </View>
  );
  // IF NO SELECTION MADE RENDER THIS
  let loading = <Text style={styles.loading}> Loading... </Text>;
  // RENDER
  return list ? rendered : loading;
}
