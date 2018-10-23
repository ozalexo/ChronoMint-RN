/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

// Check if 'n' is number
const isNumber = (n: any) =>
  !isNaN(parseFloat(n)) && isFinite(n)

export default isNumber
