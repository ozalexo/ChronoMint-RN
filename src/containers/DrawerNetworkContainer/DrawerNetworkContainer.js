/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { connect } from 'react-redux'
import { getAvailableNetworkList } from '@chronobank/network/redux/selectors'
import { networkSelect, rmqConnect, rmqDisconnect } from '@chronobank/network/redux/thunks'
import DrawerNetwork from '../../components/DrawerNetwork'
import {} from '@chronobank/network/middlewares/rabbitmq/actions'

const mapStateToProps = (ownState) => {
  return {
    networks: getAvailableNetworkList(ownState),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    rmqConnect: () => dispatch(rmqConnect()),
    rmqDisconnect: () => dispatch(rmqDisconnect()),
    onSelectNetwork: (networkIndex) => () => dispatch(networkSelect(networkIndex)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerNetwork)
