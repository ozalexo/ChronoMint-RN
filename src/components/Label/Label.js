/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * 
 */

import React from 'react'
import {
  Text,
  View,
} from 'react-native'
import PropTypes from 'prop-types'
import styles from './LabelStyles'

const Label = ({
  labelType = 'default',
  labelTextAlign = 'left',
  text,
}) => {

  let labelStyle = styles.defaultText
  switch (labelType) {
    case 'currencyColored': {
      labelStyle = styles.currencyText
      break
    }
    default: {
      labelStyle = styles.defaultText
    }
  }
  const labelTextAlignStyle = labelTextAlign === 'left'
    ? styles.leftSidedText
    : styles.rightSidedText

  return (
    <View style={styles.container}>
      <Text style={[labelTextAlignStyle, labelStyle]}>
        {text}
      </Text>
    </View>
  )
}

Label.propTypes = {
  labelTextAlign: PropTypes.oneOf(['left', 'right']),
  labelType: PropTypes.oneOf(['currencyColored']),
  text: PropTypes.string,
}

export default Label
