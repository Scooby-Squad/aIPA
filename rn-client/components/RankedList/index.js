import React, { useEffect } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getRankedBeers } from '../../store/beer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  }
});

export default function List(props) {
  const ranked = useSelector(state => state.beer.ranked);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = () => dispatch(getRankedBeers());
    fetchData();
  }, []);

  let rendered = (
    <View style={styles.container}>
      <View style={styles.textWrapper}>
        {ranked.map(beer => {
          return (
            <Button
              key={beer.id}
              title={`${beer.name}`}
              onPress={() => props.navigation.navigate('SingleBeer', { beer })}
            />
          );
        })}
      </View>
    </View>
  );
  let loading = <Text> Loading </Text>;

  return ranked ? rendered : loading;
}
