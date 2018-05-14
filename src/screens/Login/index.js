import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'

import FacebookButton from '../../components/FacebookButton'
import styles from './styles'

export default class Login extends Component {
  _login = async () => {
    const APP_ID = '599138407119061'
    const options = {
      permissions: ['public_profile'],
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
