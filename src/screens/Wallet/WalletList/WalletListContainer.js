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
import testData from './testData'
import WalletList from './WalletList'

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
  sections: testData.sections
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
