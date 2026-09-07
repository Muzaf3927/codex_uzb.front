import { renderToString } from 'react-dom/server'
import App from './App.jsx'

export { languages, languageList, langHref, DEFAULT_LANG } from './i18n/index.jsx'
export { contacts, contactLinks, brand } from './data/site.js'

/** Собирает готовый HTML страницы для указанного языка (используется на этапе сборки). */
export function render(lang) {
  return renderToString(<App lang={lang} />)
}
