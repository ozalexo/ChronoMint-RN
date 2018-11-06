import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  input: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: '100%',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomColor: '#9997B2',
    color: '#9997B2',
    backgroundColor: 'transparent',
    fontSize: 16,
  },
  success: {
    borderBottomColor: 'green',
    color: 'green',
  },
  error: {
    borderBottomColor: 'red',
    color: 'red',
  },
})
