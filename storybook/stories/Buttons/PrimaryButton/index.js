import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'react-native'
import colors from '../../../../src/common/colors'
import PrimaryButton from '../../../../src/components/PrimaryButton'

const Button = ({ onPress, label }) => {
  return (
    <React.Fragment>
      <Text style={{color: colors.textOnPurple}}>
        Default PrimaryButton:
      </Text>
      <PrimaryButton
        onPress={onPress}
        label={label}
      />
      <Text style={{color: colors.textOnPurple}}>
        {`\nPrimaryButton with UPPERCASE:`}
      </Text>
      <PrimaryButton
        onPress={onPress}
        label={label}
        upperCase
      />
    </React.Fragment>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  onPress: PropTypes.func,
  label: PropTypes.string,
}

export default Button
