import React from 'react'
import { View } from 'react-native'
import styles from './styles'

export default StoryWrapper = ({ children }) => {
  return (
    <View style={styles.wrapper}>
      {children}
    </View>
  )
}
