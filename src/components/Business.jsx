import Icon from './Icons.jsx'
import { businessIcons } from '../data/site.js'
import { useI18n } from '../i18n/index.jsx'
import './Business.css'

export default function Business() {
  const { t } = useI18n()

  return (
    <section className="section business-section" id="business">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">{t.business.eyebrow}</span>
          <h2 className="section-title">
            {t.business.title} <span className="gradient-text">{t.business.titleAccent}</span>
          </h2>
          <p className="section-sub">{t.business.sub}</p>
        </div>

        <div className="grid grid--3">
          {t.business.items.map((b, i) => (
            <article
              className="card business reveal"
              key={i}
              style={{ transitionDelay: `${(i % 3) * 90}ms` }}
            >
              <div className="business__icon">
                <Icon name={businessIcons[i]} size={22} />
              </div>
              <h3 className="business__title">{b.title}</h3>
              <p className="business__text">{b.text}</p>
            </article>
          ))}
        </div>

        <div className="business__results reveal">
          {t.business.results.map((r) => (
            <div className="business__result" key={r.value}>
              <div className="business__result-value gradient-text">{r.value}</div>
              <div className="business__result-label">{r.label}</div>
            </div>
          ))}
        </div>

        <div className="business__cta reveal">
          <div>
            <h3>{t.business.cta.title}</h3>
            <p>{t.business.cta.text}</p>
          </div>
          <a className="btn btn--primary btn--lg" href="#contact">
            {t.business.cta.button} <Icon name="arrow" size={18} />
          </a>
        </div>
      </div>
    </section>
  )
}
