import Icon from './Icons.jsx'
import { useI18n } from '../i18n/index.jsx'
import './Process.css'

export default function Process() {
  const { t } = useI18n()

  return (
    <section className="section" id="process">
      <div className="container">
        <div className="section-head section-head--center reveal">
          <span className="eyebrow">{t.process.eyebrow}</span>
          <h2 className="section-title">
            {t.process.title} <span className="gradient-text">{t.process.titleAccent}</span>
          </h2>
          <p className="section-sub">{t.process.sub}</p>
        </div>

        <div className="process">
          {t.process.steps.map((p, i) => (
            <div className="process__step reveal" key={i} style={{ transitionDelay: `${i * 100}ms` }}>
              <span className="process__num">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="process__title">{p.title}</h3>
              <p className="process__text">{p.text}</p>
            </div>
          ))}
        </div>

        <div className="advantages">
          {t.process.advantages.map((a, i) => (
            <div className="advantage reveal" key={i} style={{ transitionDelay: `${(i % 2) * 90}ms` }}>
              <span className="advantage__check"><Icon name="check" size={15} /></span>
              <div>
                <h4 className="advantage__title">{a.title}</h4>
                <p className="advantage__text">{a.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
