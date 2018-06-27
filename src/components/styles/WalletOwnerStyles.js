/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import {
  StyleSheet,
} from 'react-native'
import colors from '../../utils/colors'

const styles = StyleSheet.create({
  address: {
    color: '#7F7F7F',
    fontSize: 12,
    fontWeight: '200',
  },
  image: {
    height: 32,
    margin: 8,
    width: 32,
  },
  name: {
    fontSize: 12,
    fontWeight: '700',
  },
  owner: {
    backgroundColor: colors.background,
    borderRadius: 3,
    flexDirection: 'row',
    margin: 8,
    padding: 8,
  },
  ownerContent: {
    flex: 1,
    margin: 8,
  },
})

export default styles
