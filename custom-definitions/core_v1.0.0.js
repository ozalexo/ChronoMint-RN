/* @flow */

declare class AbstractAccountModel {}

declare module '@chronobank/core/models/wallet/persistAccount/AbstractAccountModel' {
  declare export default typeof AbstractAccountModel
}

declare class AccountEntryModel extends AbstractAccountModel {
  key: string,
  name: string,
  types: {},
  encrypted: [],
  profile: AccountProfileModel,
}

declare module '@chronobank/core/models/wallet/persistAccount/AccountEntryModel' {
  declare export default typeof AccountEntryModel
}

declare class AccountModel extends AbstractAccountModel {
  wallet: {},
  entry: AccountEntryModel
}

declare module '@chronobank/core/models/wallet/persistAccount/AccountModel' {
  declare export default typeof AccountEntryModel
}

declare class AccountProfileModel extends AbstractAccountModel {
  id: string,
  avatar: string,
  address: string,
  ipfsHash: string,
  userName: string
}

declare module '@chronobank/core/models/wallet/persistAccount/AccountProfileModel' {
  declare export default typeof AccountProfileModel
}
