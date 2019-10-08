import React, { useEffect, useState } from 'react';
import axios from 'axios'
import {connect} from 'react-redux'
import { View, StyleSheet, Button } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import {getRankedBeers} from '../../store/beer'





function List () {
    const [data, setData] = useState({ranked: []})
    useEffect(() => {
        const fetchData = async () => {
          const result = await axios(
            'http://localhost:8080/api/userbeers',
          );
          let beers = []
          for (let i = 0; i < data.length; ++i) {
            let userBeer = data[i]
            let beer = all[userBeer.beerId]
            beer.rating = userBeer.rating
            beer.userId = userBeer.userId
            beers.push(beer)
        }
          setData(beers.data);
        };
        fetchData();
      }, []);

      return (
        <View style={styles.container}>
            <View style={styles.textWrapper}>
                {data.ranked.map(beer => {
                    return <Button key={beer.id} title={`${beer.name}`} onPress={() => this.props.navigation.navigate('SingleBeer', {beer})} />
                })}
            </View>
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
      myText: {
        fontSize: hp('5%') // End result looks like the provided UI mockup
    }
})

// const mapDispatchToProps = (dispatch) => ({
//     getRanks: () => {
//         dispatch(getRankedBeers())
//     }
// })

// const mapStateToProps = (state) => ({
//     ranked: state.beer.ranked
// })

// const RankedList = connect(mapStateToProps, mapDispatchToProps)(List)

export default List