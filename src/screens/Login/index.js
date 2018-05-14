import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import firebase from 'firebase'

import FacebookButton from '../../components/FacebookButton'
import styles from './styles'

export default class Login extends Component {
  _authanticate = token => {
    const provider = firebase.auth.FacebookAuthProvider
    const credential = provider.credential(token)
    return firebase.auth().signInAndRetrieveDataWithCredential(credential)
  }

  _login = async () => {
    const APP_ID = '599138407119061'
    const options = {
      permissions: ['public_profile', 'email'],
    }
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
      APP_ID,
      options
    )

    if (type === 'success') {
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`
      )
      console.log(await response.json())
      this._authanticate(token)
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <FacebookButton onPress={this._login} />
      </View>
    )
  }
}
