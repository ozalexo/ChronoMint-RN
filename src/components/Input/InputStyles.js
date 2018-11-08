import { StyleSheet } from 'react-native'
import colors from '../../common/colors';

export default StyleSheet.create({
  input: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: '100%',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomColor: colors.dustygray,
    color: colors.dustygray,
    backgroundColor: colors.transparent,
    fontSize: 16,
  },
  success: {
    borderBottomColor: colors.success,
    color: colors.success,
  },
  error: {
    borderBottomColor: colors.error,
    color: colors.error,
  },
})
