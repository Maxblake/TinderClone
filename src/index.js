import { createStackNavigator } from 'react-navigation'
import Home from './screens/Home'
import Login from './screens/Login'

import * as firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyBWq2pA1ZLdmjRi0MFpSRccKf_V98HW1BQ',
  databaseURL: 'https://tinderclone-5c307.firebaseio.com/',
}

firebase.initializeApp(firebaseConfig)

const RouteConfigs = {
  Login,
  Home,
}

export default createStackNavigator(RouteConfigs)
