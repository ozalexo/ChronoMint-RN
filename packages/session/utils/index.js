/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

// eslint-disable-next-line import/prefer-default-export
export const parallelPromises = (promises) => {
  const errorIgnoringPromises = promises
    .map((p) => {
      if (typeof p !== 'function') {
        throw new Error('parallelPromises: Not a function 2')
      }

      return p().catch((error) => {
        // eslint-disable-next-line no-console
        console.log('Error ignored:', error)
      })
    })

  return Promise.all(errorIgnoringPromises)
}
