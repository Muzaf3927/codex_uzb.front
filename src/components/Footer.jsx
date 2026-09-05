import Logo from './Logo.jsx'
import Icon from './Icons.jsx'
import { navIds, contacts, contactLinks, brand } from '../data/site.js'
import { useI18n } from '../i18n/index.jsx'
import './Footer.css'

export default function Footer() {
  const { t } = useI18n()
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Logo size={42} />
            <p className="footer__about">{t.footer.about}</p>
            <div className="footer__socials">
              <a
                className="footer__social footer__social--telegram"
                href={contactLinks.telegram(contacts)}
                target="_blank"
                rel="noreferrer"
                aria-label="Telegram"
              >
                <Icon name="telegram" size={19} />
              </a>
              <a
                className="footer__social footer__social--telegram"
                href={contactLinks.channel(contacts)}
                target="_blank"
                rel="noreferrer"
                aria-label="Telegram channel"
              >
                <Icon name="megaphone" size={19} />
              </a>
              <a
                className="footer__social footer__social--whatsapp"
                href={contactLinks.whatsapp(contacts)}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
              >
                <Icon name="whatsapp" size={19} />
              </a>
              <a
                className="footer__social footer__social--instagram"
                href={contactLinks.instagram(contacts)}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <Icon name="instagram" size={19} />
              </a>
              <a className="footer__social footer__social--mail" href={contactLinks.email(contacts)} aria-label="Email">
                <Icon name="mail" size={19} />
              </a>
              <a className="footer__social footer__social--phone" href={contactLinks.phone(contacts)} aria-label="Phone">
                <Icon name="phone" size={19} />
              </a>
            </div>
          </div>

          <div className="footer__col">
            <h4>{t.footer.navTitle}</h4>
            {navIds.map((id) => (
              <a key={id} href={`#${id}`}>{t.nav[id]}</a>
            ))}
          </div>

          <div className="footer__col">
            <h4>{t.footer.servicesTitle}</h4>
            {t.services.items.slice(0, 5).map((s) => (
              <a key={s.title} href="#services">{s.title}</a>
            ))}
          </div>

          <div className="footer__col">
            <h4>{t.footer.contactsTitle}</h4>
            <a href={contactLinks.telegram(contacts)} target="_blank" rel="noreferrer">
              {t.footer.telegram}: @{contacts.telegram}
            </a>
            <a href={contactLinks.channel(contacts)} target="_blank" rel="noreferrer">
              {t.footer.channel}: @{contacts.telegramChannel}
            </a>
            <a href={contactLinks.instagram(contacts)} target="_blank" rel="noreferrer">
              {t.footer.instagram}: @{contacts.instagram}
            </a>
            <a href={contactLinks.whatsapp(contacts)} target="_blank" rel="noreferrer">
              WhatsApp: {contacts.phone}
            </a>
            <a href={contactLinks.phone(contacts)}>{contacts.phone}</a>
            <a href={contactLinks.email(contacts)}>{contacts.email}</a>
            <span>{t.contact.location}</span>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {year} {brand.name}. {t.footer.rights}</span>
          <span className="footer__slogan">{t.brand.slogan}</span>
        </div>
      </div>
    </footer>
  )
}
