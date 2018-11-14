import RNLanguages from 'react-native-languages';
import i18n from 'i18n-js';

import en from './en';
import ru from './ru';

i18n.locale = RNLanguages.language;
i18n.fallbacks = true;
i18n.translations = { en, ru };

export default i18n;
