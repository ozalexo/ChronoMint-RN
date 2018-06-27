/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import { connect } from 'react-redux'
import {
  tokensAndAmountsSelector
} from '../redux/mainWallet/selectors'

export type TTokenInfo = {
  [symbol: string]: number
}

export type TTokensListItem = {
  amount: ?number,
  symbol: string,
}

// incoming props
export type TTokensListFactoryProps = {
  blockchain: string,
}

// outgoing props
export type TTokensListProps = {
  list: TTokensListItem[],
}

const makeMapStateToProps = (origState, origProps) => {
  const getTokensAmountList = tokensAndAmountsSelector(origProps.blockchain)
  const mapStateToProps = (state) => {
    const list = getTokensAmountList(state)
    return {
      list
    }
  }
  return mapStateToProps
}

export default connect(makeMapStateToProps, null)
