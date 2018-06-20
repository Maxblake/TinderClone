import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import firebase from 'firebase'

import FacebookButton from '../../components/FacebookButton'
import styles from './styles'

export default class Login extends Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.navigation.navigate('Home', { uid: user.uid })
      }
    })
  }

  _authanticate = (token) => {
    const provider = firebase.auth.FacebookAuthProvider
    const credential = provider.credential(token)
    return firebase.auth().signInAndRetrieveDataWithCredential(credential)
  }

  _createUser = (user, userData) => {
    const { uid } = user
    console.log('id', uid)
    firebase
      .database()
      .ref('users')
      .child(uid)
      .update(userData)
  }

  _login = async () => {
    const APP_ID = '599138407119061'
    const options = {
      permissions: ['public_profile', 'user_birthday', 'email', 'user_gender'],
    }
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
      APP_ID,
      options,
    )

    if (type === 'success') {
      const fields = ['id', 'first_name', 'last_name', 'gender', 'birthday']
      const response = await fetch(
        `https://graph.facebook.com/me?fields=${fields.toString()}&access_token=${token}`,
      )
      const userData = await response.json()
      const { user } = await this._authanticate(token)

      this._createUser(user, userData)
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
