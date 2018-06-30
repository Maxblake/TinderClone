import React from 'react'

import { View, Text } from 'react-native'
import moment from 'moment'
import styles from './styles'
import CircleImage from '../../components/CircleImage'
import Slider from '../../components/Slider'

export default class Profile extends React.Component {
  render() {
    const { first_name, birthday, id } = this.props.user
    console.log('id', id)
    const profileBday = moment(birthday, 'MM/DD/YYYY')
    const profileAge = moment().diff(profileBday, 'years')
    return (
      <View style={styles.container}>
        <View style={styles.profile}>
          <CircleImage facebookID={id} size={100} />
          <Text style={styles.name}> {first_name} </Text>
          <Text style={styles.age}> {profileAge} </Text>
          <Slider />
        </View>
      </View>
    )
  }
}
