import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import ru from './ru.js'
import uz from './uz.js'
import en from './en.js'
import zh from './zh.js'

export const languages = { ru, uz, en, zh }
export const languageList = [uz, ru, en, zh]

const DEFAULT_LANG = 'uz'
const STORAGE_KEY = 'codex-lang'

/** Язык из localStorage → из настроек браузера → узбекский. */
function detectLanguage() {
  if (typeof window === 'undefined') return DEFAULT_LANG

  const saved = window.localStorage.getItem(STORAGE_KEY)
  if (saved && languages[saved]) return saved

  const browser = (navigator.language || '').toLowerCase()
  if (browser.startsWith('uz')) return 'uz'
  if (browser.startsWith('zh')) return 'zh'
  if (browser.startsWith('ru') || browser.startsWith('kk') || browser.startsWith('ky')) return 'ru'
  if (browser.startsWith('en')) return 'en'
  return DEFAULT_LANG // узбекский
}

const I18nContext = createContext(null)

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(detectLanguage)
  const t = languages[lang] || languages[DEFAULT_LANG]

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang)
    document.documentElement.lang = t.htmlLang
    document.title = t.meta.title

    const desc = document.querySelector('meta[name="description"]')
    if (desc) desc.setAttribute('content', t.meta.description)
  }, [lang, t])

  const value = useMemo(() => ({ lang, setLang, t }), [lang, t])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n должен вызываться внутри <I18nProvider>')
  return ctx
}
