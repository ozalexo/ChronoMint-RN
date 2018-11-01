import { StyleSheet } from 'react-native'
import colors from '../../common/colors';

export default StyleSheet.create({
    titleDark: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      color: colors.background,
      fontWeight: '900'
    },
    container: {
      backgroundColor: '#EFEFF3',
      paddingHorizontal: 20,
      paddingTop: 16,
      paddingBottom: 6,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderBottomWidth: StyleSheet.hairlineWidth,
      alignItems: 'center',
      borderTopColor: '#C7C7CC',
      borderBottomColor: '#C7C7CC'
    }
  })
  