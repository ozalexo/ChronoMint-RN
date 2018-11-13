/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import I18n from 'react-native-i18n'
// import { sectionsSelector } from '../redux/mainWallet/selectors'
import {
  burger,
  plus,
} from '../../../images'
import WalletList from './WalletList'

const sectionsSelector = () => { }
const sections = [
  {
    data: [
      {
        address: '0xf1106d1eb597ef2f14c8f5343c1b4203fa0f2e9b',
        blockchain: 'ETH',
      },
      {
        address: '0xf1106d1eb5975555555555343c1b4203fa0f2e9b',
        blockchain: 'ETH',
      }
    ],
    title: 'ETH',
  },
  {
    data: [
      {
        address: '0xf1106d1eb597ef2f14c8f5343c1b4203fa0f2e9b',
        blockchain: 'BTC',
      },
      {
        address: '0xf1106d1eb597ef2f14c8f5343c1b4203fa0f2e9b',
        blockchain: 'BTC',
      }
    ],
    title: 'BTC',
  },
]

class WalletListContainer extends PureComponent {
  static navigatorButtons = {
    leftButtons: [
      {
        id: 'drawer',
        icon: burger,
      }
    ],
    rightButtons: [
      {
        id: 'addWallet',
        icon: plus,
      }
    ]
  }

  constructor(props) {
    super(props)
    // this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
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

  onNavigatorEvent = ({ type, id }) => {
    if (type === 'NavBarButtonPress' && id === 'drawer') {
      // this.props.navigator.toggleDrawer({ side: 'left' })
    }
    if (type === 'NavBarButtonPress' && id === 'addWallet') {
      // this.props.navigator.push({
      //   screen: 'AddWallet',
      //   title: I18n.t('AddWallet.title')
      // })
    }
  }

  render () {
    return (
      <WalletList
        isRefreshing={this.state.isRefreshing}
        navigator={this.props.navigator}
        onRefresh={this.handleRefresh}
        sections={this.props.sections}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  sections
  // sections: sectionsSelector(state)
})

WalletListContainer.propTypes = {
  isRefreshing: PropTypes.bool,
  onRefresh: PropTypes.func,
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      data: PropTypes.arrayOf(
        PropTypes.shape({
          address: PropTypes.string,
          blockchain: PropTypes.string,
        })
      ),
      title: PropTypes.string,
    })
  ),
}


export default connect(mapStateToProps, null)(WalletListContainer)
