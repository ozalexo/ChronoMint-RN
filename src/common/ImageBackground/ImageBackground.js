/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React from 'react'
import {
  Image,
  View,
  ensureComponentIsNative,
} from 'react-native'

export default class ImageBackground extends React.Component {
  setNativeProps (props) {
    const viewRef = this.viewRef
    if (viewRef) {
      ensureComponentIsNative(viewRef)
      viewRef.setNativeProps(props)
    }
  }

  viewRef = null;

  captureRef = (ref) => {
    this.viewRef = ref
  }

  render () {
    const {children, style, imageStyle, imageRef, ...props} = this.props

    return (
      <View
        accessibilityIgnoresInvertColors
        style={style}
        ref={this.captureRef}>
        <Image
          {...props}
          style={[
            {
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              width: style.width,
            },
            imageStyle,
          ]}
          ref={imageRef}
        />
        {children}
      </View>
    )
  }
}
