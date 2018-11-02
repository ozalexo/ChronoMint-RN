import { StyleSheet } from 'react-native'
import colors from '../../common/colors'

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.red,
    margin: 4,
  },
  bulletFetching: {
    backgroundColor: colors.grayDark,
  },
  bulletSyncing: {
    backgroundColor: colors.orange,
  },
  bulletSynced: {
    backgroundColor: colors.green,
  },
  label: {
    fontSize: 12,
    color: colors.background,
  },
})
