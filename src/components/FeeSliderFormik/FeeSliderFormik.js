/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import * as React from 'react'
import {
  Slider,
  View,
  Platform,
} from 'react-native'
import PropTypes from 'prop-types'
import styles from './FeeSliderFormikStyles'
import colors from '../../common/colors'

export default class FeeSliderFormik extends React.PureComponent {
  static propTypes = {
    // Parameters
    maximumValue: PropTypes.number,
    minimumValue: PropTypes.number,
    step: PropTypes.number,
    value: PropTypes.number,
    // Methods
    handleFeeMultiplierChange: PropTypes.func,
  }

  handleChange = (value) => {
    this.props.handleFeeMultiplierChange(value.toFixed(1))
  }

  render () {
    const thumbColor = Platform.OS === 'ios'
      ? colors.white
      : colors.lightpurple

    return (
      <View style={styles.feeSliderContainer}>
        <Slider
          maximumValue={this.props.maximumValue}
          minimumTrackTintColor={colors.lightpurple}
          minimumValue={this.props.minimumValue}
          step={this.props.step}
          thumbTintColor={thumbColor}
          value={this.props.value}
          onSlidingComplete={this.handleChange}
        />
      </View>
    )
  }
}
