/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native'
import PropTypes from 'prop-types'
import { chevron_left } from '../../images'
import styles from './NavHeaderStyles'

const NavHeader = ({ goBack, Title, RightPart }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => goBack()}
        style={[styles.sidePart, styles.backButton]}
      >
        <Image
          source={chevron_left}
        />
      </TouchableOpacity>
      <Text style={styles.title}>{Title}</Text>
      <View style={styles.sidePart}>
        {RightPart}
      </View>
    </View>
  )
}

NavHeader.propTypes = {
  goBack: PropTypes.func,
  Title: PropTypes.string,
  RightPart: PropTypes.node,
}

export default NavHeader
