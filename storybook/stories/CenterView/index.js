import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import style from './style'
import DefaultImageBackground from './common/DefaultImageBackground'

export default function CenterView ({ children }) {
  return (
    <DefaultImageBackground>
      <View style={style.main}>{children}</View>
    </DefaultImageBackground>
  )
}

CenterView.defaultProps = {
  children: null,
}

CenterView.propTypes = {
  children: PropTypes.node,
}
