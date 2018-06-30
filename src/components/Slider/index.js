import React from 'react'

import { View, Animated, PanResponder } from 'react-native'
import styles from './styles'

export default class Slider extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      value: 0,
      maxRange: this.props.max,
      minRange: this.props.min,
      animatedStyle: {},
    }
  }

  componentWillMount() {
    this.pan = new Animated.Value(0)

    this.pan.addListener(({ value }) => {
      this.clamp(value)
    })

    this.sliderPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,

      onPanResponderGrant: () => {
        this.pan.setOffset(this.pan._value)
        this.pan.setValue(0)
      },

      onPanResponderMove: Animated.event([null, { dx: this.pan }]),

      onPanResponderRelease: () => {
        this.pan.flattenOffset()
      },
    })
  }

  clamp = (value) => {
    if (value >= 0 && value <= 200) {
      this.setState({ animatedStyle: { left: value } })
    } else if (value <= 0) {
      this.setState({ animatedStyle: { left: 0 } })
    } else if (value >= 200) {
      this.setState({ animatedStyle: { left: 200 } })
    }
  }

  render() {
    const { animatedStyle } = this.state

    return (
      <View style={styles.slider}>
        <Animated.View
          {...this.sliderPanResponder.panHandlers}
          style={[styles.container, animatedStyle]}
        />
      </View>
    )
  }
}
