/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import { StyleSheet, View, Text } from 'react-native'

export default class TestScreen extends React.Component {

  static navigationOptions = {
    title: 'Lots of features here',
  };

  render () {
    return (
      <View style={styles.container}>
        <Text>
          Simple Test screen
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green'
  },
})
