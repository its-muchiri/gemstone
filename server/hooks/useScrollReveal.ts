import { useEffect, useRef, useCallback } from 'react'

export function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)

  const observe = useCallback(() => {
    const targets = document.querySelectorAll(
      '.scroll-reveal:not(.revealed), .scroll-reveal-left:not(.revealed), .scroll-reveal-scale:not(.revealed)'
    )

    if (!targets.length) return

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReduced) {
      targets.forEach((t) => t.classList.add('revealed'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
    )

    targets.forEach((t) => observer.observe(t))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const cleanup = observe()

    const onScroll = () => {
      observe()
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      cleanup?.()
      window.removeEventListener('scroll', onScroll)
    }
  }, [observe])

  return ref
}
