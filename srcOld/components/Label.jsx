/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React from 'react'
import {
  Text,
  View,
} from 'react-native'
import styles from './styles/LabelStyles'

type LabelProps = {
  labelTextAlign?: 'left' | 'right',
  labelType?: 'currencyColored', // May be extended in the future like 'currencyColored' | 'otherTypeOfLabel'
  text: string,
}

const Label = ({
  labelType = 'default',
  labelTextAlign = 'left',
  text,
}: LabelProps) => {

  let labelStyle = styles.LabeledText_Default_Label
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
      <Text style={[ labelTextAlignStyle, labelStyle ]}>
        {
          text
        }
      </Text>
    </View>
  )
}

export default Label
