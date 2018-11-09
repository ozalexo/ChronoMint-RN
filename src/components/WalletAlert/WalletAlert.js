/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import Separator from '../Separator'
import styles from './WalletAlertStyles'


export default class WalletAlert extends PureComponent {
  renderActionButton = (item, index, actions) => ([
    <WalletAlertAction {...item} key={item.id} />,
    (index < actions.length - 1) && <Separator key={index} />,
  ])

  render () {
    const { actions, title, children, style, contentContainerStyle } = this.props

    return (
      <View style={[styles.container, style]}>
        <Text style={styles.title}>
          {title}
        </Text>
        <Separator />
        <View style={[styles.content, contentContainerStyle]}>
          {children}
        </View>
        <Separator />
        <View style={styles.actions}>
          {actions && actions.map(this.renderActionButton)}
        </View>
      </View>
    )
  }
}

WalletAlert.propTypes = {
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      isMain: PropTypes.bool,
      title: PropTypes.string,
      onPress: PropTypes.func,
    })
  ),
  title: PropTypes.string,
}

class WalletAlertAction extends PureComponent {
  render () {
    const {
      title,
      onPress,
      isMain,
    } = this.props

    return (
      <TouchableOpacity
        style={styles.action}
        onPress={onPress || (() => { })}
      >
        <Text style={[styles.actionTitle, (isMain && styles.actionTitleMain)]}>
          {title}
        </Text>
      </TouchableOpacity>
    )
  }
}

WalletAlertAction.propTypes = {
  isMain: PropTypes.bool,
  title: PropTypes.string,
  onPress: PropTypes.func,
}
