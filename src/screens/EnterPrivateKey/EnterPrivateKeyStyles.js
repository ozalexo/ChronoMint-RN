import { StyleSheet } from 'react-native'
import {headerHeight} from '../../common/constants/screens'

export default StyleSheet.create({
  screenView: {
    marginTop: headerHeight + 20,
    marginBottom: 20,
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 20,
  },
})
