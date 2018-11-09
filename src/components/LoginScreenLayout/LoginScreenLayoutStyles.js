import { StyleSheet } from 'react-native'
import {backgroundColor} from '../../common/colors'

export default StyleSheet.create({
  keyboardView: {
    flexGrow: 1,
  },
  screenView: {
    backgroundColor,
  },
  screenContent: {
    paddingTop: 64,
    paddingBottom: 30,
  },
  backgroundImage: {
    resizeMode: 'contain',
    position: 'absolute',
    top: -140,
  },
  backgroundImageFull: {
    top: 0,
  },
})
