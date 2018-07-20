/* @flow */
import AbstractAccountModel from '@chronobank/core/models/wallet/persistAccount/AbstractAccountModel'
import AccountProfileModel from '@chronobank/core/models/wallet/persistAccount/AccountProfileModel'

declare module '@chronobank/core/models/wallet/persistAccount/AbstractAccountModel' {
  declare export default class AbstractAccountModel {}
}

declare module '@chronobank/core/models/wallet/persistAccount/AccountProfileModel' {
  declare export default class AccountProfileModel extends AbstractAccountModel {
    id: string,
    avatar: string,
    address: string,
    ipfsHash: string,
    userName: string
  }
}

declare module '@chronobank/core/models/wallet/persistAccount/AccountEntryModel' {
  declare export default class AccountEntryModel  {
    key: string,
    name: string,
    profile: AccountProfileModel,
  }
}
