import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Touchable from 'react-native-platform-touchable';

export default class LinksView extends React.Component {
  render() {
    return (
      <View>
        <Text style={styles.optionsTitleText}>Resources</Text>

        <Touchable
          style={styles.option}
          background={Touchable.Ripple('#ccc', false)}
          onPress={this._handlePressDocs}
        >
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.optionIconContainer}>
            </View>
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionText}>Take/Review Quiz</Text>
            </View>
          </View>
        </Touchable>
      </View>
    );
  }

  _handlePressDocs = () => {
    this.props.navigation.navigate('Quiz');
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
  optionsTitleText: {
    fontSize: 16,
    marginLeft: 15,
    marginTop: 9,
    marginBottom: 12,
  },
  optionIconContainer: {
    marginRight: 9,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#EDEDED',
  },
  optionText: {
    fontSize: 15,
    marginTop: 1,
  },
});
