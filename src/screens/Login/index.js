import React, { Component } from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import firebase from 'firebase'
import { StackActions, NavigationActions } from 'react-navigation'

import FacebookButton from '../../components/FacebookButton'
import styles from './styles'

export default class Login extends Component {
  state = {
    showSpinner: true,
  }

  componentDidMount() {
    // firebase.auth().signOut()
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const resetAction = StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({
              routeName: 'Home',
              params: { uid: user.uid },
            }),
          ],
        })
        this.props.navigation.dispatch(resetAction)
      } else {
        this.setState({ showSpinner: false })
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
    const { showSpinner } = this.state
    return (
      <View style={styles.container}>
        {showSpinner ? (
          <ActivityIndicator animating={showSpinner} />
        ) : (
          <FacebookButton onPress={this._login} />
        )}
      </View>
    )
  }
}
