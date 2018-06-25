/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import I18n from 'react-native-i18n'
import { sectionsSelector } from '../redux/mainWallet/selectors'
import WalletsList, {
  type TWalletsListProps
} from '../screens/WalletsList'

type TWalletsListContainerState = {
  isRefreshing: boolean,
}

class WalletsListContainer extends PureComponent<TWalletsListProps, TWalletsListContainerState> {
  static navigatorButtons = {
    leftButtons: [
      {
        id: 'drawer',
        icon: require('../images/burger.png'),
      },
        icon: require('images/burger.png')
      }
    ],
    rightButtons: [
      {
        id: 'addWallet',
        icon: require('images/plus.png')
      }
    ]
  }

  constructor (props) {
    super(props)
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
  }

  state = {
    isRefreshing: false
  }

  handleRefresh = () => {
    this.setState({
      isRefreshing: true
    })

    setTimeout(() => this.setState({ isRefreshing: false }), 1000)
  }

  onNavigatorEvent = ({ type, id }: { type: string, id: string }) => {
    if (type === 'NavBarButtonPress' && id === 'drawer') {
      this.props.navigator.toggleDrawer({ side: 'left' })
    }
    if (type === 'NavBarButtonPress' && id === 'addWallet') {
      this.props.navigator.push({
        screen: 'AddWallet',
        title: I18n.t('AddWallet.title')
      })
    }
  }

  render () {
    return (
      <WalletsList
        isRefreshing={this.state.isRefreshing}
        navigator={this.props.navigator}
        onRefresh={this.handleRefresh}
        sections={this.props.sections}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  sections: sectionsSelector(state)
})

export default connect(mapStateToProps, null)(WalletsListContainer)
