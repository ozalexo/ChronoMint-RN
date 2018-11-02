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
    color: colors.foreground,
  },
  labelDark: {
    color: colors.backgroundLight,
  },
  checkboxContainer: {
    marginRight: 8
  }
})
