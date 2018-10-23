/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */
import DeviceInfo from 'react-native-device-info'

export default function salt (data: string) {
  const uniqueId = DeviceInfo.getUniqueID

  return `${data}${uniqueId}`
}
