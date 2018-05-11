import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'

import FacebookButton from '../../components/FacebookButton'
import styles from './styles'

export default class Login extends Component {
  render() {
    return (
      <View style={styles.container}>
        <FacebookButton
          onPress={() => console.log('Heaven is a place on earth')}
        />
      </View>
    )
  }
}
