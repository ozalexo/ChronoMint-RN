/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import I18n from 'react-native-i18n'
import en from '../locales/en'
import ru from '../locales/ru'

I18n.fallbacks = true

I18n.translations = { en, ru }
