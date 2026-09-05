import { useEffect, useState } from 'react'
import Logo from './Logo.jsx'
import Icon from './Icons.jsx'
import LangSwitcher from './LangSwitcher.jsx'
import { navIds, contacts, contactLinks } from '../data/site.js'
import { useI18n } from '../i18n/index.jsx'
import './Header.css'

export default function Header() {
  const { t } = useI18n()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="container header__inner">
        <a href="#top" className="header__logo" onClick={() => setOpen(false)}>
          <Logo />
        </a>

        <nav className={`header__nav ${open ? 'is-open' : ''}`}>
          {navIds.map((id) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
              {t.nav[id]}
            </a>
          ))}
          <a className="btn btn--primary header__nav-cta" href="#contact" onClick={() => setOpen(false)}>
            {t.header.cta}
          </a>
          <div className="header__nav-lang">
            <LangSwitcher variant="menu" />
          </div>
        </nav>

        <div className="header__actions">
          <LangSwitcher />
          <a
            className="header__social header__social--tg"
            href={contactLinks.telegram(contacts)}
            target="_blank"
            rel="noreferrer"
            aria-label="Telegram"
          >
            <Icon name="telegram" size={20} />
          </a>
          <a
            className="header__social header__social--wa"
            href={contactLinks.whatsapp(contacts)}
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
          >
            <Icon name="whatsapp" size={19} />
          </a>
          <a
            className="header__social header__social--ig"
            href={contactLinks.instagram(contacts)}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
          >
            <Icon name="instagram" size={19} />
          </a>
          <button
            className={`burger ${open ? 'is-open' : ''}`}
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  )
}
