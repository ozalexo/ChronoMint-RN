import { StyleSheet } from 'react-native'
import colors from '../../common/colors'

export default StyleSheet.create({
  container: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftSection: {
    width: 24,
    marginHorizontal: 8,
  },
  rightSection: {
    marginHorizontal: 8,
  },
  arrow: {
    marginRight: 16,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  text: {
    color: colors.foreground,
    flex: 1,
    textAlign: 'left',
  },
  textDark: {
    color: colors.backgroundLight,
    flex: 1,
    textAlign: 'left',
  },
})
