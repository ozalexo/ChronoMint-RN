/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import Mnemonic from 'bitcore-mnemonic-react-native'

// eslint-disable-next-line import/prefer-default-export
export const generateMnemonic = async () => {
  const mnemonicObject = new Mnemonic(Mnemonic.Words.ENGLISH)
  const phrase = await mnemonicObject.phrase
  return phrase
}
