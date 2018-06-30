import React, { Component } from 'react'

import Card from '../../components/Card'
import { View } from 'react-native'
import SimpleScroller from '../../components/SimpleScroller'
import * as firebase from 'firebase'
import GeoFire from 'geofire'
import Profile from '../Profile'

export default class Home extends Component {
  state = {
    profileIndex: 0,
    profiles: [],
    currentUser: this.props.navigation.state.params.user,
  }

  componentWillMount() {
    this._getUserLocation(this.props.navigation.state.params.user.uid)
    firebase
      .database()
      .ref()
      .child('users')
      .once('value', (snap) => {
        let profiles = []
        snap.forEach((profile) => {
          const { first_name, birthday, id } = profile.val()
          profiles.push({ first_name, birthday, id })
        })
        this.setState({ profiles })
      })
  }

  _getUserLocation = async (uid) => {
    const { Permissions, Location } = Expo
    const { status } = await Permissions.askAsync(Permissions.LOCATION)

    if (status === 'granted') {
      const location = await Location.getCurrentPositionAsync({
        enableHighAccuracy: false,
      })

      //const { longitude, latitude } = location.coords
      const latitude = 37.39239 //demo lat
      const longitude = -122.09072 //demo lon
      const geoFireRef = new GeoFire(firebase.database().ref('geoData'))
      geoFireRef.set(uid, [latitude, longitude])
    } else {
      console.log('denied')
    }
  }

  nextCard = () => {
    this.setState({ profileIndex: this.state.profileIndex + 1 })
  }

  _renderCards() {
    const { profileIndex } = this.state
    return this.state.profiles
      .slice(profileIndex, profileIndex + 3)
      .reverse()
      .map((profile, i) => {
        return (
          <Card key={profile.id} profile={profile} onSwipeOff={this.nextCard} />
        )
      })
  }
  render() {
    const { currentUser } = this.state
    return (
      <SimpleScroller
        screens={[<Profile user={currentUser} />, this._renderCards()]}
      />
    )
  }
}
