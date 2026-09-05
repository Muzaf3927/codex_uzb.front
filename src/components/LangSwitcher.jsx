import { useI18n, languageList } from '../i18n/index.jsx'
import './LangSwitcher.css'

/** Переключатель языков: 4 кнопки в одной «пилюле». */
export default function LangSwitcher({ variant = 'header' }) {
  const { lang, setLang, t } = useI18n()

  return (
    <div className={`lang lang--${variant}`} role="group" aria-label={t.header.lang}>
      {languageList.map((l) => (
        <button
          key={l.code}
          className={`lang__item ${l.code === lang ? 'is-active' : ''}`}
          onClick={() => setLang(l.code)}
          aria-pressed={l.code === lang}
          title={l.label}
        >
          {l.short}
        </button>
      ))}
    </div>
  )
}
