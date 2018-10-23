/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { DUCK_NETWORK } from '@chronobank/login/redux/network/actions'
import networkService from '@chronobank/login/network/NetworkService'
import SelectNetwork, { type TNetwork } from '../screens/SelectNetwork'

type TSelectNetworkContainerProps = {
  navigator: any,
  networks: TNetwork[],
}

class SelectNetworkContainer extends PureComponent<TSelectNetworkContainerProps, {}> {
  handleSelectNetwork = (id: TNetwork) => () => {
    networkService.selectNetwork(id)

    this.props.navigator.toggleDrawer({
      side: 'left',
      to: 'closed'
    })
  }

  render () {
    return (<SelectNetwork
      networks={this.props.networks}
      onSelectNetwork={this.handleSelectNetwork}
    />)
  }
}

const mapStateToProps = (state) => {
  const network = state.get(DUCK_NETWORK) || {}

  return {
    networks: network.networks
  }
}

export default connect(mapStateToProps)(SelectNetworkContainer)
