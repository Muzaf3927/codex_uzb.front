import { stackGroups } from '../data/site.js'
import { useI18n } from '../i18n/index.jsx'
import './Stack.css'

export default function Stack() {
  const { t } = useI18n()

  return (
    <section className="section section--tight" id="stack">
      <div className="container">
        <div className="section-head section-head--center reveal">
          <span className="eyebrow">{t.stack.eyebrow}</span>
          <h2 className="section-title">
            {t.stack.title} <span className="gradient-text">{t.stack.titleAccent}</span>
          </h2>
          <p className="section-sub">{t.stack.sub}</p>
        </div>

        <div className="stack">
          {stackGroups.map((group, i) => (
            <div className="stack__group reveal" key={group.key} style={{ transitionDelay: `${i * 80}ms` }}>
              <h3 className="stack__name">{t.stack.groups[group.key]}</h3>
              <div className="stack__items">
                {group.items.map((tech) => (
                  <span className="stack__item" key={tech}>{tech}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
