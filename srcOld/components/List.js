/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */
import React from 'react'
import { FlatList, SectionList, View, Text, StyleSheet } from 'react-native'
import ListItem from './ListItem'
import colors from '../utils/colors'

type Props = {
  isDark?: boolean,
}

const SectionHeader = ({ title }) => (
  <View style={styles.sectionHeader}>
    <Text>
      {title}
    </Text>
  </View>
)

export default class List extends React.Component<Props, {}> {
  renderItem = ({ item }) => (
    <ListItem
      {...item}
      title={item.key}
      isDark={this.props.isDark}
    />
  )
  renderSectionHeader = ({ section }) => {
    return section.hasOwnProperty('title') ? (
      <SectionHeader title={section.title} />
    ) : null
  }

  render () {
    const { isDark } = this.props

    return this.props.sections ? (
      <SectionList
        style={isDark ? styles.listDark : styles.list}
        sections={this.props.sections}
        renderItem={this.renderItem}
        renderSectionHeader={this.renderSectionHeader}
      />
    ) : (
      <FlatList
        style={isDark ? styles.listDark : styles.list}
        data={this.props.data}
        renderItem={this.renderItem}
        renderSectionHeader={this.renderSectionHeader}
      />
    )
  }
}

const styles = StyleSheet.create({
  sectionHeader: {
    backgroundColor: colors.background,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: colors.backgroundDark,
    borderBottomWidth: 1,
    borderBottomColor: colors.backgroundDark
  },
  list: {
    backgroundColor: colors.backgroundLight,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.backgroundDark
  }
})
