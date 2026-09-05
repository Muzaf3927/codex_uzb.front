import Icon from './Icons.jsx'
import { projectMeta } from '../data/site.js'
import { useI18n } from '../i18n/index.jsx'
import './Projects.css'

export default function Projects() {
  const { t } = useI18n()

  return (
    <section className="section" id="projects">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">{t.projects.eyebrow}</span>
          <h2 className="section-title">
            {t.projects.title} <span className="gradient-text">{t.projects.titleAccent}</span>
          </h2>
          <p className="section-sub">{t.projects.sub}</p>
        </div>

        <div className="grid grid--3">
          {t.projects.items.map((p, i) => {
            const meta = projectMeta[i] || { stack: [], link: '' }
            return (
              <article
                className="card project reveal"
                key={i}
                style={{ transitionDelay: `${(i % 3) * 90}ms` }}
              >
                <span className="project__category">{p.category}</span>
                <h3 className="project__title">{p.title}</h3>
                <p className="project__text">{p.text}</p>

                <div className="project__result">
                  <Icon name="check" size={16} />
                  <span>{p.result}</span>
                </div>

                <div className="project__footer">
                  <div className="project__stack">
                    {meta.stack.map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>
                  {meta.link && (
                    <a href={meta.link} target="_blank" rel="noreferrer" className="project__link">
                      {t.projects.link} <Icon name="arrow" size={15} />
                    </a>
                  )}
                </div>
              </article>
            )
          })}
        </div>

        <div className="projects__cta reveal">
          <p>{t.projects.cta.text}</p>
          <a className="btn btn--primary" href="#contact">
            {t.projects.cta.button} <Icon name="arrow" size={17} />
          </a>
        </div>
      </div>
    </section>
  )
}
