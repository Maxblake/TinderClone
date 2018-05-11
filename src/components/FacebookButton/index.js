import React, { Component } from 'react'

import { View, Text, TouchableHighlight } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

import styles from './styles'

export default class FacebookButton extends Component {
  render() {
    return (
      <TouchableHighlight style={styles.button} onPress={this.props.onPress}>
        <View style={styles.buttonContainer}>
          <FontAwesome name={'facebook-f'} size={20} color={'white'} />
          <Text style={styles.buttonText}> Login with facebook </Text>
        </View>
      </TouchableHighlight>
    )
  }
}
