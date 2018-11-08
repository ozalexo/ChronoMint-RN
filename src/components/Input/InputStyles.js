import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  input: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignSelf: 'stretch',
    alignItems: 'center',
    height: 44,
    borderBottomColor: '#9997B2',
    color: '#9997B2',
    fontSize: 16,
  },
  success: {
    borderBottomColor: 'green',
  },
  error: {
    borderBottomColor: 'red',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
})
