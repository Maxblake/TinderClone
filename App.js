import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Image,
  Text,
  PanResponder,
  Animated,
} from 'react-native'

const fbImage = 'https://graph.facebook.com/259389830744794/picture?height=500'

class App extends Component {
  constructor() {
    super()
    this.pan = new Animated.ValueXY({ x: 1, y: 1 })
    this.cardPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([
        null,
        { dx: this.pan.x, dy: this.pan.y },
      ]),
      onPanResponderRelease: (e, gesture) => console.log(gesture.moveY),
    })
  }

  render() {
    const animatedStyle = {
      transform: [{ translateX: this.pan.x }, { translateY: this.pan.y }],
    }
    return (
      <Animated.View
        {...this.cardPanResponder.panHandlers}
        style={[styles.card, animatedStyle]}
      >
        <Image style={{ flex: 1 }} source={{ uri: fbImage }} />
        <View style={{ margin: 20 }}>
          <Text style={{ fontSize: 20 }}>Holger Tidemand, 26</Text>
          <Text style={{ fontSize: 15, color: 'darkgrey' }}>Supermodel</Text>
        </View>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: 'white',
    margin: 10,
    marginTop: 100,
    marginBottom: 100,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 8,
  },
})

export default App
