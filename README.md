![Picture1](https://i.imgur.com/oxAxDAs.jpg | width = 150)

# aIPA

Bypass Bad Beer Before Buying

To use a deployed version of the app, please visit the site here to download and use via Expo. Otherwise, see instructions below for setting up on a local machine.

http://bit.ly/b5aIPA

## Installation

After forking/cloning the repo, to install dependencies run, both the webserver and the expo client:

```bash
cd webserver
npm install

cd ../rn-client
npm install
```
With postgres installed on your machine, the db needs to be created:

```bash
createdb aipa
```
An environment.js file needs to exist in the ./aipa/rn-client/ folder in the format of:

```environment.js
import Constants from 'expo-constants'
import { Platform } from 'react-native'

// for ios vs android, expo/RN uses different paths for localhost
const localhost = Platform.OS === 'ios' ? 'http://localhost:8080' : 'http://10.0.2.2:8080'

// this lets us set up different environments, for different links or keys
const ENV = {
  dev: {
    // we use localhost for dev working, but can use heroku if you switch apiUrl lines
    // if you try and work locally directly on your phone, localhost doesn't work, have to use your computers IP address
    // could use heroku if working directly on phone
    apiUrl: localhost,
    androidClientId: '<YOUR_ANDROID_CLIENT_ID>',
    iosClientId: '<YOUR_IOS_CLIENT_ID>'
  },
  prod: {
    apiUrl: localhost,
    androidClientId: '<YOUR_ANDROID_CLIENT_ID>',
    iosClientId: '<YOUR_IOS_CLIENT_ID>'
  }
}

// we use this for reference in the store for hitting axios/client IDs for OAuth
// defaults to dev when running
// only if you do expo publish --release-channel <channel-name> will it use the else statement
// based on the channel-name, could theoretically have more than two environments
const getEnvVars = (env = Constants.manifest.releaseChannel) => {
  if (__DEV__) {
    return ENV.dev
  } else {
    return ENV.prod
  }
}

export default getEnvVars

```
Please reference documentation here for setting up your own Android/iOS Google client IDs.
https://docs.expo.io/versions/latest/sdk/google/


## Usage
```bash
cd ~/aipa/webserver
npm run start-dev
```
This will start the webserver locally so that a user can login, store information about their ratings, and get predictions from the server

```bash
cd ~/aipa/rn-client
expo start
```
 
This will open a browser window from Expo, that will allow you to open the app in either an Android or iOS simulator. To get the experience on your phone, download Expo Client from the App Store (available on both platforms) and scan the QR code. Please note the change potentially needed to the apiUrl in the file above if using directly on your phone.

## Technologies Used

https://stackshare.io/dhochbaum/aipa


## Contributors

<table>
  <tr>
    <td align="center"><a href="https://github.com/jschwantz"><img src="" width="120px;" alt="Jared Schwantz"/><br /><sub><b>Jared Schwantz</b></sub><br /></a></td>
  </tr>
</table>

