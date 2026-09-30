import { useState, useEffect, useRef } from 'react'

const GLYPHS = '01XYZ0123456789_#*<>[]/=+'

export function useTextScramble(targetText, speed = 25) {
  const [displayText, setDisplayText] = useState(targetText)
  const animRef = useRef(null)

  useEffect(() => {
    let iteration = 0
    const maxIterations = targetText.length

    clearInterval(animRef.current)

    animRef.current = setInterval(() => {
      setDisplayText(() => {
        return targetText
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' '
            if (index < iteration) {
              return targetText[index]
            }
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          })
          .join('')
      })

      if (iteration >= maxIterations) {
        clearInterval(animRef.current)
      }

      iteration += 1 / 2
    }, speed)

    return () => clearInterval(animRef.current)
  }, [targetText, speed])

  return displayText
}
