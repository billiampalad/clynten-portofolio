import { useState, useEffect, useRef } from 'react'

const GLYPHS = '01XYZ0123456789_#*<>[]/=+-@$!?'

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
