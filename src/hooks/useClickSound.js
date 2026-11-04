import { useEffect, useState } from 'react'
import { soundManager } from '@/utils/soundManager'

/**
 * useClickSound - React hook for Web Audio API click sound effects
 *
 * Features:
 * 1. Automatically preloads '/audio/klik.wav' into memory on mount.
 * 2. Provides centralized global event delegation on `window` (`pointerdown` for zero latency).
 * 3. Exposes `isMuted`, `toggleMute`, and `playClick` helpers.
 */
export function useClickSound({ autoDelegate = true } = {}) {
  const [isMuted, setIsMuted] = useState(soundManager.isMuted)

  useEffect(() => {
    // 1. Preload audio buffer into memory
    soundManager.loadSound('click', '/audio/klik.wav')

    // 2. Subscribe to mute state updates
    const unsubscribe = soundManager.subscribe(setIsMuted)

    // 3. Optional: Event Delegation on window level
    if (!autoDelegate) return unsubscribe

    const handlePointerDown = (e) => {
      if (soundManager.isMuted) return

      const target = e.target
      if (!target || !(target instanceof Element)) return

      // Match interactive elements (buttons, links, inputs, clickables, data-sound="click")
      const interactive = target.closest(
        'button, a, input[type="button"], input[type="submit"], [role="button"], [role="link"], [data-sound="click"], .cursor-pointer, .nav-item, .nav-icon-btn'
      )

      if (!interactive) return

      // Skip disabled elements
      if (
        interactive.hasAttribute('disabled') ||
        interactive.getAttribute('aria-disabled') === 'true'
      ) {
        return
      }

      // Play click sound with zero latency on pointerdown (instant haptic feedback)
      soundManager.play('click', 0.5)
    }

    // Attach passive listener on capture phase for highest priority response
    window.addEventListener('pointerdown', handlePointerDown, { passive: true, capture: true })

    return () => {
      unsubscribe()
      window.removeEventListener('pointerdown', handlePointerDown, { capture: true })
    }
  }, [autoDelegate])

  return {
    isMuted,
    toggleMute: () => soundManager.toggleMute(),
    setMuted: (val) => soundManager.setMuted(val),
    playClick: (vol) => soundManager.play('click', vol),
  }
}

