/**
 * Проверка живого сайта: всё ли на месте для поисковиков.
 * Запуск: node scripts/seo-check.mjs
 */
const SITE = 'https://www.codex-uzb.uz'
const LANGS = [
  { code: 'uz', path: '/', htmlLang: 'uz', word: 'Veb-saytlar' },
  { code: 'ru', path: '/ru/', htmlLang: 'ru', word: 'Веб-сайты' },
  { code: 'en', path: '/en/', htmlLang: 'en', word: 'Websites' },
  { code: 'zh', path: '/zh/', htmlLang: 'zh-Hans', word: '网站' },
]

let pass = 0, fail = 0, warn = 0
const ok = (m) => { pass++; console.log(`  ✅ ${m}`) }
const bad = (m) => { fail++; console.log(`  ❌ ${m}`) }
const wrn = (m) => { warn++; console.log(`  ⚠️  ${m}`) }
const check = (cond, good, badMsg) => (cond ? ok(good) : bad(badMsg))

const get = async (url, opts = {}) => {
  const res = await fetch(url, { redirect: 'manual', ...opts })
  const body = res.status < 300 ? await res.text() : ''
  return { status: res.status, headers: res.headers, body }
}

console.log('\n=== 1. Технические файлы ===')
const robots = await get(`${SITE}/robots.txt`)
check(robots.status === 200, 'robots.txt отдаётся', `robots.txt → ${robots.status}`)
check(/Sitemap:\s*https:\/\/www\.codex-uzb\.uz\/sitemap\.xml/.test(robots.body), 'в robots.txt указан sitemap', 'в robots.txt нет ссылки на sitemap')
check(!/Disallow:\s*\/\s*$/m.test(robots.body), 'сайт не закрыт от индексации', 'ВНИМАНИЕ: robots.txt запрещает индексацию!')

const sm = await get(`${SITE}/sitemap.xml`)
check(sm.status === 200, 'sitemap.xml отдаётся', `sitemap.xml → ${sm.status}`)
const locs = [...sm.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
check(locs.length === 4, `в sitemap 4 страницы: ${locs.join(' ')}`, `в sitemap ${locs.length} страниц вместо 4`)

console.log('\n=== 2. Редиректы ===')
const apex = await get('https://codex-uzb.uz/')
check([301, 308].includes(apex.status) && (apex.headers.get('location') || '').includes('www.'), `без-www → www (${apex.status})`, `без-www отдаёт ${apex.status} — Google может счесть это дублем сайта`)
const insecure = await get('http://www.codex-uzb.uz/')
check([301, 307, 308].includes(insecure.status), `http → https (${insecure.status})`, `http отдаёт ${insecure.status}`)

console.log('\n=== 3. Страницы ===')
for (const l of LANGS) {
  console.log(`\n  --- ${l.code.toUpperCase()} ${l.path}`)
  const p = await get(SITE + l.path)
  if (p.status !== 200) { bad(`страница отдаёт ${p.status}`); continue }
  ok('страница отдаётся (200)')

  const title = (p.body.match(/<title>([^<]*)<\/title>/) || [])[1] || ''
  check(title.length > 20 && title.length < 75, `title (${title.length} симв.): ${title}`, `title длиной ${title.length} — нужно 20–70: ${title}`)

  const desc = (p.body.match(/<meta name="description" content="([^"]*)"/) || [])[1] || ''
  check(desc.length > 70 && desc.length < 175, `description (${desc.length} симв.)`, `description длиной ${desc.length} — нужно 70–170`)

  const canon = (p.body.match(/rel="canonical" href="([^"]*)"/) || [])[1]
  check(canon === SITE + l.path, `canonical правильный`, `canonical = ${canon}, ожидался ${SITE + l.path}`)

  const htmlLang = (p.body.match(/<html lang="([^"]*)"/) || [])[1]
  check(htmlLang === l.htmlLang, `lang="${htmlLang}"`, `lang="${htmlLang}", ожидался "${l.htmlLang}"`)

  const hreflangs = [...p.body.matchAll(/hreflang="([^"]+)" href="([^"]+)"/g)].map((m) => m[1])
  check(hreflangs.length === 5, `hreflang на все языки + x-default`, `hreflang: ${hreflangs.length} вместо 5`)

  // главное: есть ли текст в HTML без запуска JavaScript
  const root = (p.body.match(/<div id="root">([\s\S]*)<\/div>\s*<\/body>/) || [])[1] || ''
  const text = root.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
  check(text.length > 2000, `текст в HTML без JS: ${text.length} символов`, `в HTML почти нет текста (${text.length} симв.) — робот увидит пустую страницу`)
  check(p.body.includes(l.word), `контент на нужном языке («${l.word}» найдено)`, `не найден ожидаемый текст «${l.word}» — язык страницы неверный`)

  const h1 = [...p.body.matchAll(/<h1[^>]*>/g)].length
  check(h1 === 1, 'ровно один заголовок H1', `H1 на странице: ${h1} (нужен ровно 1)`)

  const ld = (p.body.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/) || [])[1]
  try {
    const types = JSON.parse(ld)['@graph'].map((x) => x['@type'])
    check(types.includes('ProfessionalService') && types.includes('FAQPage'), `микроразметка: ${types.join(', ')}`, `микроразметка неполная: ${types.join(', ')}`)
  } catch { bad('микроразметка Schema.org отсутствует или сломана') }

  const og = ['og:title', 'og:description', 'og:image', 'og:url'].filter((t) => p.body.includes(`property="${t}"`))
  check(og.length === 4, 'Open Graph для соцсетей', `Open Graph неполный: ${og.join(', ')}`)
}

console.log('\n=== 4. Подтверждение прав и IndexNow ===')
const home = await get(SITE + '/')
check(/google-site-verification/.test(home.body), 'тег Google Search Console на месте', 'нет тега подтверждения Google')
if (/yandex-verification/.test(home.body)) ok('тег Яндекс.Вебмастера на месте')
else wrn('нет тега Яндекс.Вебмастера — для русскоязычных запросов стоит добавить')

const fs = await import('node:fs')
const key = fs.readFileSync(new URL('../.indexnow-key', import.meta.url), 'utf8').trim()
const keyFile = await get(`${SITE}/${key}.txt`)
check(keyFile.status === 200 && keyFile.body.trim() === key, 'ключ IndexNow доступен (Bing/Яндекс)', `ключ IndexNow → ${keyFile.status}`)

console.log('\n=== 5. Скорость и отдача ===')
const t0 = Date.now()
await get(SITE + '/ru/')
const ms = Date.now() - t0
check(ms < 1500, `главная отвечает за ${ms} мс`, `медленный ответ: ${ms} мс`)
check((home.headers.get('content-type') || '').includes('text/html'), 'корректный content-type', 'странный content-type')

console.log(`\n${'='.repeat(50)}\nИТОГО: ✅ ${pass} пройдено   ❌ ${fail} ошибок   ⚠️  ${warn} замечаний\n`)
if (fail) console.log('Есть ошибки — смотрите строки с ❌ выше.\n')
