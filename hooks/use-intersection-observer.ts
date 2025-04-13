"use client"

import { useEffect, useState, type RefObject } from "react"

interface UseIntersectionObserverProps {
  root?: Element | null
  rootMargin?: string
  threshold?: number | number[]
  target?: RefObject<Element>
  enabled?: boolean
  onIntersect?: () => void
}

export function useIntersectionObserver({
  root = null,
  rootMargin = "0px",
  threshold = 0,
  target,
  enabled = true,
  onIntersect,
}: UseIntersectionObserverProps): boolean {
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    if (!enabled || !target?.current) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsIntersecting(entry.isIntersecting)

          if (entry.isIntersecting && onIntersect) {
            onIntersect()
          }
        })
      },
      {
        root,
        rootMargin,
        threshold,
      },
    )

    observer.observe(target.current)

    return () => {
      if (target.current) {
        observer.unobserve(target.current)
      }
    }
  }, [enabled, root, rootMargin, target, threshold, onIntersect])

  return isIntersecting
}
