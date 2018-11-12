/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React from 'react'
import { Provider } from 'react-redux'
import store from '../../src/store/createStore'

const StoryProvider = ({ story }) => {
  return (
    <Provider store={store}>
      {story}
    </Provider>
  )
}

export default StoryProvider
