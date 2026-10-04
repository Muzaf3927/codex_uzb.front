import { useEffect, useState } from 'react'
import Logo from './Logo.jsx'
import LangSwitcher from './LangSwitcher.jsx'
import { navIds } from '../data/site.js'
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

  // Пока меню открыто, страница под ним не прокручивается, а плавающая кнопка
  // связи прячется — она лежит выше меню по z-index и иначе висела бы поверх
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    document.body.classList.toggle('menu-open', open)
    return () => {
      document.body.style.overflow = ''
      document.body.classList.remove('menu-open')
    }
  }, [open])

  // Escape закрывает меню
  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // Если экран стал широким (поворот телефона, разворот окна), бургер исчезает
  // вместе с кнопкой закрытия — меню нужно закрыть самим, иначе прокрутка
  // страницы останется заблокированной, а выключить её будет нечем
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 980) setOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

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
