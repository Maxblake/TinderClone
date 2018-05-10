import React, { Component } from 'react'

import Card from './card'
import { View } from 'react-native'

export default class App extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Card />
        <Card />
      </View>
    )
  }
}
