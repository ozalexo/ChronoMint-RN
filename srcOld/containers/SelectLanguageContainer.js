/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import I18n from 'react-native-i18n'
import SelectLanguage from '../screens/SelectLanguage'

export type TLanguage = {
  locale: string,
  name: string,
}

type TSelectLanguageContainerProps = {
  navigator: any,
}

class SelectLanguageContainer extends PureComponent<TSelectLanguageContainerProps, {}> {
  handleSelectLanguage = (language: TLanguage) => () => {
    I18n.locale = language.locale

    this.props.navigator.toggleDrawer({
      side: 'right',
      to: 'closed'
    })
  }

  render () {
    return (<SelectLanguage
      languages={languages}
      onSelectLanguage={this.handleSelectLanguage}
    />)
  }
}

export default SelectLanguageContainer

const languages = [
  { locale: 'en', name: 'English (USA)' },
  { locale: 'ru', name: 'Русский' }
]
