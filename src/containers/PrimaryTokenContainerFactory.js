/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import { connect } from 'react-redux'
import {
  primaryTokenAmount
} from '../redux/mainWallet/selectors'

// incoming props
export type TPrimaryTokenFactoryProps = {
  blockchain: string,
}

// outgoing props
export type TPrimaryTokenProps = {
  amount: ?number,
  symbol: string,
}

const makeMapStateToProps = (origState, origProps) => {
  const getPrimaryTokenAmount = primaryTokenAmount(origProps.blockchain)
  const mapStateToProps = (state) => {
    const primaryToken = getPrimaryTokenAmount(state)
    return {
      ...primaryToken
    }
  }
  return mapStateToProps
}

export default connect(makeMapStateToProps, null)
