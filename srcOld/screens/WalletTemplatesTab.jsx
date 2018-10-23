/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import { FlatList, View, Image, Text, StyleSheet } from 'react-native'
import colors from '../utils/colors'

export type TTemplate = {
  address: string,
  id: string,
  image: any,
  symbol: string,
  title: string,
  value: number,
}

type TWalletTemplatesProps = {
  onSelectTemplate: (template: TTemplate) => () => void,
  templates: Array<TTemplate>,
}

type TTemplateProps = TTemplate & {
  onSelectTemplate: () => void,
}

export default class WalletTemplates extends PureComponent<TWalletTemplatesProps, {}> {
  keyExtractor = ({ id }: TTemplate) => id

  renderItem = ({ item }: { item: TTemplate}) =>
    (<Template
      {...item}
      onSelectTemplate={this.props.onSelectTemplate(item)}
    />)

  render () {
    const {
      templates,
    } = this.props
    
    return (
      <FlatList
        data={templates}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
        style={styles.list}
      />
    )
  }
}

class Template extends PureComponent<TTemplateProps, {}> {
  render () {
    const {
      address,
      image,
      symbol,
      title,
      value,
    } = this.props

    return (
      <View style={styles.token}>
        { image && (
          <Image
            source={image}
            style={styles.image}
          />
        ) }
        <View style={styles.content}>
          <Text style={styles.title}>
            { title }
          </Text>
          <Text
            ellipsizeMode='middle'
            numberOfLines={1}
            style={styles.address}
          >
            { address }
          </Text>
        </View>
        <Text style={styles.value}>
          <Text>
            { symbol }
          </Text>
          &nbsp;
          <Text>
            { value }
          </Text>
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  address: {
    color: '#7F7F7F',
    fontWeight: '200',
  },
  content: {
    flex: 1,
    margin: 8,
  },
  image: {
    height: 32,
    margin: 8,
    width: 32,
  },
  list: {
    flexGrow: 1,
    paddingVertical: 16,
  },
  title: {
    fontWeight: '200',
  },
  token: {
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 3,
    flexDirection: 'row',
    margin: 8,
    padding: 8,
  },
  value: {
    fontWeight: '200',
    margin: 8,
  },
})
