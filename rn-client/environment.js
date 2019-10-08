import Constants from 'expo-constants'
import { Platform } from 'react-native'

const localhost = Platform.OS === 'ios' ? 'http://localhost:8080' : 'http://10.0.2.2:8080'

const ENV = {
  dev: {
    apiUrl: localhost,
    androidClientId: '334829367129-7dm2ulp6lh2phi1plip594cqsshr7rml.apps.googleusercontent.com/',
    iosClientId: '334829367129-ugb9j6ptgf8e2fdt4r95n1kuafikdbie.apps.googleusercontent.com'
  },
  prod: {
    apiUrl: localhost,
    androidClientId: '334829367129-7dm2ulp6lh2phi1plip594cqsshr7rml.apps.googleusercontent.com/',
    iosClientId: '334829367129-ugb9j6ptgf8e2fdt4r95n1kuafikdbie.apps.googleusercontent.com'
  }
}

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
  if (__DEV__) {
    return ENV.dev
  } else {
    return ENV.prod
  }
}

export default getEnvVars
