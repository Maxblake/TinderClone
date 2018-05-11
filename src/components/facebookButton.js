import React, { Component } from 'react'

import { View, Text, TouchableHighlight, StyleSheet } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

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

const styles = StyleSheet.create({
  button: {
    height: 44,
    width: 220,
    backgroundColor: 'rgb(59,89,152)',
    borderRadius: 50,
  },

  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    fontSize: 14,
    color: 'rgb(255,255,255)',
    marginLeft: 15,
  },
})
