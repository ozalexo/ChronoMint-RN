/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React from 'react'
import { Provider } from 'react-redux'
import configureStore from '../../src/store/configureStore'

const {store} = configureStore()

const StoryProvider = ({ story }) => {
  return (
    <Provider store={store}>
      {story}
    </Provider>
  )
}

export default StoryProvider
