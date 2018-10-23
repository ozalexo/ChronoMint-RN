/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */
import * as React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'
import I18n from 'react-native-i18n'
import colors from '../utils/colors'

type CautionTextProps = {
  text: string
}

const CautionItem = ({ text }: CautionTextProps) => (
  <View style={styles.item}>
    <Text style={styles.bullet}>•</Text>
    <Text style={styles.text}>{text}</Text>
  </View>
)

const Cautions = () => (
  <View style={styles.container}>
    <Image
      style={styles.image}
      source={require('../images/alert.png')}
    />
    <View style={styles.list}>
      <CautionItem text={I18n.t('Cautions.keepitSafe')} />
      <CautionItem text={I18n.t('Cautions.makeBackup')} />
      <CautionItem text={I18n.t('Cautions.dontShare')} />
      <CautionItem text={I18n.t('Cautions.dontLose')} />
    </View>
  </View>
)

export default Cautions

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row'
  },
  bullet: {
    color: colors.orange,
    paddingRight: 16
  },
  container: {
    flexDirection: 'row',
    marginHorizontal: 16
  },
  list: {
    flex: 1,
    marginRight: 24
  },
  image: {
    marginTop: 4,
    marginRight: 24
  },
  text: {
    color: colors.backgroundLight,
    fontSize: 16
  }
})
