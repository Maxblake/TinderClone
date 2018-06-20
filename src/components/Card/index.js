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

import moment from 'moment'
import styles from './styles'

export default class Card extends Component {
  componentWillMount() {
    this.pan = new Animated.ValueXY({ x: 1, y: 1 })

    this.cardPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([
        null,
        { dx: this.pan.x, dy: this.pan.y },
      ]),

      onPanResponderRelease: (e, { dx }) => {
        const absDx = Math.abs(dx)
        const diretion = absDx / dx

        if (absDx > 120) {
          Animated.decay(this.pan, {
            velocity: { x: 3 * diretion, y: 0 },
            deceleration: 0.995,
          }).start(this.props.onSwipeOff)
        } else {
          Animated.spring(this.pan, {
            toValue: { x: 0, y: 0 },
            friction: 4.5,
          }).start()
        }
      },
    })
  }

  render() {
    const { id, birthday, first_name } = this.props.profile
    const profileBday = moment(birthday, 'MM/DD/YYYY')
    const profileAge = moment().diff(profileBday, 'years')
    const fbImage = `https://graph.facebook.com/${id}/picture?height=500`

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
          <Text style={{ fontSize: 20 }}>
            {first_name}, {profileAge}
          </Text>
        </View>
      </Animated.View>
    )
  }
}
