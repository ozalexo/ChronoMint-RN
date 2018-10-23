/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native'
import Separator from '../components/Separator'

export type TLanguage = {
  locale: string,
  name: string,
}

type TSelectLanguageProps = {
  onSelectLanguage: (language: TLanguage) => () => void,
  languages: TLanguage[],
}

type TLanguageItemProps = TLanguage & {
  onPress: () => void,
}

export default class SelectLanguage extends PureComponent<TSelectLanguageProps, {}> {
  keyExtractor = ({ locale }: TLanguage) => locale

  renderNetworkItem = ({ item }: { item: TLanguage }) => (
    <LanguageItem
      {...item}
      onPress={this.props.onSelectLanguage(item)}
    />
  )

  render () {
    const {
      languages,
    } = this.props

    return (
      <View style={styles.screenView}>
        <Text style={styles.title}>
          Available languages
        </Text>
        <FlatList
          data={languages}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderNetworkItem}
          ItemSeparatorComponent={Separator}
          ListHeaderComponent={Separator}
          ListFooterComponent={Separator}
        />
      </View>
    )
  }
}

class LanguageItem extends PureComponent<TLanguageItemProps, {}> {
  render () {
    const {
      name,
      onPress,
    } = this.props

    return (
      <TouchableOpacity
        onPress={onPress}
        style={styles.item}
      >
        <Text style={styles.itemName}>
          {name}
        </Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  screenView: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  title: {
    margin: 20,
    fontSize: 22,
    fontWeight: '700',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  itemName: {
    flex: 1,
    marginHorizontal: 10,
  },
})
