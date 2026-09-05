import Icon from './Icons.jsx'
import { serviceIcons } from '../data/site.js'
import { useI18n } from '../i18n/index.jsx'
import './Services.css'

export default function Services() {
  const { t } = useI18n()

  return (
    <section className="section" id="services">
      <div className="container">
        <div className="section-head section-head--center reveal">
          <span className="eyebrow">{t.services.eyebrow}</span>
          <h2 className="section-title">
            {t.services.title} <span className="gradient-text">{t.services.titleAccent}</span>
          </h2>
          <p className="section-sub">{t.services.sub}</p>
        </div>

        <div className="grid grid--3">
          {t.services.items.map((s, i) => (
            <article
              className={`card service reveal${i === t.services.items.length - 1 ? ' service--wide' : ''}`}
              key={i}
              style={{ transitionDelay: `${(i % 3) * 90}ms` }}
            >
              <div className="service__icon">
                <Icon name={serviceIcons[i]} size={24} />
              </div>
              <h3 className="service__title">{s.title}</h3>
              <p className="service__text">{s.text}</p>
              <ul className="service__tags">
                {s.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
