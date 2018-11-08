import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  input: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: '100%',
    alignSelf: 'stretch',
    alignItems: 'center',
    height: 44,
    borderBottomColor: '#9997B2',
    color: '#9997B2',
    fontSize: 16,
  },
  error: {
    borderBottomColor: 'red',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
})
