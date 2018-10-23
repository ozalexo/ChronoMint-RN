/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */
export default {
  usd: 'USD',
  eth: 'ETH',
  btc: 'BTC',
  or: 'or',
  copyright: 'Copyright ©2018 LaborX Australia Pty Ltd. All Rights Reserved.',
  'Tokens': {
    'one': ', + 1 Token',
    'other': ', + {{formatted_number}} Tokens'
  },
  'TokensCounter': {
    'one': '1 Token',
    'other': '{{formatted_number}} Tokens'
  },
  WalletsList: {
    title: 'My wallets'
  },
  ChangeLanguage: {
    language: 'Language'
  },
  EnterMnemonic: {
    title: 'Mnemonic key',
    subtitle: 'Enter mnemonic key:',
    mnemonic: 'Mnemonic key',
    saveOnDevice: 'Save wallet on device',
    login: 'Log in',
    generateMnemonic: 'Generate mnemonic key'
  },
  EnterPinCode: {
    title: 'Login',
    subtitle: 'Enter pin code or press fingerprint button to scan'
  },
  EnterPrivateKey: {
    title: 'Private key',
    subtitle: 'Enter private key:',
    private: 'Private key',
    saveOnDevice: 'Save wallet on device',
    login: 'Log in'
  },
  EnterWalletPassword: {
    title: 'Upload wallet file',
    subtitle: 'Enter password for the wallet:',
    password: 'Password',
    saveOnDevice: 'Save wallet on device',
    login: 'Log in'
  },
  GenerateWalletFile: {
    title: 'Generate Wallet file',
    subtitle: 'Enter password for the new wallet:',
    password: 'Password',
    understand: 'I understand',
    downloadWallet: 'Download wallet'
  },
  SelectLoginOption: {
    login: 'Login',
    selectOptions: 'Select login options:',
    mnemonicKey: 'Mnemonic key',
    walletFile: 'Wallet file',
    privateKey: 'Private key',
    uPort: 'uPort'
  },
  LoginSettings: {
    network: 'Network',
    language: 'Language',
    faq: 'FAQ'
  },
  SelectNetwork: {
    title: 'Network',
    mainnet: 'Mainnet (production)',
    rinkeby: 'Rinkeby (test network)',
    kovan: 'Kovan (test network)',
    useLocalNode: 'Use local node'
  },
  PickWalletFile: {
    title: 'Wallet file',
    subtitle: 'Pick Wallet file. If you have not Wallet file, generate it:',
    pickWalletFile: 'Pick Wallet file',
    generateWalletFile: 'Generate new Wallet file'
  },
  FetchingIndicator: {
    'FETCHING': 'fetching status …',
    'SYNCING': 'syncing',
    'SYNCED': 'synced'
  },
  Cautions: {
    keepItSafe: 'Keep it safe!',
    makeBackup: 'Make a backup!',
    dontShare: 'Don\'t share it with anyone!',
    dontLose: 'Don\'t lose it! It cannot be recovered if you lose it.'
  },
  AddWallet: {
    title: 'Add a wallet',
    bitcoinWallet: 'Bitcoin wallet',
    litecoinWallet: 'Litecoint wallet',
    ethereumWallet: 'Ethereum wallet',
    nemWallet: 'NEM wallet'
  },
  Drawer: {
    wallets: 'Wallets',
    deposits: 'Deposits',
    exchange: 'Exchange',
    voting: 'Voting',
    bonuses: 'Bonuses',
    assets: 'My Assets',
    portfolio: 'Portfolio',
    mainAddress: 'Main address'
  },
  Wallet: {
    title: 'My shared wallet',
    signNewWalletOwner: 'Sign a new wallet owner\n{{address}}',
    revoke: 'Revoke',
    sign: 'Sign',
    send: 'Send',
    receive: 'Receive'
  },
  TransactionsList: {
    receiving: 'Receiving from',
    sending: 'Sending to'
  },
  SetAccountPassword: {
    password: 'Password',
    confirmPassword: 'Confirm password',
    createWallet: 'Create a wallet',
    or: 'or',
    useExistingWallet: 'Use an existing wallet',
    copyright: 'Copyright ©2018 LaborX Australia Pty Ltd. All Rights Reserved.',
    mismatchPasswords: 'Passwords do not match',
    invalidPassword: 'Password is not valid'
  },
  WalletBackup: {
    title: 'Wallet Back-up',
    subtitle: 'Get you wallet back up phrase and use it as a recovery option.',
    usePinProtection: 'Use PIN protection',
    backupWallet: 'Back-up my wallet',
    or: 'or',
    later: 'Backup later'
  },
  ConfirmMnemonic: {
    title: 'Confirm recovery phrase',
    done: 'Done',
    wrongMnemonicError: 'Wrong mnemonic. Try again'
  },
  GenerateMnemonic: {
    title: 'Write down recovery phrase',
    description: 'You can use the phrase shown below to restore or login to your wallet by using additional wallet\'s login options.',
    warningTitle: 'Important!\nRead the security guidelines',
    warningItem1Title: 'Don\'t share your mnemonic phrase with someone you don\'t trust.',
    warningItem1Content: 'Double check services you\'re giving your mnemonic to and don\'t share your phrase with anyone.',
    confirm: 'Confirm phrase',
    warnings: {
      '0': {
        title: 'Don\'t share your mnemonic phrase with someone you don\'t trust.',
        content: 'Double check services you\'re giving your mnemonic to and don\'t share your phrase with anyone.'
      },
      '1': {
        title: 'Don\'t loose your key.',
        content: 'We do not store this information and Your account will be lost together with all your funds and history.'
      }
    }
  },
  EnterPin: {
    setupTitle: 'Setup PIN',
    confirmTitle: 'Confirm PIN',
    pinsNotMatch: 'PINs did not match'
  },
  SelectAccount: {
    title: 'My addresses',
    importNew: 'Import new',
    or: 'or',
    createNew: 'Create a new wallet'
  },
  AccountPassword: {
    login: 'Log in',
    enterPassword: 'Enter password',
    recoverUsingMnemonic: 'Recover using mnemonic',
    or: 'common.or'
  },
  ImportAccount: {
    title: 'Import Address',
    mnemonic: 'Mnemonic',
    privateKey: 'Private key',
    walletFile: 'Wallet File'
  }
}
