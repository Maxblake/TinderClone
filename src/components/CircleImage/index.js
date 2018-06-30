import React from 'react'

import { Image } from 'react-native'

const CircleImage = ({ size, facebookID }) => {
  const fbImage = `https://graph.facebook.com/${facebookID}/picture?height=500`
  const imageSize = size
    ? {
        height: size,
        width: size,
        borderRadius: size / 2,
      }
    : null

  return <Image source={{ uri: fbImage }} style={imageSize} />
}

export default CircleImage
