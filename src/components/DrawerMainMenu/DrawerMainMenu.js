/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import { SafeAreaView } from 'react-navigation'
import PropTypes from 'prop-types'
import TextButton from '../TextButton'
import styles from './DrawerMainMenuStyles'

class DrawerMainMenu extends PureComponent {
  static propTypes = {
    onLogout: PropTypes.func,
  }

  render () {
    const { onLogout } = this.props
    return (
      <SafeAreaView
        style={styles.container}
        forceInset={{
          top: 'always',
          horizontal: 'never',
        }}
      >
        <TextButton
          textStyle={styles.menuButton}
          label='Main Menu stub'
          onPress={() => {}}
        />
        <TextButton
          textStyle={styles.menuButton}
          label='Logout'
          onPress={onLogout}
        />
      </SafeAreaView>
    )
  }
}

export default DrawerMainMenu
