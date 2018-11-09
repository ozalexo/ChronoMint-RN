import { StyleSheet } from 'react-native'
import colors from '../../common/colors'

export default StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  sidePart: {
    flex: 1,
  },
  backButton: {
    justifyContent: 'center',
    paddingLeft: 20,
  },
  title: {
    flex: 10,
    alignItems: 'center',
    fontSize: 17,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 20,
    color: colors.light,
  },
})
