import { useState } from 'react'
import Icon from './Icons.jsx'
import { useI18n } from '../i18n/index.jsx'
import './Faq.css'

export default function Faq() {
  const { t } = useI18n()
  const [open, setOpen] = useState(0)

  return (
    <section className="section section--tight" id="faq">
      <div className="container faq__inner">
        <div className="section-head reveal">
          <span className="eyebrow">{t.faq.eyebrow}</span>
          <h2 className="section-title">{t.faq.title}</h2>
          <p className="section-sub">{t.faq.sub}</p>
        </div>

        <div className="faq reveal">
          {t.faq.items.map((item, i) => (
            <div className={`faq__item ${open === i ? 'is-open' : ''}`} key={i}>
              <button className="faq__q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                <span>{item.q}</span>
                <Icon name="plus" size={20} className="faq__icon" />
              </button>
              <div className="faq__a">
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
