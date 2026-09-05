import Icon from './Icons.jsx'
import { useI18n } from '../i18n/index.jsx'
import './Hero.css'

const chipIcons = ['code', 'mobile', 'monitor', 'cloud', 'ai']

function buildCodeLines(t) {
  return [
    { indent: 0, parts: [['kw', 'const'], ['sp', ' '], ['var', 'team'], ['sp', ' = '], ['fn', 'CodexUzb'], ['sp', '({']] },
    { indent: 1, parts: [['key', 'focus'], ['sp', ': ['], ['str', "'web'"], ['sp', ', '], ['str', "'mobile'"], ['sp', ', '], ['str', "'software'"], ['sp', '],']] },
    { indent: 1, parts: [['key', 'projects'], ['sp', ': '], ['num', '50'], ['sp', ',']] },
    { indent: 1, parts: [['key', 'deadline'], ['sp', ': '], ['str', `'${t.hero.code.deadline}'`], ['sp', ',']] },
    { indent: 0, parts: [['sp', '})']] },
    { indent: 0, parts: [] },
    { indent: 0, parts: [['var', 'team'], ['sp', '.'], ['fn', 'build'], ['sp', '('], ['var', 'yourIdea'], ['sp', ')']] },
    { indent: 0, parts: [['cm', t.hero.code.comment]] },
  ]
}

export default function Hero() {
  const { t } = useI18n()
  const codeLines = buildCodeLines(t)

  return (
    <section className="hero" id="top">
      <div className="container hero__inner">
        <div className="hero__content">
          <span className="hero__badge">
            <span className="hero__dot" />
            {t.hero.badge}
          </span>

          <h1 className="hero__title">
            {t.hero.titleMain}
            <br />
            <span className="gradient-text">{t.hero.titleAccent}</span>
          </h1>

          <p className="hero__subtitle">{t.brand.subtitle}</p>

          <p className="hero__text">{t.hero.text}</p>

          <div className="hero__actions">
            <a className="btn btn--primary btn--lg" href="#contact">
              {t.hero.ctaPrimary} <Icon name="arrow" size={18} />
            </a>
            <a className="btn btn--ghost btn--lg" href="#projects">
              {t.hero.ctaSecondary}
            </a>
          </div>

          <div className="hero__stats">
            {t.hero.stats.map((s) => (
              <div key={s.value} className="hero__stat">
                <div className="hero__stat-value gradient-text">{s.value}</div>
                <div className="hero__stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="hero__visual">
          <div className="code-window">
            <div className="code-window__bar">
              <span className="code-window__dots"><i /><i /><i /></span>
              <span className="code-window__file">codex.js</span>
            </div>
            <pre className="code-window__body">
              {codeLines.map((line, i) => (
                <div className="code-line" key={i} style={{ animationDelay: `${i * 0.09}s` }}>
                  <span className="code-line__no">{i + 1}</span>
                  <span style={{ paddingLeft: line.indent * 20 }}>
                    {line.parts.map(([cls, text], j) => (
                      <span className={`t-${cls}`} key={j}>{text}</span>
                    ))}
                  </span>
                </div>
              ))}
            </pre>
          </div>

          {t.hero.chips.map((chip, i) => (
            <div className={`hero__chip hero__chip--${i + 1}`} key={i}>
              <Icon name={chipIcons[i]} size={18} /> {chip}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
