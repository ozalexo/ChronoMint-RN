import * as React from 'react'
import { View } from 'react-native'
import styles from './SeparatorStyles'

const Separator = ({ style }) => <View style={[ styles.separator, style ]} />

export default Separator;
