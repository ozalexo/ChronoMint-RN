/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import {
  Image,
} from 'react-native'
import PropTypes from 'prop-types'
import {
  sending_0_circle_small,
  sending_25_circle_small,
  sending_50_circle_small,
  sending_75_circle_small,
  sending_100_circle_small,
  receiving_0_circle_small,
  receiving_25_circle_small,
  receiving_50_circle_small,
  receiving_75_circle_small,
  receiving_100_circle_small,
  sending_0_circle_big,
  sending_25_circle_big,
  sending_50_circle_big,
  sending_75_circle_big,
  sending_100_circle_big,
  receiving_0_circle_big,
  receiving_25_circle_big,
  receiving_50_circle_big,
  receiving_75_circle_big,
  receiving_100_circle_big,
} from '../../images'

const transIcons = {
  sending: [
    sending_0_circle_small,
    sending_25_circle_small,
    sending_50_circle_small,
    sending_75_circle_small,
    sending_100_circle_small,
  ],
  receiving: [
    receiving_0_circle_small,
    receiving_25_circle_small,
    receiving_50_circle_small,
    receiving_75_circle_small,
    receiving_100_circle_small,
  ],
}

const transBigIcons = {
  sending: [
    sending_0_circle_big,
    sending_25_circle_big,
    sending_50_circle_big,
    sending_75_circle_big,
    sending_100_circle_big,
  ],
  receiving: [
    receiving_0_circle_big,
    receiving_25_circle_big,
    receiving_50_circle_big,
    receiving_75_circle_big,
    receiving_100_circle_big,
  ],
}

class TransactionIcon extends PureComponent {

  static getTIcon = (type, confirmations, mode = 'small') => {

    const iconsSet = mode === 'big' ? transBigIcons : transIcons

    if (confirmations >= 4) {
      return iconsSet[type][4]
    } else {
      return iconsSet[type][confirmations]
    }
  }

  render () {
    const { type, confirmations, mode } = this.props
    return (
      <Image
        source={TransactionIcon.getTIcon(type, confirmations, mode)}
      />
    )
  }
}

TransactionIcon.propTypes = {
  confirmations: PropTypes.number,
  type: PropTypes.oneOf(['receiving', 'sending']),
  mode: PropTypes.oneOf(['big', 'small']),
}

export default TransactionIcon
