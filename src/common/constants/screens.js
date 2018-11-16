/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import {Platform} from 'react-native'
import normalize from '../utils/responseveSize'

export const headerHeight = Platform.OS === 'ios' ? normalize(64) : normalize(56)
