/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */


import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { logoutThunk } from '@chronobank/session/redux/thunks'
import DrawerMainMenu from './DrawerMainMenu'

const mapDispatchToProps = (dispatch) => bindActionCreators({
  logoutThunk,
}, dispatch)

class DrawerMainMenuContainer extends React.PureComponent {
  static propTypes = {
    logoutThunk: PropTypes.func,
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }),
  }

  handleLogout = () => {
    const { logoutThunk, navigation } = this.props
    logoutThunk()
      .then(() => {
        navigation.navigate('Start')
      })
      .catch(() => {
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

export default connect(null, mapDispatchToProps)(DrawerMainMenuContainer)
