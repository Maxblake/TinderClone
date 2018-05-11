import React, { Component } from 'react'
import Home from './screens/home'
import Login from './screens/login'

import * as firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyBWq2pA1ZLdmjRi0MFpSRccKf_V98HW1BQ',
  databaseURL: 'https://tinderclone-5c307.firebaseio.com',
}

firebase.initializeApp(firebaseConfig)

export default class App extends Component {
  render() {
    return <Login />
  }
}
