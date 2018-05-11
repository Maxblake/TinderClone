import { StyleSheet, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  button: {
    height: 44 / 375 * width,
    width: 220 / 375 * width,
    backgroundColor: 'rgb(59,89,152)',
    borderRadius: 50,
  },

  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    fontSize: 14 / 667 * height,
    color: 'rgb(255,255,255)',
    marginLeft: 15,
  },
})

export default styles
