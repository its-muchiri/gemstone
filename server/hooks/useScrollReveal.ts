'use client'
import { useEffect, useRef, useCallback } from 'react'

let sharedObserver: IntersectionObserver | null = null
const observedElements = new WeakSet<Element>()

function getObserver() {
  if (sharedObserver) return sharedObserver
  sharedObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed')
          sharedObserver!.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
  )
  return sharedObserver
}

function observeNewElements() {
  const targets = document.querySelectorAll(
    '.scroll-reveal:not(.revealed), .scroll-reveal-left:not(.revealed), .scroll-reveal-scale:not(.revealed)'
  )
  const observer = getObserver()
  targets.forEach((t) => {
    if (!observedElements.has(t)) {
      observedElements.add(t)
      observer.observe(t)
    }
  })
}

export function useScrollReveal() {
  const initRef = useRef(false)

  useEffect(() => {
    if (initRef.current) return
    initRef.current = true

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-scale')
        .forEach((t) => t.classList.add('revealed'))
      return
    }

    observeNewElements()

    const mutationObserver = new MutationObserver(() => {
      observeNewElements()
    })
    mutationObserver.observe(document.body, { childList: true, subtree: true })

    return () => {
      mutationObserver.disconnect()
    }
  }, [])
}
