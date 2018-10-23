/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */
import * as React from 'react'

const screenLayout = (Layout) => (ScreenContent) => {
  if (!Layout) {
    throw new Error('No wrapper set for scene')
  }

  const ScreenWrapper = (props) => (
    <Layout screenOptions={ScreenContent.screenOptions || {}} navigator={props.navigator} >
      <ScreenContent {...props} />
    </Layout>
  )

  ScreenWrapper.navigatorStyle = {
    ...(Layout.navigatorStyle || {}),
    ...(ScreenContent.navigatorStyle || {})
  }

  ScreenWrapper.navigatorButtons = ScreenContent.navigatorButtons || Layout.navigatorButtons

  return ScreenWrapper
}

export default screenLayout
