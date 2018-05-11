import React, { Component } from 'react'

import Card from '../../components/Card'
import { View } from 'react-native'
import * as firebase from 'firebase'

export default class Home extends Component {
  state = {
    profileIndex: 0,
    profiles: [],
  }

  componentWillMount() {
    firebase
      .database()
      .ref()
      .child('users')
      .once('value', snap => {
        let profiles = []
        snap.forEach(profile => {
          const { name, bio, birthday, id } = profile.val()
          console.log(bio)
          profiles.push({ name, bio, birthday, id })
        })
        this.setState({ profiles })
      })
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
    return <View style={{ flex: 1 }}>{this._renderCards()}</View>
  }
}
