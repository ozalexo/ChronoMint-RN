/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import colors from '../utils/colors'
import Separator from './Separator'

type WalletAlertProps = {
  actions: WalletAlertActionProps[],
  children?: any,
  contentContainerStyle: any,
  style: any,
  title: string,
}

type WalletAlertActionProps = {
  isMain?: boolean,
  title: string,
  onPress?: () => void,
}

export default class WalletAlert extends PureComponent<WalletAlertProps> {
  renderActionButton = (item, index, actions) => ([
    <WalletAlertAction {...item} key={item.id} />,
    (index < actions.length - 1) && <Separator key={index} />
  ])

  render () {
    const { actions, title, children, style, contentContainerStyle } = this.props

    return (
      <View style={[ styles.container, style ]}>
        <Text style={styles.title}>
          {title}
        </Text>
        <Separator />
        <View style={[ styles.content, contentContainerStyle ]}>
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

class WalletAlertAction extends PureComponent<WalletAlertActionProps> {
  render () {
    const {
      title,
      onPress,
      isMain
    } = this.props

    return (
      <TouchableOpacity
        style={styles.action}
        onPress={onPress || (() => {})}
      >
        <Text style={[ styles.actionTitle, (isMain && styles.actionTitleMain) ]}>
          {title}
        </Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  action: {
    flex: 1,
    justifyContent: 'center',
    padding: 16
  },
  actions: {
    flexDirection: 'row'
  },
  actionTitle: {
    color: colors.primaryLight,
    fontSize: 16,
    fontWeight: '200',
    textAlign: 'center'
  },
  actionTitleMain: {
    fontWeight: '700'
  },
  container: {
    backgroundColor: colors.background,
    borderRadius: 3
  },
  content: {
    padding: 24,
    paddingBottom: 16
  },
  title: {
    paddingHorizontal: 24,
    paddingVertical: 8
  }
})
