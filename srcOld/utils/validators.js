/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

const password = (password: string) => (
  password.length >= 8 &&
  password.length <= 255
)

const pin = (pin: string) => (
  pin.length === 4
)

const isValid = {
  password,
  pin
}

export default isValid
