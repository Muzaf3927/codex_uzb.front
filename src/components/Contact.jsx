import { useEffect, useState } from 'react'
import Icon from './Icons.jsx'
import { contacts, contactLinks } from '../data/site.js'
import { useI18n } from '../i18n/index.jsx'
import './Contact.css'

/** Куда отправлять заявки: Formspree / Getform / свой backend (см. .env.example) */
const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT || ''

function buildText(form, t) {
  const r = t.contact.request
  return [
    r.title,
    `${r.name}: ${form.name}`,
    `${r.contact}: ${form.contact}`,
    `${r.service}: ${form.service}`,
    `${r.budget}: ${form.budget}`,
    `${r.task}: ${form.message || '—'}`,
  ].join('\n')
}

export default function Contact() {
  const { t, lang } = useI18n()
  const [form, setForm] = useState({ name: '', contact: '', service: '', budget: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | fallback | error
  const [error, setError] = useState('')

  // при смене языка подставляем варианты выбора на новом языке
  useEffect(() => {
    setForm((f) => ({
      ...f,
      service: t.contact.serviceOptions[0],
      budget: t.contact.budgets[1],
    }))
    setError('')
    setStatus('idle')
  }, [lang, t])

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  async function onSubmit(e) {
    e.preventDefault()
    if (!form.name.trim() || !form.contact.trim()) {
      setError(t.contact.form.errorRequired)
      return
    }
    setError('')
    setStatus('sending')

    const text = buildText(form, t)

    // 1. Если задан endpoint — отправляем на него.
    if (ENDPOINT) {
      try {
        const res = await fetch(ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ ...form, lang, text }),
        })
        if (!res.ok) throw new Error('request failed')
        setStatus('sent')
        setForm({
          name: '',
          contact: '',
          service: t.contact.serviceOptions[0],
          budget: t.contact.budgets[1],
          message: '',
        })
        return
      } catch {
        setStatus('error')
        setError(t.contact.form.errorSend)
        return
      }
    }

    // 2. Иначе — копируем заявку в буфер и открываем Telegram.
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      /* буфер может быть недоступен — не критично */
    }
    window.open(contactLinks.telegram(contacts), '_blank', 'noopener')
    setStatus('fallback')
  }

  const l = t.contact.labels
  const f = t.contact.form

  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="contact">
          <div className="contact__info reveal">
            <span className="eyebrow">{t.contact.eyebrow}</span>
            <h2 className="section-title">
              {t.contact.title} <span className="gradient-text">{t.contact.titleAccent}</span>
            </h2>
            <p className="section-sub">{t.contact.sub}</p>

            <ul className="contact__list">
              <li>
                <a href={contactLinks.telegram(contacts)} target="_blank" rel="noreferrer">
                  <span className="contact__ico contact__ico--telegram"><Icon name="telegram" size={20} /></span>
                  <span><b>{l.telegram}</b>@{contacts.telegram}</span>
                </a>
              </li>
              <li>
                <a href={contactLinks.channel(contacts)} target="_blank" rel="noreferrer">
                  <span className="contact__ico contact__ico--telegram"><Icon name="megaphone" size={19} /></span>
                  <span><b>{l.channel}</b>@{contacts.telegramChannel}</span>
                </a>
              </li>
              <li>
                <a href={contactLinks.whatsapp(contacts)} target="_blank" rel="noreferrer">
                  <span className="contact__ico contact__ico--whatsapp"><Icon name="whatsapp" size={20} /></span>
                  <span><b>{l.whatsapp}</b>{contacts.phone}</span>
                </a>
              </li>
              <li>
                <a href={contactLinks.instagram(contacts)} target="_blank" rel="noreferrer">
                  <span className="contact__ico contact__ico--instagram"><Icon name="instagram" size={19} /></span>
                  <span><b>{l.instagram}</b>@{contacts.instagram}</span>
                </a>
              </li>
              <li>
                <a href={contactLinks.phone(contacts)}>
                  <span className="contact__ico contact__ico--phone"><Icon name="phone" size={19} /></span>
                  <span><b>{l.phone}</b>{contacts.phone}</span>
                </a>
              </li>
              <li>
                <a href={contactLinks.email(contacts)}>
                  <span className="contact__ico contact__ico--mail"><Icon name="mail" size={19} /></span>
                  <span><b>{l.email}</b>{contacts.email}</span>
                </a>
              </li>
              <li>
                <div>
                  <span className="contact__ico contact__ico--pin"><Icon name="pin" size={19} /></span>
                  <span><b>{l.location}</b>{t.contact.location}</span>
                </div>
              </li>
              <li>
                <div>
                  <span className="contact__ico contact__ico--clock"><Icon name="clock" size={19} /></span>
                  <span><b>{l.workHours}</b>{t.contact.workHours}</span>
                </div>
              </li>
            </ul>
          </div>

          <form className="contact__form card reveal" onSubmit={onSubmit} noValidate>
            <h3 className="contact__form-title">{f.title}</h3>

            <div className="field">
              <label htmlFor="name">{f.name}</label>
              <input id="name" value={form.name} onChange={update('name')} placeholder={f.namePlaceholder} />
            </div>

            <div className="field">
              <label htmlFor="contact">{f.contact}</label>
              <input
                id="contact"
                value={form.contact}
                onChange={update('contact')}
                placeholder={f.contactPlaceholder}
              />
            </div>

            <div className="field-row">
              <div className="field">
                <label htmlFor="service">{f.service}</label>
                <select id="service" value={form.service} onChange={update('service')}>
                  {t.contact.serviceOptions.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="budget">{f.budget}</label>
                <select id="budget" value={form.budget} onChange={update('budget')}>
                  {t.contact.budgets.map((b) => (
                    <option key={b}>{b}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="field">
              <label htmlFor="message">{f.message}</label>
              <textarea
                id="message"
                rows={4}
                value={form.message}
                onChange={update('message')}
                placeholder={f.messagePlaceholder}
              />
            </div>

            {error && <p className="form-msg form-msg--error">{error}</p>}
            {status === 'sent' && <p className="form-msg form-msg--ok">{f.sent}</p>}
            {status === 'fallback' && <p className="form-msg form-msg--ok">{f.fallback}</p>}

            <button className="btn btn--primary btn--lg contact__submit" disabled={status === 'sending'}>
              {status === 'sending' ? f.sending : f.submit}
              {status !== 'sending' && <Icon name="arrow" size={18} />}
            </button>

            <p className="contact__note">{f.note}</p>
          </form>
        </div>
      </div>
    </section>
  )
}
