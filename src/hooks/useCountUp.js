// useCountUp animates a number from 0 to 'end' when it scrolls into view.
// Returns [displayCount, ref] — attach ref to the element to watch.
// Usage: const [count, ref] = useCountUp(1500)  →  <span ref={ref}>{count}</span>
import { useState, useEffect, useRef } from 'react'

export function useCountUp(end, duration = 1800) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef(null)

  // Watch for the element to enter the viewport
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [hasStarted])

  // Once started, animate the count up
  useEffect(() => {
    if (!hasStarted) return

    let startTime = null

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      // Ease-out curve: starts fast, slows at the end
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * end))
      if (progress < 1) requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }, [hasStarted, end, duration])

  return [count, ref]
}
