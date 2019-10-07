import React, { Component } from 'react';
import {connect} from 'react-redux'
import { View, StyleSheet, Text } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import {getRankedBeers} from '../../store/beer'
import Item from './item'




class List extends Component {

    componentDidMount() {
        // Get all beers that user has previously ranked
        this.props.getRanks()
    }

    render() {
      return (
        <View style={styles.container}>
            <View style={styles.textWrapper}>
                {this.props.ranked.map(beer => {
                    return <Item key={beer.id} name={beer.name} rating={beer.rating} />
                })}
            </View>
        </View>
      );
    }
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

const mapDispatchToProps = (dispatch) => ({
    getRanks: () => {
        dispatch(getRankedBeers())
    }
})

const mapStateToProps = (state) => ({
    ranked: state.beer.ranked
})

const RankedList = connect(mapStateToProps, mapDispatchToProps)(List)

export default RankedList