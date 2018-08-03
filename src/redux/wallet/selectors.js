/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import {
  createSelector,
  createSelectorCreator,
  defaultMemoize,
} from 'reselect'

import { DUCK_MAIN_WALLET } from '@chronobank/core/redux/mainWallet/actions'
import { DUCK_MARKET } from '@chronobank/core/redux/market/actions'
import { DUCK_MULTISIG_WALLET } from '@chronobank/core/redux/multisigWallet/actions'
import { DUCK_TOKENS } from '@chronobank/core/redux/tokens/actions'
import { DUCK_WALLET, getCurrentWallet } from '@chronobank/core/redux/wallet/actions'

import Amount from '@chronobank/core/models/Amount'
import BalanceModel from '@chronobank/core/models/tokens/BalanceModel'
import BalancesCollection from '@chronobank/core/models/tokens/BalancesCollection'
import MainWalletModel from '@chronobank/core/models/wallet/MainWalletModel'
import MultisigEthWalletModel from '@chronobank/core/models/wallet/MultisigEthWalletModel'
import AddressesCollection from '@chronobank/core/models/wallet/AddressesCollection'
import AddressModel from '@chronobank/core/models/wallet/AddressModel'
import MultisigWalletCollection from '@chronobank/core/models/wallet/MultisigWalletCollection'
import TokenModel from '@chronobank/core/models/tokens/TokenModel'
import TokensCollection from '@chronobank/core/models/tokens/TokensCollection'
import TxModel from '@chronobank/core/models/TxModel'

import { BLOCKCHAIN_ETHEREUM } from '@chronobank/core/dao/EthereumDAO'
import {
  BLOCKCHAIN_BITCOIN_CASH,
  BLOCKCHAIN_BITCOIN_GOLD,
  BLOCKCHAIN_BITCOIN,
  BLOCKCHAIN_LITECOIN,
} from '@chronobank/login/network/BitcoinProvider'
import { BLOCKCHAIN_NEM } from '@chronobank/core/dao/NemDAO'

const sortArrayByObjectKeys = (a, b) => {
  const oA = Object.keys(a)[0]
  const oB = Object.keys(b)[0]
  return (oA > oB) - (oA < oB)
}

var isWalletAddressEqualish = function (v1, v2) {
  if (v1 === v2) {
    return true
  }
  if (Array.isArray(v1) && Array.isArray(v2)) {
    if (v1.length !== v2.length) {
      return false
    }
    const diffObjects = (a, b) => {
      return Object.keys(a).concat(Object.keys(b)).reduce( (map, k) => {
        if (a[k] !== b[k]) map[k] = b[k]
        return map
      }, {})
    }

    return v1.every( (v, ix) => {
      // return v2[ix] === v
      return diffObjects(v2[ix], v)
    })
  }

  return false
}

const createEqualishWalletsSelector = createSelectorCreator(
  defaultMemoize,
  isWalletAddressEqualish,
)

/**
|--------------------------------------------------
| CUSTOM FLOW TYPES
|--------------------------------------------------
*/

export type TSelectedWallet = {
  address: string,
  blockchain: string,
  isMultisig?: boolean,
}

/**
|--------------------------------------------------
| SIMPLE STATE GETTERS (DUCKS)
|--------------------------------------------------
*/

export const getSelectedWalletStore = (state: any): TSelectedWallet =>
  state.get(DUCK_WALLET)

export const getMainWalletStore = (state: any): MainWalletModel =>
  state.get(DUCK_MAIN_WALLET)

export const getMultisigWalletStore = (state: any): MultisigWalletCollection =>
  state.get(DUCK_MULTISIG_WALLET)

export const getMarketPricesSelectedCurrencyStore = (state: any): string =>
  state.get(DUCK_MARKET).selectedCurrency

export const getTokensStore = (state: any): TokensCollection =>
  state.get(DUCK_TOKENS)

/**
|--------------------------------------------------
| MODELS BASED SELECTORS
|--------------------------------------------------
*/

export const selectMainWalletBalances = createSelector(
  getMainWalletStore,
  (mainWallet: MainWalletModel): BalancesCollection =>
    mainWallet.balances()
)

export const selectMainWalletAdresses = createSelector(
  getMainWalletStore,
  (mainWallet: MainWalletModel): any[] =>
    mainWallet
      .addresses()
      .items()
      .filter( (addressModel: AddressModel) =>
        addressModel.id() && addressModel.address()
      )
      .map( (addressModel: AddressModel) => {
        const id: string = addressModel.id()
        const address: string = addressModel.address()
        const jsWallet = Object.create(null)
        const addrObj = Object.create(null)
        addrObj['address'] = address
        jsWallet[id] = addrObj
        return jsWallet
      })
)

export const selectMultisigActiveWallets = createSelector(
  [
    getMultisigWalletStore,
  ],
  (
    multisigWallet,
  ): MultisigWalletCollection => {
    return multisigWallet.activeWallets()
  }
)

export const selectMultisigTimeLockedWallets = createSelector(
  [
    getMultisigWalletStore,
  ],
  (
    multisigWallet,
  ): MultisigWalletCollection => {
    return multisigWallet.timeLockedWallets()
  }
)

export const selectMultisigWalletAdresses = createSelector(
  [
    selectMultisigActiveWallets,
    selectMultisigTimeLockedWallets,
  ],
  (
    activeMultisigWallets: MultisigWalletModel[],
    timeLockedMultisigWallets: MultisigWalletModel[],
  ): any[] =>
    [...activeMultisigWallets,...timeLockedMultisigWallets]
      .filter ( (multisigWalletModel: MultisigWalletModel) =>
        multisigWalletModel.address()
      )
      .map( (multisigWalletModel: MultisigWalletModel) => {
        const address: string = multisigWalletModel.address() || '' // Empty string only for Flowtype. All empty adresses filtered above.
        const jsWallet = Object.create(null)
        const addrObj = Object.create(null)
        addrObj['address'] = address
        jsWallet[BLOCKCHAIN_ETHEREUM] = addrObj
        return jsWallet
      })
)

export const allWalletsSelector = createEqualishWalletsSelector(
  [
    selectMainWalletAdresses,
    selectMultisigWalletAdresses,
  ],
  (mainWallets, multisigWallets) => {
    return {
      mainWallets,
      multisigWallets,
    }
  }
)

export const allWalletsAddresses = () => createSelector(
  [
    allWalletsSelector,
  ],
  (allWallets) => {
    return {
      mainWallets: allWallets.mainWallets,
      multisigWallets: allWallets.multisigWallets,
    }
  }
)

/**
|--------------------------------------------------
| MODELS BASED SELECTIOR CREATORS (SELECTOR FACTORIES WITH PARAMETERS)
|--------------------------------------------------
*/

export const makeSelectorMultisigWalletBalanceBySymbolAndAddress = (symbol: string, address: string) =>
  createSelector(
    [ getMultisigWalletStore ],
    (mainWallet: MainWalletModel): BalanceModel =>
      mainWallet
        .balances()
        .item(symbol)
  )

/**
|--------------------------------------------------
| MOVED FROM SESSIONS
|--------------------------------------------------
*/

export const sectionsSelector = createSelector(
  [
    getMainWalletStore,
    getMultisigWalletStore,
  ],
  (
    mainWallet,
    multisigWallets,
  ) => {
    // final result will be svaed here
    const sectionsObject = {}

    // Go through mainWallet's addresses
    mainWallet.addresses().items().map( (address) => {
      const addrJS = address.toJS()
      const addrID = addrJS.id
      if (addrJS.address != null) {
        if (!sectionsObject.hasOwnProperty(addrID)) {
          sectionsObject[addrID] = {
            data: [{
              address: addrJS.address,
              wallet: mainWallet,
            }],
          }
        } else {
          sectionsObject[addrID].data.push({
            address: addrJS.address,
            wallet: mainWallet,
          })
        }
      }
    })

    // Add active multisig wallets
    multisigWallets.activeWallets().map( (aWallet) => {
      const currentWalletAddress: string = aWallet.address()
      if (!sectionsObject.hasOwnProperty(BLOCKCHAIN_ETHEREUM)) {
        sectionsObject[BLOCKCHAIN_ETHEREUM] = {
          data: [{
            address: currentWalletAddress,
            wallet: aWallet,
          }],
        }
      } else {
        sectionsObject[BLOCKCHAIN_ETHEREUM].data.push({
          address: currentWalletAddress,
          wallet: aWallet,
        })
      }
    })

    // Add timeLocked multisig wallets
    multisigWallets.timeLockedWallets().map( (tlWallet) => {
      const currentWalletAddress: string = tlWallet.address()
      if (!sectionsObject.hasOwnProperty(BLOCKCHAIN_ETHEREUM)) {
        sectionsObject[BLOCKCHAIN_ETHEREUM] = {
          data: [{
            address: currentWalletAddress,
            wallet: tlWallet,
          }],
        }
      } else {
        sectionsObject[BLOCKCHAIN_ETHEREUM].data.push({
          address: currentWalletAddress,
          wallet: tlWallet,
        })
      }
    })

    // Sort main sections and make an array
    const sortSectionsObject = (o) => Object.keys(o).sort().reduce((r, k) => (r[k] = o[k], r), {})
    const sortedSections = sortSectionsObject(sectionsObject)
    const resultSections = Object.keys(sortedSections).map( (sectionName) => {
      return {
        title: sectionName,
        data: sortedSections[sectionName].data,
      }
    })

    return resultSections
  }
)

/**
|--------------------------------------------------
| OLD STUFF
|--------------------------------------------------
*/

export const getMainWalletBalance = (symbol: string) => createSelector(
  [ getMainWalletStore ],
  (mainWallet) =>
    mainWallet.balances().item(symbol)
)

export const getCurrentWalletBalance = (symbol: string) => createSelector(
  [ getCurrentWallet ],
  (currentWallet) =>
    currentWallet.balances().item(symbol)
)

export const selectMainWalletBalancesListStore = (state) =>
  state.get(DUCK_MAIN_WALLET).balances().list() // BalancesCollection, array of BalanceModel

export const selectTokensStore = (state) =>
  state.get(DUCK_TOKENS) // TokensCollection, array of TokenModel

export const selectMainWalletAddressesListStore = (state) =>
  state.get(DUCK_MAIN_WALLET).addresses().list() // This is an instance of MainWalletModel

export const selectMainWalletTransactionsListStore = (state) =>
  state.get(DUCK_MAIN_WALLET).transactions().list()

export const selectMarketPricesListStore = (state) =>
  state.get(DUCK_MARKET).prices

export const selectMarketPricesSelectedCurrencyStore = (state) =>
  state.get(DUCK_MARKET).selectedCurrency

export const selectMainWalletTransactionsStore = (state) => {
  const status = state.get(DUCK_MAIN_WALLET).transactions().toJS()
  return {
    isFailed: status.isFailed,
    isFetched: status.isFetched,
    isFetching: status.isFetching,
    isInited: status.isInited,
    isPending: status.isPending,
    isSelected: status.isSelected,
  }
}
/**
 * WALLET SECTIONS
 *
 *  Usage example:
 *
 *
 * const getSectionedWallets = makeGetSectionedWallets()
 *   const mapStateToProps = (state, props) => {
 *     const makeMapStateToProps = () => {
 *     return {
 *       walletsSections: getSectionedWallets(state, props),
 *     }
 *   }
 *  return mapStateToProps
 * }
 *
 * @connect(makeMapStateToProps)
 * export default class AnyComponent extends PureComponent {
 */

/**
 * This is memoized selector. Produce the list of blockchain sections and wallets
 *
 * @return { [{title: string, data: string | string[]}] }
 *         Returns list of sections for the ReactNative SectionList.
 */
export const getMainWalletSections = createSelector(
  [
    selectMainWalletAddressesListStore,
  ],
  (mainWalletAddressesList) => {
    return mainWalletAddressesList
      .filter( (address) => address.address() !== null ) // We do not need wallets with null address (e.g. BTG in Rinkeby/Infura)
      .reduce( (accumulator, addressModel, blockchain) => {
        const address = addressModel.address() // AddressModel.address() returns string with wallet's address
        accumulator.push({
          // data must contains an array (requirement of SectionList component in React Native, sorry)
          data: [address],
          title: blockchain,
        })
        return accumulator
      }, [] )
      .sort( ({ title: a }, { title: b }) => (a > b) - (a < b) ) // sort by blocakchains titles
  }
)

/**
 * This is the factory for selector
 * It may be used in different components and each of them will have its own memoized copy
 *
 * @return { [{title: string, data: string | string[]}] }
 *         Returns list of sections for the ReactNative SectionList.
 */
export const makeGetSectionedWallets = () => createSelector(
  [
    getMainWalletSections,
  ],
  (mainWalletSections) => mainWalletSections
)

/**
 * TOKENS AND BALANCE BY ADDRESS
 *
 * Usage example:
 * const makeMapStateToProps = (origState, origProps) => {
 *  const getWalletTokensAndBalanceByAddress = makeGetWalletTokensAndBalanceByAddress()
 *  const mapStateToProps = (state, ownProps) => {
 *     const walletTokensAndBalanceData = getWalletTokensAndBalanceByAddress(state, ownProps)
 *     return {
 *       walletTokensAndBalance: walletTokensAndBalanceData,
 *     }
 *   }
 *   return mapStateToProps
 * }
 *
 * @connect(makeMapStateToProps)
 * export default class AnyComponent extends PureComponent<WalletPanelProps> {
 *
 * NOTE: component AnyComnnect MUST have props walletAddress: string & blockchain: string
 * Both props are required, because we may have same wallet addresses in "Bitcoin" and "Bitcoin Cash" blockchains
 */

/**
 * This is the factory for selector
 * It may be used in different components and each of them will have its own memoized copy
 *
 * @return { { balance: number, tokens: [ {ETH: number } ] } }
 *         Returns list of sections for the ReactNative SectionList.
 */
export const makeGetWalletTokensAndBalanceByAddress = (blockchain: string) => {
  return createSelector(
    [
      getMainWalletSections,
      selectMainWalletTransactionsListStore,
      selectMainWalletAddressesListStore,
      selectMainWalletBalancesListStore,
      selectTokensStore,
      selectMarketPricesListStore,
      selectMarketPricesSelectedCurrencyStore,
    ],
    (
      addressesAndBlockchains,
      mainWalletTransactionsList,
      mainWalletAddressesList,
      mainWalletBalances,
      mainWalletTokens,
      prices,
      selectedCurrency,
    ) => {

      /**
       * Internal utility
       * @private
       */
      const convertAmountToNumber = (symbol, amount) =>
        mainWalletTokens
          .item(symbol)
          .removeDecimals(amount)
          .toNumber()

      const walletTokensAndBalanceByAddress = mainWalletBalances // BalancesCollection, array of BalanceModel
        .filter( (balanceItem) => {
          const bSymbol = balanceItem.symbol()
          const bToken = mainWalletTokens.item(bSymbol)
          return bToken.blockchain() === blockchain
        })
        .map( (balance) => {
          const bAmount = balance.amount()
          const bSymbol = balance.symbol()
          const tAmount = convertAmountToNumber(bSymbol, bAmount)
          let tokenAmountKeyValuePair = {}
          tokenAmountKeyValuePair[bSymbol] = tAmount
          return {
            symbol: bSymbol,
            amount: tAmount,
          }
        })

      const arrWalletTokensAndBalanceByAddress = [...walletTokensAndBalanceByAddress.values()]
      const result = arrWalletTokensAndBalanceByAddress
        .reduce( (accumulator, tokenKeyValuePair) => {
          const { amount, symbol } = tokenKeyValuePair
          const tokenPrice = prices[ symbol ] && prices[ symbol ][ selectedCurrency ] || null
          accumulator.balance += ( ( amount || 0 ) * ( tokenPrice || 0 ))
          accumulator.tokens.push({
            [ symbol ]: {
              amount: amount,
              balance: amount * (tokenPrice || 0),
            },
          })
          accumulator.tokens = accumulator.tokens.sort((a, b) => {
            const oA = a.symbol
            const oB = b.symbol
            return (oA > oB) - (oA < oB)
          })
          return accumulator
        }, {
          balance: 0,
          tokens: [],
        })

      // Let's add an address of Main Wallet into final result
      const currentWallet = addressesAndBlockchains
        .find((mainWalletAddrAndChain) => {
          return mainWalletAddrAndChain.title === blockchain
        })
      result.address = currentWallet && currentWallet.data && currentWallet.data[0]

      return result
    }
  )
}

export const getWalletTransactions = createSelector(
  [
    selectMainWalletTransactionsListStore,
  ],
  (mainWalletTransactionsList) => {
    return mainWalletTransactionsList
  }
)

export const makeGetMainWalletTransactionsByBlockchainName = (
  requiredBlockchainName: string,
  currentWalletAddress: string,
) => {
  return createSelector(
    [
      selectTokensStore,
      selectMainWalletTransactionsListStore,
      selectTokensStore,
    ],
    (
      mainWalletTokens,
      mainWalletTransactions, // Immutable Map
      mainWalletTokensCollection, // TokensCollection
    ) => {
      /**
       * Internal utility
       * @private
       */
      const convertAmountToNumber = (symbol, amount) =>
        mainWalletTokens
          .item(symbol)
          .removeDecimals(amount)
          .toNumber()

      const getTokenSymbolListByBlockchainName = (blockchainName: string) =>
        mainWalletTokensCollection
          .list()
          .filter( (token) => {
            const res = token.blockchain() === blockchainName
            return res
          })
          .map( (token) => token.symbol() )
          .toArray()

      const requiredTokenList = getTokenSymbolListByBlockchainName(requiredBlockchainName)
      const result = mainWalletTransactions
        .filter( (txModel: TxModel) => {
          const isNeedIt = requiredTokenList.includes(txModel.symbol()) // if sumbol of a transaction in range of current blockchain
            && [txModel.to(), txModel.from()].includes(currentWalletAddress) // if to or from address of a transaction contians curent wallet's address
          return isNeedIt
        })
        .map( (txModel: TxModel) => {
          const isSendTransaction = txModel.to() && txModel.to().toLowerCase() === currentWalletAddress.toLowerCase()
          const toAddress = txModel.to()
          const fromAddress = txModel.from()
          const transactionType = isSendTransaction
            ? 'sending'
            : 'receiving'
          const transactionAddress = isSendTransaction
            ? toAddress
            : fromAddress
          return {
            type: transactionType,
            address: transactionAddress,
            amount: convertAmountToNumber(txModel.symbol(), txModel.value()),
            symbol: txModel.symbol(),
            confirmations: 1,
            txDate: txModel.get('time'),
          }
        })
        .toArray()

      return result
    })
}

let isSelectedWalletEqualish = function (v1, v2) {

  if (v1.blockchain !== v2.blockchain) {
    return false
  }

  if (v1.address !== v2.address) {
    return false
  }

  return true
}
const createEqualishSelectedWalletSelector = createSelectorCreator(
  defaultMemoize,
  isSelectedWalletEqualish,
)

export const selWalletSelector = createEqualishSelectedWalletSelector(
  [
    getSelectedWalletStore,
  ],
  (selectedWalletData) => {
    return {
      address: selectedWalletData.address,
      blockchain: selectedWalletData.blockchain,
    }
  }
)

export const getSelectedWalletBalanceInSelectedCurrency = createSelector(
  [
    getSelectedWalletStore,
    getMainWalletSections,
    selectMainWalletTransactionsListStore,
    selectMainWalletAddressesListStore,
    selectMainWalletBalancesListStore,
    selectTokensStore,
    selectMarketPricesListStore,
    selectMarketPricesSelectedCurrencyStore,
  ],
  (
    selectedWallet,
    addressesAndBlockchains,
    mainWalletTransactionsList,
    mainWalletAddressesList,
    mainWalletBalances: BalancesCollection,
    mainWalletTokens,
    prices,
    selectedCurrency,
  ) => {
    const { blockchain }: { blockchain: ?string } = selectedWallet

    const convertAmountToNumber = (symbol: string, amount: Amount) =>
      mainWalletTokens
        .item(symbol)
        .removeDecimals(amount)
        .toNumber()

    const walletTokensAndBalanceByAddress = mainWalletBalances // BalancesCollection, array of BalanceModel
      // filtering main wallets balances by blockhain title
      .filter( (balanceItem: BalanceModel) => {
        const bSymbol: string = balanceItem.symbol()
        const bToken: TokenModel = mainWalletTokens.item(bSymbol)
        return bToken.blockchain() === blockchain
      })
      // simplify format
      .reduce( (accumulator: any[], balanceItem: BalanceModel) => {
        const bAmount: ?Amount = balanceItem.amount()
        const bSymbol: ?string = balanceItem.symbol()
        if (bSymbol && bAmount) {
          const tAmount: number = convertAmountToNumber(bSymbol, bAmount)
          accumulator.push({
            symbol: bSymbol,
            amount: tAmount,
          })
        }
        return accumulator
      }, [])

    const arrWalletTokensAndBalanceByAddress = [...walletTokensAndBalanceByAddress.values()]
    const balance: number = arrWalletTokensAndBalanceByAddress
      .reduce( (accumulator, tokenKeyValuePair) => {
        const { amount, symbol } = tokenKeyValuePair
        const tokenPrice = prices[ symbol ] && prices[ symbol ][ selectedCurrency ] || null
        if (tokenPrice && amount > 0) {
          // eslint-disable-next-line no-param-reassign
          accumulator += ( amount * tokenPrice )
        }
        return accumulator
      }, 0)

    return balance && balance.toFixed(2) || 0
  }
)

const makeGetTokenSymbolListByBlockchainName = (blockchainName: string) =>
  createSelector(
    [
      selectTokensStore,
    ],
    (mainWalletTokens) =>
      mainWalletTokens
        .list()
        .filter( (token) => {
          const res = token.blockchain() === blockchainName
          return res
        })
        .map( (token) => token.symbol() )
        .toArray()
  )

var isWalletInfoEqualish = function (v1, v2) {

  if (v1.tokensLength !== v2.tokensLength) {
    return false
  }
  if (v1.isMultisig !== v2.isMultisig) {
    return false
  }
  if (v1.walletMode !== v2.walletMode) {
    return false
  }
  if (v1.balance !== v2.balance) {
    return false
  }

  if (Array.isArray(v1.tokens) && Array.isArray(v2.tokens)) {

    if (v1.tokens !== v2.tokens) {
      return false
    }

    const diffObjects = (a, b) => {
      return Object.keys(a).concat(Object.keys(b)).reduce( (map, k) => {
        if (a[k] !== b[k]) map[k] = b[k]
        return map
      }, {})
    }

    return v1.tokens.every( (v, ix) =>
      diffObjects(v2.tokens[ix], v)
    )
  }

  return false
}

const createEqualishWalletInfoSelector = createSelectorCreator(
  defaultMemoize,
  isWalletInfoEqualish,
)

export const makeGetWalletInfoByBockchainAndAddress = (blockchain: string, address: string) => {
  return createEqualishWalletInfoSelector(
    [
      getMainWalletStore,
      getMultisigWalletStore,
      selectMainWalletTransactionsListStore,
      selectMainWalletAddressesListStore,
      selectMainWalletBalancesListStore,
      selectTokensStore,
      selectMarketPricesListStore,
      selectMarketPricesSelectedCurrencyStore,
    ],
    (
      mainWallet,
      multisigWallet,
      mainWalletTransactionsList,
      mainWalletAddressesList,
      mainWalletBalances,
      mainWalletTokens,
      prices,
      selectedCurrency,
    ) => {

      // Method to search through all wallets and detect wallet type (multisig or not)
      const findWallet = () => {
        let isMainWalletFound: boolean = false
        let isMultisigWalletFound: boolean = false

        const mainAddressesList: string[] = mainWallet
          .addresses()
          .list()
          .toArray()
          .map( (addrModel: AddressModel) => addrModel.address())

        const multisigActiveWalletsList: string[] = multisigWallet
          .activeWallets()
          .map( (multiWallet: MultisigWalletModel) => multiWallet.address())

        const multisigTimeLockedWalletsList: string[] = multisigWallet
          .timeLockedWallets()
          .map( (multiWallet: MultisigWalletModel) => multiWallet.address())

        if (mainAddressesList && mainAddressesList.length) {
          isMainWalletFound = mainAddressesList && mainAddressesList.includes(address)
        }

        // If Ethereum, then look into main and multisig
        if (blockchain === BLOCKCHAIN_ETHEREUM) {
          const multisigWalletsList: string[] = [...multisigActiveWalletsList, ...multisigTimeLockedWalletsList]
          isMultisigWalletFound = multisigWalletsList.includes(address)
        }

        const searchResult = {
          isMainWalletFound,
          isMultisigWalletFound,
        }

        return searchResult
      }

      let result = {
        isMultisig: false,
        walletMode: null,
      }

      const {
        isMainWalletFound,
        isMultisigWalletFound,
      } = findWallet()

      if (isMainWalletFound) {
        const convertAmountToNumber = (symbol, amount) =>
          mainWalletTokens
            .item(symbol)
            .removeDecimals(amount)
            .toNumber()

        const balanceAndTokens = mainWalletBalances // BalancesCollection, array of BalanceModel
          .filter( (balanceItem) => {
            const bSymbol = balanceItem.symbol()
            const bToken = mainWalletTokens.item(bSymbol)
            return bToken.blockchain() === blockchain
          })
          .reduce( (accumulator: any[], balanceItem: BalanceModel) => {
            const bAmount: ?Amount = balanceItem.amount()
            const bSymbol: ?string = balanceItem.symbol()
            if (bSymbol && bAmount) {
              const tAmount: number = convertAmountToNumber(bSymbol, bAmount)
              accumulator.push({
                symbol: bSymbol,
                amount: tAmount,
              })
            }
            return accumulator
          }, [])
          .reduce( (accumulator, tokenKeyValuePair) => {
            const { amount, symbol } = tokenKeyValuePair
            const tokenPrice = prices && prices[ symbol ] && prices[ symbol ][ selectedCurrency ] || null

            // Increasing balance only if we have necessary data
            if (amount && tokenPrice) {
              accumulator.balance += ( amount * tokenPrice )
            }

            accumulator.tokens.push({
              [ symbol ]: {
                amount: amount,
                balance: amount * (tokenPrice || 0),
              },
            })

            return accumulator
          }, {
            balance: 0,
            tokens: [],
          })

        // Append single-token blockchains with empty token or sort tokens list alaphabetically
        if (!balanceAndTokens.tokens.length) {
          switch (blockchain) {
            case BLOCKCHAIN_BITCOIN_CASH: {
              balanceAndTokens.tokens = [{ 'BCC': { amount: 0, balance: 0 } }]
              break
            }
            case BLOCKCHAIN_BITCOIN_GOLD: {
              balanceAndTokens.tokens = [{ 'BTG': { amount: 0, balance: 0 } }]
              break
            }
            case BLOCKCHAIN_BITCOIN: {
              balanceAndTokens.tokens = [{ 'BTC': { amount: 0, balance: 0 } }]
              break
            }
            case BLOCKCHAIN_LITECOIN: {
              balanceAndTokens.tokens = [{ 'LTC': { amount: 0, balance: 0 } }]
              break
            }
          }
        } else {
          balanceAndTokens.tokens.sort(sortArrayByObjectKeys)
        }

        const tokensLength = balanceAndTokens.tokens.length

        const finalResult = {
          ...result,
          ...balanceAndTokens,
          tokensLength,
        }
        /* Structure
        finalResult {
          balance: 0,
          isMultisig: false,
          tokens: [{ 'LTC': { amount: 0, balance: 0 } }],
          tokensLength: 0,
          walletMode: null,
        }
        */

        return finalResult

      } else {
        if (isMultisigWalletFound) {
          result.isMultisig = true
          return 'NULLMULTISIG'
        } else {
          return 'NOT FOUND'
        }
      }
    }
  )
}

var isWalletTransactionsEqualish = function (v1, v2) {

  if (v1.latestTransactionDate !== v2.latestTransactionDate) {
    return false
  }

  if (Array.isArray(v1.transactions) && Array.isArray(v2.transactions)) {

    if (v1.transactions.length !== v2.transactions.length) {
      return false
    }

    const diffObjects = (a, b) => {
      return Object.keys(a).concat(Object.keys(b)).reduce( (map, k) => {
        if (a[k] !== b[k]) map[k] = b[k]
        return map
      }, {})
    }

    return v1.transactions.every( (v, ix) => {
      // return v2[ix] === v
      return diffObjects(v2.transactions[ix], v)
    })
  }

  return false
}

const createEqualishWalletTransactionSelector = createSelectorCreator(
  defaultMemoize,
  isWalletTransactionsEqualish,
)

export const makeGetWalletTransactionsByBlockchainAndAddress = (blockchain: string, address: string) => {
  const getTokenSymbolListByBlockchainName = makeGetTokenSymbolListByBlockchainName(blockchain)
  return createEqualishWalletTransactionSelector(
    [
      getMainWalletStore,
      getMultisigWalletStore,
      selectMainWalletTransactionsListStore,
      selectTokensStore,
      getTokenSymbolListByBlockchainName,
    ],
    (
      mainWallet,
      multisigWallet,
      mainWalletTransactionsList,
      mainWalletTokens,
      mainWalletTokensSymbolList,
    ) => {

      // Method to search through all wallets and detect wallet type (multisig or not)
      const findWallet = () => {
        let isMainWalletFound: boolean = false
        let isMultisigWalletFound: boolean = false

        const mainAddressesList: string[] = mainWallet
          .addresses()
          .list()
          .toArray()
          .map( (addrModel: AddressModel) => addrModel.address())

        const multisigActiveWalletsList: string[] = multisigWallet
          .activeWallets()
          .map( (multiWallet: MultisigWalletModel) => multiWallet.address())

        const multisigTimeLockedWalletsList: string[] = multisigWallet
          .timeLockedWallets()
          .map( (multiWallet: MultisigWalletModel) => multiWallet.address())

        if (mainAddressesList && mainAddressesList.length) {
          isMainWalletFound = mainAddressesList && mainAddressesList.includes(address)
        }

        // If Ethereum, then look into main and multisig
        if (blockchain === BLOCKCHAIN_ETHEREUM) {
          const multisigWalletsList: string[] = [...multisigActiveWalletsList, ...multisigTimeLockedWalletsList]
          isMultisigWalletFound = multisigWalletsList.includes(address)
        }

        const searchResult = {
          isMainWalletFound,
          isMultisigWalletFound,
        }

        return searchResult
      }

      const {
        isMainWalletFound,
        isMultisigWalletFound,
      } = findWallet()

      if (isMainWalletFound) {

        const convertAmountToNumber = (symbol, amount) =>
          mainWalletTokens
            .item(symbol)
            .removeDecimals(amount)
            .toNumber()

        const transactions = mainWalletTransactionsList
          .filter( (txModel: TxModel) => {
            const isNeedIt = mainWalletTokensSymbolList.includes(txModel.symbol()) // if symbol of a transaction in range of current blockchain
              && [txModel.to(), txModel.from()].includes(address) // if to or from address of a transaction contians curent wallet's address
            return isNeedIt
          })
          .map( (txModel: TxModel) => {
            const recipient = txModel.to()
            const isReceivingTransaction = recipient && recipient.toLowerCase() === address.toLowerCase()
            const toAddress = txModel.to()
            const fromAddress = txModel.from()
            const transactionType = isReceivingTransaction
              ? 'receiving'
              : 'sending'
            const transactionAddress = isReceivingTransaction
              ? fromAddress
              : toAddress
            return {
              type: transactionType,
              address: transactionAddress,
              amount: convertAmountToNumber(txModel.symbol(), txModel.value()),
              symbol: txModel.symbol(),
              confirmations: 1, // TODO
              txDate: txModel.get('time'),
            }
          })
          .toArray()
          .sort( (a, b) => {
            const aDate = a.txDate
            const bDate = b.txDate
            return (bDate > aDate) - (bDate < aDate)
          })
        const latestTransactionDate = transactions && ( transactions[0] !== undefined ) && transactions[0].txDate || null

        return {
          transactions,
          latestTransactionDate,
        }
      } else {
        if (isMultisigWalletFound) {
          return 'NULLMULTISIG'
        } else {
          return 'NOT FOUND'
        }
      }
    }
  )
}
