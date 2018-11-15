var Mnemonic = require('bitcore-mnemonic');


export const generateMnemonic = () => new Mnemonic();
export const validateMnemonic = (code) => Mnemonic.isValid(code)
