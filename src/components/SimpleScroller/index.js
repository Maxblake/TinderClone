import React from 'react'
import { View, Animated, PanResponder } from 'react-native'

import styles, { width, height } from './styles'

class SimpleScroller extends React.Component {
  componentWillMount() {
    this.pan = new Animated.Value(0)

    this.scrollResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,

      onPanResponderGrant: () => {
        this.pan.setOffset(this.pan._value)
        this.pan.setValue(0)
      },

      onPanResponderMove: Animated.event([null, { dx: this.pan }]),

      onPanResponderRelease: (e, { vx }) => {
        this.pan.flattenOffset()

        let move = Math.round(this.pan._value / width) * width

        if (Math.abs(vx) > 0.25) {
          const direction = vx / Math.abs(vx)

          const scrollPos =
            direction > 0
              ? Math.ceil(this.pan._value / width)
              : Math.floor(this.pan._value / width)

          move = scrollPos * width
        }

        const minScroll = (this.props.screens.length - 1) * -width

        Animated.spring(this.pan, {
          toValue: this.clamp(move, minScroll, 0),
          bounciness: 0,
        }).start()
      },
    })
  }

  clamp = (num, min, max) => {
    if (num <= min) {
      return min
    }
    if (num >= max) {
      return max
    }
    return num
  }

  render() {
    const animatedStyle = {
      transform: [{ translateX: this.pan }],
    }

    const scrollerWidth = this.props.screens.length * width
    return (
      <Animated.View
        {...this.scrollResponder.panHandlers}
        style={[styles.container, animatedStyle, { width: scrollerWidth }]}
      >
        {this.props.screens.map((screen, i) => {
          return (
            <View key={i} style={{ width, height }}>
              {screen}
            </View>
          )
        })}
      </Animated.View>
    )
  }
}

export default SimpleScroller
