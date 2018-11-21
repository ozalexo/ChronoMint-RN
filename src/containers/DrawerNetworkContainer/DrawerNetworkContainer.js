/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { connect } from 'react-redux'
import { getAvailableNetworkList } from '@chronobank/network/redux/selectors'
import {networkSelect } from '@chronobank/network/redux/thunks'
import DrawerNetwork from '../../components/DrawerNetwork'

const mapStateToProps = (ownState) => {
  return {
    networks: getAvailableNetworkList(ownState),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSelectNetwork: (networkIndex) => () => dispatch(networkSelect(networkIndex)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerNetwork)
