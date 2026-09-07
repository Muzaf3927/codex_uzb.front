import { createContext, useContext, useEffect, useMemo } from 'react'
import ru from './ru.js'
import uz from './uz.js'
import en from './en.js'
import zh from './zh.js'

export const languages = { ru, uz, en, zh }
export const languageList = [uz, ru, en, zh]

/** Узбекский — язык главной страницы «/». */
export const DEFAULT_LANG = 'uz'
export const STORAGE_KEY = 'codex-lang'

/**
 * У каждого языка свой адрес: «/» (uz), «/ru/», «/en/», «/zh/».
 * Поисковикам нужны отдельные URL — иначе они видят только один язык
 * и русские/английские запросы никогда не найдут сайт.
 */
export function langHref(code) {
  return code === DEFAULT_LANG ? '/' : `/${code}/`
}

/** Язык вычисляется из адреса страницы, а не из localStorage. */
export function langFromPath(pathname = '/') {
  const first = pathname.split('/').filter(Boolean)[0]
  return languages[first] ? first : DEFAULT_LANG
}

/** Язык браузера — используется только для подсказки первому посетителю «/». */
export function detectLanguage() {
  if (typeof navigator === 'undefined') return DEFAULT_LANG

  const browser = (navigator.language || '').toLowerCase()
  if (browser.startsWith('uz')) return 'uz'
  if (browser.startsWith('zh')) return 'zh'
  if (browser.startsWith('ru') || browser.startsWith('kk') || browser.startsWith('ky')) return 'ru'
  if (browser.startsWith('en')) return 'en'
  return DEFAULT_LANG
}

const I18nContext = createContext(null)

export function I18nProvider({ lang = DEFAULT_LANG, children }) {
  const t = languages[lang] || languages[DEFAULT_LANG]

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang)
  }, [lang])

  const value = useMemo(
    () => ({
      lang,
      t,
      /** Переключение языка = переход на другой URL (ссылка, а не состояние). */
      setLang: (code) => {
        window.localStorage.setItem(STORAGE_KEY, code)
        window.location.assign(langHref(code))
      },
    }),
    [lang, t],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n должен вызываться внутри <I18nProvider>')
  return ctx
}
