/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'


class WalletTabSelector extends PureComponent {

  state = {
    activeTab: this.props.initialTab || 'transactions',
  }

  render () {
    const { activeTab } = this.state
    return (
      <View>
        {activeTab}
      </View>
    )
  }
}

WalletTabSelector.propTypes = {
  initialTab: PropTypes.oneOf(['transactions', 'tokens', 'owners', 'templates']),
}

export default WalletTabSelector
