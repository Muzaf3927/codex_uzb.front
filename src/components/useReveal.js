import { useEffect } from 'react'

/**
 * Плавное появление блоков при скролле (все элементы с классом .reveal).
 * `dep` перезапускает наблюдение — например, при смене языка,
 * когда часть узлов пересоздаётся заново.
 */
export default function useReveal(dep) {
  useEffect(() => {
    const nodes = document.querySelectorAll('.reveal:not(.is-visible)')
    if (!nodes.length) return

    if (!('IntersectionObserver' in window)) {
      nodes.forEach((n) => n.classList.add('is-visible'))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' },
    )

    nodes.forEach((n) => io.observe(n))
    return () => io.disconnect()
  }, [dep])
}
