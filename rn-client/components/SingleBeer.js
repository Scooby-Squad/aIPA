import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StarRating from 'react-native-star-rating';

const SingleBeerView = props => {
  return (
    <View style={styles.container}>
      <View style={styles.nameRating}>
        <Text style={styles.text}>Beer Name Here: {props.id}</Text>
        <Text style={styles.text}>Beer Rating</Text>
        {/* The Rating will probably need to be store in the db so there will be an onPress
      To dispatch a thunk to change the shown stars */}
        <StarRating disabled={false} maxStars={5} />
      </View>
    </View>
  );
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

export default SingleBeerView;


/* 
 _______          __     ____ ___                 .___
 \      \   _____/  |_  |    |   \______ ____   __| _/
 /   |   \ /  _ \   __\ |    |   /  ___// __ \ / __ | 
/    |    (  <_> )  |   |    |  /\___ \\  ___// /_/ | 
\____|__  /\____/|__|   |______//____  >\___  >____ | 
        \/                           \/     \/     \/ 

 __   .__.__  .__                    
|  | _|__|  | |  |     _____   ____  
|  |/ /  |  | |  |    /     \_/ __ \ 
|    <|  |  |_|  |__ |  Y Y  \  ___/ 
|__|_ \__|____/____/ |__|_|  /\___  >
     \/                    \/     \/ 

*/