import { useI18n, languageList, langHref, STORAGE_KEY } from '../i18n/index.jsx'
import './LangSwitcher.css'

/**
 * Переключатель языков: обычные ссылки на /ru/, /en/, /zh/.
 * Именно ссылки, а не кнопки — так поисковик находит все языковые версии.
 */
export default function LangSwitcher({ variant = 'header' }) {
  const { lang, t } = useI18n()

  return (
    <div className={`lang lang--${variant}`} role="group" aria-label={t.header.lang}>
      {languageList.map((l) => (
        <a
          key={l.code}
          className={`lang__item ${l.code === lang ? 'is-active' : ''}`}
          href={langHref(l.code)}
          hrefLang={l.htmlLang}
          onClick={() => window.localStorage.setItem(STORAGE_KEY, l.code)}
          aria-current={l.code === lang ? 'true' : undefined}
          title={l.label}
        >
          {l.short}
        </a>
      ))}
    </div>
  )
}
