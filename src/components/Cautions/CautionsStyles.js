import { StyleSheet } from 'react-native'
import colors from '../../common/colors'

export default StyleSheet.create({
  item: {
    flexDirection: 'row',
  },
  bullet: {
    color: colors.orange,
    paddingRight: 16,
  },
  container: {
    flexDirection: 'row',
    marginHorizontal: 16,
  },
  list: {
    flex: 1,
    marginRight: 24,
  },
  image: {
    marginTop: 4,
    marginRight: 24,
  },
  text: {
    color: colors.backgroundLight,
    fontSize: 16,
  }
})
