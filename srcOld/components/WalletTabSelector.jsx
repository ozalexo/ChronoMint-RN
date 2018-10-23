/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

//#region imports

import React, { PureComponent }  from 'react'

//#endregion

//#region types

export type TTab = 'transactions' | 'tokens' | 'owners' | 'templates'

export type TWalletTabSelectorProps = {
  initialTab?: TTab,
}

type TWalletTabSelectorState = {
  activeTab: TTab,
}

//#endregion

class WalletTabSelector extends PureComponent<TWalletTabSelectorProps, TWalletTabSelectorState> {

  state = {
    activeTab: this.props.initialTab || 'transactions'
  }

  render () {
    return (
      <View style={styles.tabsContainer}>
      </View>
    )
  }

}

export default WalletTabSelector
