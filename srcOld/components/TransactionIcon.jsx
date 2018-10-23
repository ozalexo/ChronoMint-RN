/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import {
  Image,
} from 'react-native'

const transIcons = {
  'sending': [
    require('../images/sending-0-circle-small.png'),
    require('../images/sending-25-circle-small.png'),
    require('../images/sending-50-circle-small.png'),
    require('../images/sending-75-circle-small.png'),
    require('../images/sending-100-circle-small.png'),
  ],
  'receiving': [
    require('../images/receiving-0-circle-small.png'),
    require('../images/receiving-25-circle-small.png'),
    require('../images/receiving-50-circle-small.png'),
    require('../images/receiving-75-circle-small.png'),
    require('../images/receiving-100-circle-small.png'),
  ],
}

const transBigIcons = {
  'sending': [
    require('../images/sending-0-circle-big.png'),
    require('../images/sending-25-circle-big.png'),
    require('../images/sending-50-circle-big.png'),
    require('../images/sending-75-circle-big.png'),
    require('../images/sending-100-circle-big.png'),
  ],
  'receiving': [
    require('../images/receiving-0-circle-big.png'),
    require('../images/receiving-25-circle-big.png'),
    require('../images/receiving-50-circle-big.png'),
    require('../images/receiving-75-circle-big.png'),
    require('../images/receiving-100-circle-big.png'),
  ],
}

export type TTransactionType = 'receiving' | 'sending'
export type TIconMode = 'big' | 'small'

export type TTransactionIconProps = {
  confirmations: number,
  type: TTransactionType,
  mode?: TIconMode
}

class TransactionIcon extends PureComponent<TTransactionIconProps> {

  static getTIcon = (type: TTransactionType, confirmations: number, mode?: TIconMode = 'small') => {

    const iconsSet = mode === 'big' ? transBigIcons : transIcons

    if (confirmations >= 4) {
      return iconsSet[type][4]
    } else {
      return iconsSet[type][confirmations]
    }
  }

  render () {
    return (
      <Image
        source={TransactionIcon.getTIcon(this.props.type, this.props.confirmations, this.props.mode)}
      />
    )
  }

}

export default TransactionIcon
