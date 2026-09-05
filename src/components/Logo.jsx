import { useI18n } from '../i18n/index.jsx'

/**
 * Знак CODEX-UZB: гексагональная «C» + шеврон «<», как на логотипе.
 */
export function LogoMark({ size = 38 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="codex-mark" x1="10" y1="20" x2="95" y2="86" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" />
          <stop offset="0.42" stopColor="#22d3ff" />
          <stop offset="0.72" stopColor="#2b6bff" />
          <stop offset="1" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
      {/* «C» из шестиугольника */}
      <path
        d="M62 12H32L10 50l22 38h30L47 74H41L27 50l14-24h6z"
        fill="url(#codex-mark)"
      />
      {/* шеврон «<», развёрнутый вправо */}
      <path d="M66 12h24L68 50l22 38H66L44 50z" fill="url(#codex-mark)" />
    </svg>
  )
}

export default function Logo({ size = 38, withText = true }) {
  const { t } = useI18n()

  return (
    <span className="logo">
      <LogoMark size={size} />
      {withText && (
        <span className="logo__text">
          <span className="logo__name">
            CODEX<span className="logo__accent">-UZB</span>
          </span>
          <span className="logo__slogan">{t.brand.slogan}</span>
        </span>
      )}
    </span>
  )
}
