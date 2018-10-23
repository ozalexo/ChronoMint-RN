/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import {
  StyleSheet,
} from 'react-native'
import colors from '../../utils/colors'

const styles = StyleSheet.create({
  advancedFee: {
    color: '#786AB7',
    fontSize: 16,
    fontWeight: '600',
    margin: 20,
    marginBottom: 30,
  },
  formBody: {
    backgroundColor: colors.background,
    flexGrow: 1,
    paddingTop: 30,
  },
  formHeader: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  scanQR: {
    color: '#786AB7',
    fontSize: 16,
    fontWeight: '600',
    margin: 20,
    textAlign: 'center',
  },
  scrollView: {
    flexGrow: 1,
  },
  sendBalance: {
    color: '#7F7F7F',
    fontSize: 12,
    fontWeight: '200',
    marginBottom: 30,
    marginLeft: 20,
  },
  separatorDark: {
    backgroundColor: '#424066',
  },
  separatorLight: {
    backgroundColor: '#707070',
  },
  textInput: {
    borderBottomColor: '#C7C7CC',
    borderBottomWidth: StyleSheet.hairlineWidth,
    fontSize: 16,
    fontWeight: '200',
    marginLeft: 20,
    marginVertical: 8,
    paddingVertical: 8,
  },
  tokenImage: {
    alignSelf: 'flex-end',
    height: 64,
    position: 'absolute',
    right: 20,
    top: -32,
    width: 64,
  },
  tokenSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  tokenSelectorLabel: {
    color: colors.background,
    fontSize: 17,
    fontWeight: '700',
  },
  walletAddress: {
    color: '#A3A3CC',
    marginBottom: 30,
    marginHorizontal: 20,
  },
  walletBalance: {
    color: '#A3A3CC',
    fontSize: 16,
    marginHorizontal: 20,
    marginTop: 4,
  },
  walletTitle: {
    color: colors.background,
    fontSize: 16,
    fontWeight: '700',
    marginHorizontal: 20,
    marginTop: 30,
  },
  walletValue: {
    color: colors.background,
    fontSize: 22,
    fontWeight: '700',
    marginHorizontal: 20,
    marginTop: 30,
  },
})

export default styles
