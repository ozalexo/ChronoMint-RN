/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { getSections } from '@chronobank/ethereum/redux/selectors'
import PropTypes from 'prop-types'
import WalletList from './WalletList'

class WalletListContainer extends PureComponent {

  render () {
    const { navigation, sections} = this.props
    return (
      <WalletList
        navigate={navigation.navigate}
        sections={sections}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  sections: getSections(state),
})

WalletListContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
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
