import React from 'react';
import {connect} from 'react-redux'
import { View, Text, StyleSheet } from 'react-native';
import StarRating from 'react-native-star-rating';
import {updateUserBeer} from '../store/beer'




class Single extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      beer: props.navigation.getParam('beer')
    }
  }
  componentWillUnmount() {
    this.props.update(this.state.beer)
  }
  onStarRatingPress(rating) {
    this.setState({
      beer: {...this.state.beer, rating}
    });
  }
  render () {
    return (
      <View style={styles.container}>
        <View style={styles.nameRating}>
          <Text style={styles.text}>Name: {this.state.beer.name}</Text>
          <StarRating 
            disabled={false} 
            rating={this.state.beer.rating} 
            maxStars={5} 
            selectedStar={(rating) => this.onStarRatingPress(rating)}
            fullStarColor={'blue'}
             />
        </View>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 19,
  },
  nameRating: {
    justifyContent: 'space-around'
  }
});

const mapDispatchToProps = (dispatch) => ({
  update: (ub) => {
      dispatch(updateUserBeer(ub))
  }
})

const SingleBeerView = connect(null, mapDispatchToProps)(Single)


export default SingleBeerView;
