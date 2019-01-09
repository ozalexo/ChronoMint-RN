/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */


import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logoutThunk } from '@chronobank/session/redux/thunks'
import DrawerMainMenu from './DrawerMainMenu'

/* eslint-disable no-unused-vars */
const mapStateToProps = (ownState, ownProps) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  logoutThunk,
}, dispatch)

class DrawerMainMenuContainer extends React.PureComponent {

  handleLogout = () => {
    const { logoutThunk, navigation } = this.props
    logoutThunk()
      .then(() => {
        navigation.navigate('Start')
      })
  }

  render () {
    return (
      <DrawerMainMenu
        onLogout={this.handleLogout}
      />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerMainMenuContainer)
