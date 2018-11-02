import { View, StyleSheet } from 'react-native'
import colors from '../../common/colors'

export default StyleSheet.create({
    separator: {
      backgroundColor: colors.gray,
      minHeight: StyleSheet.hairlineWidth,
      minWidth: StyleSheet.hairlineWidth,
      flexGrow: 0,
      flexShrink: 0,
      alignSelf: 'stretch'
    }
  })
  