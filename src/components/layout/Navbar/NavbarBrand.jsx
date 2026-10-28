import { useCallback, memo } from 'react'
import { useHoverScramble, LETTERS } from '@/hooks/useTextScramble'

function NavbarBrand({ brandText = 'A — Z', onHomeClick }) {
  // Parse brand text (e.g. 'A — Z' -> 'A' and 'Z')
  const brandParts = brandText.includes('—')
    ? brandText.split('—').map((s) => s.trim())
    : [brandText, '']
  const firstTarget = brandParts[0] || 'A'
  const lastTarget = brandParts[1] || 'Z'

  // Text scramble hooks on hover (Letters only: A-Z)
  const [firstChar, triggerFirst] = useHoverScramble(firstTarget, 30, 7, LETTERS)
  const [lastChar, triggerLast] = useHoverScramble(lastTarget, 30, 9, LETTERS)

  const handleBrandHover = useCallback(() => {
    triggerFirst()
    if (lastTarget) {
      triggerLast()
    }
  }, [triggerFirst, triggerLast, lastTarget])

  const handleClick = useCallback(
    (e) => {
      e.preventDefault()
      if (onHomeClick) {
        onHomeClick()
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      }
    },
    [onHomeClick]
  )

  return (
    <div className="navbar-left">
      <a
        href="#hero"
        onClick={handleClick}
        onMouseEnter={handleBrandHover}
        className="navbar-brand"
        aria-label="Home — Restart from beginning"
      >
        {brandText.includes('—') ? (
          <>
            <span className="brand-char">{firstChar}</span>
            <span className="brand-line" aria-hidden="true" />
            <span className="brand-char">{lastChar}</span>
            <span className="brand-home-badge" aria-hidden="true">
              HOME
            </span>
          </>
        ) : (
          <>
            <span className="brand-char">{firstChar}</span>
            <span className="brand-home-badge" aria-hidden="true">
              HOME
            </span>
          </>
        )}
      </a>
    </div>
  )
}

export default memo(NavbarBrand)
