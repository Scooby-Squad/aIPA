import React from 'react'
import { StyleSheet, Text, View, Image, Button, Platform } from 'react-native'
import * as Google from 'expo-google-app-auth'
import Touchable from 'react-native-platform-touchable'
import getEnvVars from '../environment'
const {apiUrl, androidClientId, iosClientId} = getEnvVars()

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      signedIn: false,
      name: "",
      photoUrl: ""
    }
  }
  signIn = async () => {
    try {
      const result = await Google.logInAsync({
        // in the rn-client folder, might need to run 'rm -rf node_modules && npm install' and restart expo cli
        androidClientId,
        iosClientId,
        scopes: ["profile", "email"]
      })

      if (result.type === "success") {
        const user = await this.fetchUser(result.user)
        this.setState({
          signedIn: true,
          name: result.user.name,
          photoUrl: result.user.photoUrl
        })
      } else {
        console.log("cancelled")
      }
    } catch (e) {
      console.log("error", e)
    }
  }
  fetchUser = (data) => {
    const uri = `${apiUrl}/auth/google/`
    fetch(uri, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((response) => response.json())
        .then((responseJson) => {
          return responseJson;
        })
        .catch((error) => {
          console.error(error);
        });
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.signedIn ? (
          <LoggedInPage {...this.props} name={this.state.name} photoUrl={this.state.photoUrl} />
        ) : (
          <LoginPage signIn={this.signIn} />
        )}
      </View>
    )
  }
}

const LoginPage = props => {
  return (
    <View>
      <Text style={styles.header}>Sign In With Google</Text>
      <Button title="Sign in with Google" onPress={() => props.signIn()} />
    </View>
  )
}

const LoggedInPage = props => {
  const _handlePressDocs = () => {
    props.navigation.navigate('Quiz')
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome:{props.name}</Text>
      <Image style={styles.image} source={{ uri: props.photoUrl }} />
      <Touchable
          style={styles.option}
          background={Touchable.Ripple('#ccc', false)}
          onPress={_handlePressDocs}>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionText}>Take/Review Quiz</Text>
            </View>
          </View>
        </Touchable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    fontSize: 25
  },
  image: {
    marginTop: 15,
    width: 150,
    height: 150,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 3,
    borderRadius: 150
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
})