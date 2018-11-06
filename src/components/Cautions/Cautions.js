/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import * as React from 'react'
import { View, Image, Text } from 'react-native'
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

const Cautions = (props) => {
  const { caution } = props

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={alert}
      />
      <View style={styles.list}>
        <CautionItem text={textConstants.Cautions[caution]} />
      </View>
    </View>
  )
}

Cautions.propTypes = {
  caution: PropTypes.oneOf(['keepItSafe', 'makeBackup', 'dontShare', 'dontLose']),
}

export default Cautions
