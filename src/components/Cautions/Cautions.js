/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import * as React from 'react'
import { View, Image, Text } from 'react-native'
// import I18n from 'react-native-i18n'
import textConstants from '../../locales/en'
import PropTypes from 'prop-types'
import styles from './CautionsStyles'
import { alert } from '../../images'


const CautionItem = ({ text }) => (
  <View style={styles.item}>
    <Text style={styles.bullet}>•</Text>
    <Text style={styles.text}>{text}</Text>
  </View>
)

CautionItem.propTypes = {
  text: PropTypes.string,
}

const Cautions = () => (
  <View style={styles.container}>
    <Image
      style={styles.image}
      source={alert}
  />
    <View style={styles.list}>
      <CautionItem text={textConstants.Cautions.keepItSafe} />
      <CautionItem text={textConstants.Cautions.makeBackup} />
      <CautionItem text={textConstants.Cautions.dontShare} />
      <CautionItem text={textConstants.Cautions.dontLose} />
    </View>
  </View>
)

export default Cautions
