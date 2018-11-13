import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import styles from './style'
import DefaultImageBackground from '../../../src/common/ImageBackground'

export default ScreenWrapper = ({ children }) => {
  return (
    <DefaultImageBackground>
      <View style={styles.main}>{children}</View>
    </DefaultImageBackground>
  )
}

ScreenWrapper.defaultProps = {
  children: null,
}

ScreenWrapper.propTypes = {
  children: PropTypes.node,
}
