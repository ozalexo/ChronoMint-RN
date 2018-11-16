import { language } from 'react-native-languages'
import i18n from 'i18n-js'
import en from './en.json'
import ru from './ru.json'

i18n.locale = language
i18n.fallbacks = true
i18n.translations = { en, ru }

export default i18n
