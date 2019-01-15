/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { errors } from 'web3-core-helpers'

// eslint-disable-next-line import/prefer-default-export
export const parseResponse = (data) => {
  const returnValues = []
  let lastChunk = null
  let lastChunkTimeout = null

  // DE-CHUNKER
  const dechunkedData = data
    .replace(/\}[\n\r]?\{/g, '}|--|{') // }{
    .replace(/\}\][\n\r]?\[\{/g, '}]|--|[{') // }][{
    .replace(/\}[\n\r]?\[\{/g, '}|--|[{') // }[{
    .replace(/\}\][\n\r]?\{/g, '}]|--|{') // }]{
    .split('|--|')

  dechunkedData.forEach((data) => {
    if (lastChunk) {
      data = lastChunk + data
    }

    let result = null

    try {
      result = JSON.parse(data)
    } catch (error) {
      lastChunk = data
      lastChunkTimeout && clearTimeout(lastChunkTimeout)
      lastChunkTimeout = setTimeout(() => {
        this.timeout()
        throw errors.InvalidResponse(data)
      }, 1000 * 15)

      return
    }

    clearTimeout(lastChunkTimeout)
    lastChunk = null

    if (result) {
      returnValues.push(result)
    }
  })

  return returnValues
}
