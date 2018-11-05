/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 */

import React from 'react'
import {
  View,
} from 'react-native'
import PropTypes from 'prop-types'
import Label from '../Label'
import styles from './LabeledItemStyles'

const LabeledItem = (props) => {

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

LabeledItem.propTypes = {
  labelAlign: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
  labelTextAlign: PropTypes.oneOf(['left', 'right']),
  labelType: PropTypes.oneOf(['currencyColored']), // May be extended in the future like 'currencyColored' | 'otherTypeOfLabel'
  labelText: PropTypes.string,
}

LabeledItem.defaultProps = {
  labelAlign: 'top',
  labelTextAlign: 'left',
}

export default LabeledItem
