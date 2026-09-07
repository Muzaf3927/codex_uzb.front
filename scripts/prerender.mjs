/**
 * Собирает статические HTML-страницы для каждого языка:
 *   dist/index.html (uz), dist/ru/, dist/en/, dist/zh/
 * плюс sitemap.xml.
 *
 * Зачем: поисковый робот получает готовый текст сразу в HTML, а не после
 * запуска JavaScript, и у каждого языка появляется собственный адрес,
 * который можно найти в поиске.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { render, languages, languageList, langHref, contacts, contactLinks, brand } from '../dist-ssr/entry-server.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')

const SITE = 'https://www.codex-uzb.uz'
const abs = (p) => SITE + p
const LAST_MOD = new Date().toISOString().slice(0, 10)

const OG_LOCALE = { uz: 'uz_UZ', ru: 'ru_RU', en: 'en_US', zh: 'zh_CN' }

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** Микроразметка: организация, сайт и блок «частые вопросы». */
function jsonLd(t, lang) {
  const url = abs(langHref(lang))

  const organization = {
    '@type': 'ProfessionalService',
    '@id': SITE + '/#organization',
    name: brand.name,
    alternateName: 'CODEX UZB',
    url: SITE + '/',
    logo: abs('/logo-512.png'),
    image: abs('/logo-512.png'),
    description: t.meta.description,
    slogan: t.brand.slogan,
    telephone: contacts.phone,
    email: contacts.email,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Tashkent',
      addressRegion: 'Tashkent',
      addressCountry: 'UZ',
    },
    areaServed: [
      { '@type': 'Country', name: 'Uzbekistan' },
      { '@type': 'Country', name: 'Kazakhstan' },
      { '@type': 'Country', name: 'Russia' },
    ],
    knowsLanguage: ['uz', 'ru', 'en', 'zh'],
    sameAs: [
      contactLinks.telegram(contacts),
      contactLinks.channel(contacts),
      contactLinks.instagram(contacts),
    ],
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '19:00',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: t.services.eyebrow,
      itemListElement: t.services.items.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.title, description: s.text },
      })),
    },
  }

  const website = {
    '@type': 'WebSite',
    '@id': SITE + '/#website',
    url,
    name: brand.name,
    description: t.meta.description,
    inLanguage: t.htmlLang,
    publisher: { '@id': SITE + '/#organization' },
  }

  const faq = {
    '@type': 'FAQPage',
    '@id': url + '#faq',
    inLanguage: t.htmlLang,
    mainEntity: t.faq.items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }

  return JSON.stringify({ '@context': 'https://schema.org', '@graph': [organization, website, faq] })
}

function head(t, lang) {
  const url = abs(langHref(lang))
  const alternates = languageList
    .map((l) => `    <link rel="alternate" hreflang="${l.htmlLang}" href="${abs(langHref(l.code))}" />`)
    .join('\n')

  return `
    <title>${esc(t.meta.title)}</title>
    <meta name="description" content="${esc(t.meta.description)}" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <link rel="canonical" href="${url}" />
${alternates}
    <link rel="alternate" hreflang="x-default" href="${SITE}/" />
    <meta name="author" content="${esc(brand.name)}" />
    <meta name="geo.region" content="UZ-TK" />
    <meta name="geo.placename" content="Tashkent" />
    <meta property="og:site_name" content="${esc(brand.name)}" />
    <meta property="og:title" content="${esc(t.meta.title)}" />
    <meta property="og:description" content="${esc(t.meta.description)}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${abs('/logo-512.png')}" />
    <meta property="og:image:width" content="512" />
    <meta property="og:image:height" content="512" />
    <meta property="og:locale" content="${OG_LOCALE[lang]}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(t.meta.title)}" />
    <meta name="twitter:description" content="${esc(t.meta.description)}" />
    <meta name="twitter:image" content="${abs('/logo-512.png')}" />
    <script type="application/ld+json">${jsonLd(t, lang)}</script>`
}

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')

for (const l of languageList) {
  const t = languages[l.code]
  const html = template
    .replace(/<!--seo-->[\s\S]*?<!--\/seo-->/, head(t, l.code).trim())
    .replace('<!--app-html-->', render(l.code))
    .replace('<html lang="uz"', `<html lang="${t.htmlLang}"`)

  const dir = l.code === 'uz' ? dist : path.join(dist, l.code)
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, 'index.html'), html)
  console.log(`prerendered ${langHref(l.code)}`)
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${languageList
  .map(
    (l) => `  <url>
    <loc>${abs(langHref(l.code))}</loc>
${languageList
  .map((a) => `    <xhtml:link rel="alternate" hreflang="${a.htmlLang}" href="${abs(langHref(a.code))}" />`)
  .join('\n')}
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}/" />
    <lastmod>${LAST_MOD}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${l.code === 'uz' ? '1.0' : '0.9'}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap)
console.log('sitemap.xml')
