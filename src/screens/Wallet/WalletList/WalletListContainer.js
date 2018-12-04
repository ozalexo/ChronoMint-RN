/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { getSections } from '@chronobank/ethereum/redux/selectors'
import PropTypes from 'prop-types'
import {
  burger,
  plus,
} from '../../../images'
import WalletList from './WalletList'

class WalletListContainer extends PureComponent {
  static navigatorButtons = {
    leftButtons: [
      {
        id: 'drawer',
        icon: burger,
      },
    ],
    rightButtons: [
      {
        id: 'addWallet',
        icon: plus,
      },
    ],
  }

  constructor (props) {
    super(props)
  }

  state = {
    isRefreshing: false,
  }

  handleRefresh = () => {
    this.setState({
      isRefreshing: true,
    })

    setTimeout(() => this.setState({ isRefreshing: false }), 1000)
  }

  onNavigatorEvent = ({ type, id }) => {
    const { navigate } = this.props.navigation
    if (type === 'NavBarButtonPress' && id === 'drawer') {
      // this.props.navigator.toggleDrawer({ side: 'left' })
    }
    if (type === 'NavBarButtonPress' && id === 'addWallet') {
      navigate('AddWallet')
    }
  }

  render () {
    const { navigation, sections} = this.props
    return (
      <WalletList
        isRefreshing={this.state.isRefreshing}
        navigate={navigation.navigate}
        onRefresh={this.handleRefresh}
        sections={sections}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  sections: getSections(state),
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
