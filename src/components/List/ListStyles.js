import { StyleSheet } from 'react-native'
import colors from '../../common/colors'

export default StyleSheet.create({
  sectionHeader: {
    backgroundColor: colors.background,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: colors.backgroundDark,
    borderBottomWidth: 1,
    borderBottomColor: colors.backgroundDark,
  },
  list: {
    backgroundColor: colors.backgroundLight,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.backgroundDark,
  },
})
