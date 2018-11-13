/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

// Check if 'n' is number
const isNumber = (n) =>
  !isNaN(parseFloat(n)) && isFinite(n)

export default isNumber
