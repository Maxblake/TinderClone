import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Image,
  Text,
  PanResponder,
  Animated,
  Dimensions,
} from 'react-native'

const { width, height } = Dimensions.get('window')

const fbImage = 'https://graph.facebook.com/259389830744794/picture?height=500'

class Card extends Component {
  constructor() {
    super()

    this.pan = new Animated.ValueXY({ x: 1, y: 1 })

    this.cardPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([
        null,
        { dx: this.pan.x, dy: this.pan.y },
      ]),

      onPanResponderRelease: (e, gesture) => {
        Animated.spring(this.pan, {
          toValue: { x: 0, y: 0 },
          friction: 4.5,
        }).start()
      },
    })
  }

  render() {
    const rotateCard = this.pan.x.interpolate({
      inputRange: [-200, 0, 200],
      outputRange: ['10deg', '0deg', '-10deg'],
    })
    const animatedStyle = {
      transform: [
        { translateX: this.pan.x },
        { translateY: this.pan.y },
        { rotate: rotateCard },
      ],
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
    position: 'absolute',
    width: width - 20,
    height: height * 0.7,
    top: height * 0.3 / 2,
    overflow: 'hidden',
    backgroundColor: 'white',
    margin: 10,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 8,
  },
})

export default Card
