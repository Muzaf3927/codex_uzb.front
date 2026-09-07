import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './styles/global.css'
import App from './App.jsx'
import { DEFAULT_LANG, STORAGE_KEY, langFromPath, langHref, languages } from './i18n/index.jsx'

const path = window.location.pathname
const lang = langFromPath(path)

/**
 * Только на главной «/» и только для тех, кто уже выбирал язык руками,
 * уводим на сохранённую версию. У поискового робота localStorage нет —
 * он всегда видит именно ту страницу, которую запросил.
 */
if (lang === DEFAULT_LANG && (path === '/' || path === '/index.html')) {
  const saved = window.localStorage.getItem(STORAGE_KEY)
  if (saved && saved !== DEFAULT_LANG && languages[saved]) {
    window.location.replace(langHref(saved))
  }
}

const container = document.getElementById('root')
const app = (
  <React.StrictMode>
    <App lang={lang} />
  </React.StrictMode>
)

// Страница собрана заранее (prerender) — подхватываем готовую разметку.
if (container.hasChildNodes()) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
