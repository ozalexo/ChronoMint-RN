/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

//#region imports

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import styles from './WalletTabSelectorStyles'


class WalletTabSelector extends PureComponent {

  state = {
    activeTab: this.props.initialTab || 'transactions',
  }

  render () {
    const { activeTab } = this.state
    return (
      <View style={styles.tabsContainer}>
        {activeTab}
      </View>
    )
  }
}

WalletTabSelector.propTypes = {
  initialTab: PropTypes.oneOf(['transactions', 'tokens', 'owners', 'templates']),
}

export default WalletTabSelector
