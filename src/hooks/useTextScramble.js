import { useState, useEffect, useRef, useCallback } from 'react'

export const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
export const GLYPHS = '01XYZ0123456789_#*<>[]/=+-@$!?'

export function useTextScramble(targetText, speed = 25, isContinuous = false) {
  const [displayText, setDisplayText] = useState(targetText)
  const rafRef = useRef(null)

  useEffect(() => {
    if (!targetText) {
      setDisplayText('')
      return
    }

    let iteration = 0
    const maxIterations = targetText.length
    let lastTime = performance.now()
    const stepInterval = isContinuous ? speed * 1.6 : speed

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
    }

    const loop = (currentTime) => {
      const delta = currentTime - lastTime
      if (delta >= stepInterval) {
        lastTime = currentTime - (delta % stepInterval)

        if (isContinuous) {
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
          rafRef.current = requestAnimationFrame(loop)
        } else {
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
            setDisplayText(targetText)
            return
          }

          iteration += 0.5
          rafRef.current = requestAnimationFrame(loop)
        }
      } else {
        rafRef.current = requestAnimationFrame(loop)
      }
    }

    rafRef.current = requestAnimationFrame(loop)

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [targetText, speed, isContinuous])

  return displayText
}

/**
 * Triggerable scramble hook (e.g. for hover events)
 * Scrambles characters with alphabet letters only (A-Z), then locks back to target text.
 */
export function useHoverScramble(targetText, speed = 30, totalIterations = 8, charPool = LETTERS) {
  const [displayText, setDisplayText] = useState(targetText)
  const [prevTargetText, setPrevTargetText] = useState(targetText)
  const rafRef = useRef(null)

  if (prevTargetText !== targetText) {
    setPrevTargetText(targetText)
    setDisplayText(targetText)
  }

  const trigger = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
    }
    let iteration = 0
    let lastTime = performance.now()

    const loop = (currentTime) => {
      const delta = currentTime - lastTime
      if (delta >= speed) {
        lastTime = currentTime - (delta % speed)

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
          setDisplayText(targetText)
          return
        }

        iteration += 1
      }
      rafRef.current = requestAnimationFrame(loop)
    }

    rafRef.current = requestAnimationFrame(loop)
  }, [targetText, speed, totalIterations, charPool])

  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  return [displayText, trigger]
}
