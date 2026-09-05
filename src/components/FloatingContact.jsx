import { useEffect, useRef, useState } from 'react'
import Icon from './Icons.jsx'
import { contacts, contactLinks } from '../data/site.js'
import { useI18n } from '../i18n/index.jsx'
import './FloatingContact.css'

export default function FloatingContact() {
  const { t } = useI18n()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  // на телефоне наведения нет — закрываем по клику вне кнопки
  useEffect(() => {
    if (!open) return
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const items = [
    {
      key: 'telegram',
      icon: 'telegram',
      label: 'Telegram',
      value: `@${contacts.telegram}`,
      href: contactLinks.telegram(contacts),
    },
    {
      key: 'whatsapp',
      icon: 'whatsapp',
      label: 'WhatsApp',
      value: contacts.phone,
      href: contactLinks.whatsapp(contacts),
    },
    {
      key: 'instagram',
      icon: 'instagram',
      label: 'Instagram',
      value: `@${contacts.instagram}`,
      href: contactLinks.instagram(contacts),
    },
  ]

  return (
    <div
      className={`fab ${open ? 'is-open' : ''}`}
      ref={ref}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <ul className="fab__list">
        {items.map((item, i) => (
          <li key={item.key} style={{ transitionDelay: `${open ? i * 55 : (2 - i) * 40}ms` }}>
            <a
              className={`fab__item fab__item--${item.key}`}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
            >
              <span className="fab__tip">
                <b>{item.label}</b>
                {item.value}
              </span>
              <span className="fab__icon"><Icon name={item.icon} size={21} /></span>
            </a>
          </li>
        ))}
      </ul>

      <button
        className="fab__main"
        onClick={() => setOpen((v) => !v)}
        aria-label={t.header.cta}
        aria-expanded={open}
      >
        <span className="fab__pulse" />
        <span className="fab__main-icon">
          <Icon name={open ? 'close' : 'phone'} size={24} />
        </span>
      </button>
    </div>
  )
}
