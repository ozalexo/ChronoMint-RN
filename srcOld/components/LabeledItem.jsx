/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React from 'react'
import type { Element } from 'react'
import {
  View,
  Text,
} from 'react-native'
import Label from '../components/Label'
import styles from '../components/styles/LabeledItemStyles'

type LabeledItemProps = {
  children?: Element<typeof Text> | Array<Element<typeof Text>>, // This component my be used as pure <Label /> with no children
  labelAlign?: 'left' | 'right' | 'top' | 'bottom',
  labelTextAlign?: 'left' | 'right',
  labelType?: 'currencyColored', // May be extended in the future like 'currencyColored' | 'otherTypeOfLabel'
  labelText: string,
}

const LabeledItem = (props: LabeledItemProps) => {

  let containerStyle = styles.containerHorizonatal

  switch (props.labelAlign) {
    case 'left': {
      containerStyle = styles.containerHorizonatal
      break
    }
    case 'right': {
      containerStyle = styles.containerHorizonatalReverse
      break
    }
    case 'top': {
      containerStyle = styles.containerVertical
      break
    }
    case 'bottom': {
      containerStyle = styles.containerVerticalReverse
      break
    }
  }

  // Converting any children to array. toArray also adds a prefix to 'key'
  const children = React.Children.toArray(props.children)
  const {
    labelTextAlign,
    labelType,
    labelText,
  } = props

  return (
    <View style={containerStyle}>
      <Label
        text={labelText}
        labelType={labelType}
        labelAlign={labelTextAlign}
      />
      {
        React.Children.map(children, (child) => child)
      }
    </View>
  )

}

LabeledItem.defaultProps = {
  labelAlign: 'top',
  labelTextAlign: 'left',
}

export default LabeledItem
