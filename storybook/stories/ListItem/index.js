import React from 'react'
import PropTypes from 'prop-types'
import ListItem from '../../../src/components/ListItem'

export default function StoryListItem ({ icon, value, hasArrow, title, isDark, onPress }) {
  return (
    <ListItem
      icon={icon}
      value={value}
      hasArrow={hasArrow}
      title={title}
      isDark={isDark}
      onPress={onPress}
    />
  )
}
StoryListItem.propTypes = {
  icon: PropTypes.number,
  value: PropTypes.string,
  hasArrow: PropTypes.bool,
  title: PropTypes.string,
  isDark: PropTypes.bool,
  onPress: PropTypes.func,
}
