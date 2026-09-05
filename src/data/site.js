/**
 * Технические данные сайта: контакты, иконки, ссылки и списки технологий.
 * Весь переводимый текст лежит в src/i18n/{ru,uz,en,zh}.js
 */

export const brand = {
  name: 'CODEX-UZB',
}

export const contacts = {
  /** Официальный аккаунт для связи */
  telegram: import.meta.env.VITE_TELEGRAM || 'codex_uz',
  /** Телеграм-канал команды */
  telegramChannel: import.meta.env.VITE_TELEGRAM_CHANNEL || 'codex_uzb',
  instagram: import.meta.env.VITE_INSTAGRAM || 'codex_uzb',
  /** WhatsApp — только цифры, без пробелов и плюса */
  whatsapp: import.meta.env.VITE_WHATSAPP || '998900038902',
  phone: import.meta.env.VITE_PHONE || '+998 90 003 89 02',
  email: import.meta.env.VITE_EMAIL || 'hamroyevmuzaf@gmail.com',
}

export const contactLinks = {
  telegram: (c) => `https://t.me/${c.telegram}`,
  channel: (c) => `https://t.me/${c.telegramChannel}`,
  instagram: (c) => `https://www.instagram.com/${c.instagram}`,
  whatsapp: (c) => `https://wa.me/${c.whatsapp}`,
  phone: (c) => `tel:${c.phone.replace(/[^+\d]/g, '')}`,
  email: (c) => `mailto:${c.email}`,
}

/** Порядок разделов в меню — подписи берутся из перевода (t.nav) */
export const navIds = ['services', 'business', 'projects', 'process', 'stack', 'contact']

/** Иконки услуг — по порядку t.services.items */
export const serviceIcons = ['code', 'mobile', 'monitor', 'cloud', 'rocket', 'shield', 'ai']

/** Иконки блока «для бизнеса» — по порядку t.business.items */
export const businessIcons = ['gear', 'monitor', 'telegram', 'cloud', 'design', 'shield']

/**
 * Технические данные проектов — по порядку t.projects.items.
 * Добавьте `link`, чтобы на карточке появилась кнопка «Смотреть».
 */
export const projectMeta = [
  { stack: ['React', 'Node.js', 'PostgreSQL'], link: '' },
  { stack: ['Next.js', 'NestJS', 'Docker'], link: '' },
  { stack: ['React Native', 'Go', 'Redis'], link: '' },
  { stack: ['Vue', 'Python', 'WebSocket'], link: '' },
  { stack: ['React', 'Firebase', 'Stripe'], link: '' },
  { stack: ['Telegram API', 'Node.js', '1C'], link: '' },
]

/** Названия групп берутся из перевода (t.stack.groups) по ключу */
export const stackGroups = [
  { key: 'frontend', items: ['React', 'Next.js', 'Vue', 'TypeScript', 'Tailwind'] },
  { key: 'mobile', items: ['React Native', 'Flutter', 'Swift', 'Kotlin'] },
  { key: 'backend', items: ['Node.js', 'NestJS', 'Python', 'Go', 'Laravel'] },
  { key: 'infra', items: ['PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'AWS', 'CI/CD'] },
]
