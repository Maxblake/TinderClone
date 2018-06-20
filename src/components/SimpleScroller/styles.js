import { StyleSheet, Dimensions } from 'react-native'

export const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    flexDirection: 'row',
  },
})

export default styles
