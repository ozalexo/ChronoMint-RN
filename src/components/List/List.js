/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React from 'react'
import { FlatList, SectionList, View, Text } from 'react-native'
import PropTypes from 'prop-types'
import ListItem from '../ListItem'
import styles from './ListStyles'

const SectionHeader = ({ title }) => (
  <View style={styles.sectionHeader}>
    <Text>
      {title}
    </Text>
  </View>
)

class List extends React.Component {
  renderItem = ({ item }) => (
    <ListItem
      {...item}
      title={item.key}
      isDark={this.props.isDark}
    />
  )
  renderSectionHeader = ({ section }) => {
    return section.hasOwnProperty('title')
      ? <SectionHeader title={section.title} />
      : null
  }

  render () {
    const { isDark, sections, data } = this.props

    return sections
      ? <SectionList
        style={isDark ? styles.listDark : styles.list}
        sections={this.props.sections}
        renderItem={this.renderItem}
        renderSectionHeader={this.renderSectionHeader}
      />
      : <FlatList
        style={isDark ? styles.listDark : styles.list}
        data={data}
        renderItem={this.renderItem}
        renderSectionHeader={this.renderSectionHeader}
      />
  }
}

List.propTypes = {
  isDark: PropTypes.bool,
}

export default List
