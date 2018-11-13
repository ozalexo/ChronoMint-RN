/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Start from './Start'

const mapStateToProps = (ownState, ownProps) => {
  return {
    accounts: null,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

class StartContainer extends PureComponent {

  handleSubmit = (values) => {
    
  }

  generateProps = () => ({
    handleSubmit: this.handleSubmit,
  })

  render () {
    const props = this.generateProps()

    return (
      <Start {...props}/>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StartContainer)
