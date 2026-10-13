import { useState, useEffect, useRef, useCallback } from 'react'

export const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
export const GLYPHS = '01XYZ0123456789_#*<>[]/=+-@$!?'

export function useTextScramble(targetText, speed = 25, isContinuous = false) {
  const [displayText, setDisplayText] = useState(targetText)
  const animRef = useRef(null)

  useEffect(() => {
    let iteration = 0
    const maxIterations = targetText.length

    clearInterval(animRef.current)

    if (isContinuous) {
      // Continuous random live signal packet glyph shuffle (SignalIQ style)
      animRef.current = setInterval(() => {
        setDisplayText(() => {
          return targetText
            .split('')
            .map((char) => {
              if (char === ' ') return ' '
              // 20% random chance to show original char, 80% scramble glyph
              if (Math.random() < 0.2) return char
              return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
            })
            .join('')
        })
      }, speed * 1.6)
    } else {
      // Progressive decode/lock-in animation to target text
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
          setDisplayText(targetText)
        }

        iteration += 1 / 2
      }, speed)
    }

    return () => clearInterval(animRef.current)
  }, [targetText, speed, isContinuous])

  return displayText
}

/**
 * Triggerable scramble hook (e.g. for hover events)
 * Scrambles characters with alphabet letters only (A-Z), then locks back to target text.
 */
export function useHoverScramble(targetText, speed = 30, totalIterations = 8, charPool = LETTERS) {
  const [displayText, setDisplayText] = useState(targetText)
  const animRef = useRef(null)

  useEffect(() => {
    setDisplayText(targetText)
  }, [targetText])

  const trigger = useCallback(() => {
    clearInterval(animRef.current)
    let iteration = 0

    animRef.current = setInterval(() => {
      setDisplayText(() => {
        return targetText
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' '
            if (iteration >= totalIterations - (targetText.length - index)) {
              return targetText[index]
            }
            return charPool[Math.floor(Math.random() * charPool.length)]
          })
          .join('')
      })

      if (iteration >= totalIterations) {
        clearInterval(animRef.current)
        setDisplayText(targetText)
      }

      iteration += 1
    }, speed)
  }, [targetText, speed, totalIterations, charPool])

  useEffect(() => {
    return () => clearInterval(animRef.current)
  }, [])

  return [displayText, trigger]
}
