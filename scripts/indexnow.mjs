/**
 * Уведомляет Bing и Яндекс об изменившихся страницах (протокол IndexNow).
 * Регистрация не нужна — достаточно файла-ключа в корне сайта.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const key = fs.readFileSync(path.join(root, '.indexnow-key'), 'utf8').trim()

const host = 'www.codex-uzb.uz'
const urlList = ['/', '/ru/', '/en/', '/zh/'].map((p) => `https://${host}${p}`)

const body = { host, key, keyLocation: `https://${host}/${key}.txt`, urlList }

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify(body),
})

console.log(`IndexNow: ${res.status} ${res.statusText}`)
console.log(urlList.join('\n'))
if (res.status !== 200 && res.status !== 202) console.log(await res.text())
