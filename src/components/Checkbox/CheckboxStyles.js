import { StyleSheet } from 'react-native'
import colors from '../../common/colors'

export default StyleSheet.create({
  container: {
    padding: 8,
    minWidth: 20,
    minHeight: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  label: {
    color: colors.primaryLight,
  },
  labelDark: {
    color: colors.primaryDarkest,
  },
  checkboxContainer: {
    marginRight: 8
  }
})
