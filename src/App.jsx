import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Services from './components/Services.jsx'
import Business from './components/Business.jsx'
import Projects from './components/Projects.jsx'
import Process from './components/Process.jsx'
import Stack from './components/Stack.jsx'
import Faq from './components/Faq.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import FloatingContact from './components/FloatingContact.jsx'
import useReveal from './components/useReveal.js'
import { I18nProvider, useI18n, DEFAULT_LANG } from './i18n/index.jsx'

export function Site() {
  const { lang } = useI18n()
  useReveal(lang)

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Business />
        <Projects />
        <Process />
        <Stack />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <FloatingContact />
    </>
  )
}

export default function App({ lang = DEFAULT_LANG }) {
  return (
    <I18nProvider lang={lang}>
      <Site />
    </I18nProvider>
  )
}
