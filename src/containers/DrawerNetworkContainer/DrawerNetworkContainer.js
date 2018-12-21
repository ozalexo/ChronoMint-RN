/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { connect } from 'react-redux'
import { getAvailableNetworkList } from '@chronobank/network/redux/selectors'
import { getNetworkStatusList } from '@chronobank/ethereum/middleware/selectors' 
import { networkSelect } from '@chronobank/network/redux/thunks'
import DrawerNetwork from '../../components/DrawerNetwork'

const mapStateToProps = (ownState) => {
  const networks = getAvailableNetworkList(ownState)
  const networkStates = getNetworkStatusList(ownState)

  networks.forEach((item, index) => {
    networks[index].status = networkStates[index]
  })

  return {
    networks,
    networkStates,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSelectNetwork: (networkIndex) => () => dispatch(networkSelect(networkIndex)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerNetwork)
