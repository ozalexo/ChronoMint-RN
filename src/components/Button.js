/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */
import React from 'react'
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native'
import Icon from './Icon'
import colors from '../utils/colors'

type IconPosition = 'left' | 'right' | 'top' | 'bottom'

type LeftSectionProps = {
  icon?: number,
  iconPosition?: IconPosition
}

const LeftSection = (props: LeftSectionProps) => {
  const { icon, iconPosition } = props

  if (!icon) {
    return null
  }

  if (iconPosition && iconPosition !== 'left') {
    return null
  }

  return (
    <View style={styles.leftSection}>
      <Icon source={icon} />
    </View>
  )
}

type LabelProps = {
  label?: string,
  isDark?: boolean
}

const Label = (props: LabelProps) => {
  const { label, isDark } = props

  if (!label) {
    return null
  }

  return (
    <Text style={isDark ? styles.labelDark : styles.label}>
      {label}
    </Text>
  )
}

type ButtonProps = {
  label?: string,
  icon?: number,
  isDark?: boolean,
  isDisabled?: boolean,
  onPress?: (event: MouseEvent) => void,
  style?: {} | number,
  iconPosition?: IconPosition
}

class Button extends React.Component<ButtonProps, {}> {
  handlePress = (event: MouseEvent) => {
    const { isDisabled, onPress } = this.props

    if (isDisabled) {
      return
    }

    onPress && onPress(event)
  }

  render () {
    const { style, icon, iconPosition, label, isDark, isDisabled } = this.props

    return (
      <TouchableOpacity
        style={[
          styles.container,
          (isDisabled && styles.containerDisabled),
          style
        ]}
        activeOpacity={isDisabled ? 1 : 0.2}
        onPress={this.handlePress}
      >
        <LeftSection icon={icon} iconPosition={iconPosition} />
        <Label label={label} isDark={isDark} />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 8,
    borderRadius: 10,
    backgroundColor: colors.blue,
    paddingVertical: 8,
    paddingHorizontal: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerDisabled: {
    backgroundColor: colors.blueDark
  },
  leftSection: {
    marginRight: 8
  },
  label: {
    color: colors.foreground,
    height: 24
  },
  labelDark: {
    color: colors.backgroundLight,
    height: 24
  }
})

export default Button
