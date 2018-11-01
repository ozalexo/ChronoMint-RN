import * as React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import styles from './SeparatorStyles'

const Separator = ({ style }) => <View style={[ styles.separator, style ]} />

Separator.propTypes ={
    style: PropTypes.object,
}

export default Separator;
