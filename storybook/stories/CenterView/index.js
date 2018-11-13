import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import styles from './style'
import DefaultImageBackground from '../../../src/common/ImageBackground'

const CenterView = ({ children }) => {
  return (
    <DefaultImageBackground>
      <View style={styles.main}>{children}</View>
    </DefaultImageBackground>
  )
}

CenterView.defaultProps = {
  children: null,
}

CenterView.propTypes = {
  children: PropTypes.node,
}

export default CenterView
