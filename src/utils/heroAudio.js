/**
 * HeroAudio - Singleton Audio Controller for Hero Background Sound
 *
 * Core Engineering:
 * 1. Singleton HTMLAudioElement (`/audio/sound.MP3`).
 * 2. Intelligent Browser Autoplay Policy bypass & graceful fallback.
 * 3. Reactive state subscription for UI components (HeroAudioPlayer, HeroRadarLoader).
 * 4. Safe Play/Pause guards (prevents AbortError and duplicate trigger loops).
 * 5. Instant un-mute on first user touch/click with zero delay.
 */

class HeroAudioController {
  constructor() {
    this.audio = null
    this.isPlaying = false
    this.isBlocked = false
    this.hasTriggered = false
    this.subscribers = new Set()
    this.volume = 0.4
  }

  init() {
    if (typeof window === 'undefined') return null
    if (this.audio) return this.audio

    try {
      this.audio = new Audio('/audio/sound.MP3')
      this.audio.loop = true
      this.audio.volume = this.volume
      this.audio.preload = 'auto'

      this.audio.addEventListener('play', () => {
        this.isPlaying = true
        this.notify()
      })

      this.audio.addEventListener('pause', () => {
        this.isPlaying = false
        this.notify()
      })

      this.audio.addEventListener('ended', () => {
        this.isPlaying = false
        this.notify()
      })
    } catch (err) {
      console.warn('[HeroAudio] Initialization error:', err)
    }

    return this.audio
  }

  async play() {
    this.init()
    if (!this.audio) return

    try {
      this.audio.muted = false
      await this.audio.play()
      this.isPlaying = true
      this.isBlocked = false
      this.notify()
    } catch (err) {
      // Browser Autoplay Policy blocked unmuted playback
      this.isBlocked = true
      this.isPlaying = false
      this.notify()

      // Start muted playback so track starts buffering and running timeline immediately
      try {
        this.audio.muted = true
        await this.audio.play()
      } catch {}

      // Fast-unlock on the very first physical interaction (click/touch/key) anywhere on screen
      const unlock = async () => {
        if (this.audio) {
          try {
            this.audio.muted = false
            if (this.audio.paused) {
              await this.audio.play()
            }
            this.isPlaying = true
            this.isBlocked = false
            this.notify()
          } catch {}
        }
        window.removeEventListener('pointerdown', unlock)
        window.removeEventListener('click', unlock)
        window.removeEventListener('keydown', unlock)
        window.removeEventListener('touchstart', unlock)
      }

      window.addEventListener('pointerdown', unlock, { once: true, passive: true })
      window.addEventListener('click', unlock, { once: true, passive: true })
      window.addEventListener('keydown', unlock, { once: true, passive: true })
      window.addEventListener('touchstart', unlock, { once: true, passive: true })
    }
  }

  pause() {
    if (!this.audio) return
    this.audio.pause()
    this.isPlaying = false
    this.notify()
  }

  toggle() {
    if (this.isPlaying) {
      this.pause()
    } else {
      this.play()
    }
  }

  triggerAtThreshold() {
    if (this.hasTriggered) return
    this.hasTriggered = true
    this.play()
  }

  setVolume(vol) {
    this.volume = Math.min(1, Math.max(0, vol))
    if (this.audio) {
      this.audio.volume = this.volume
    }
  }

  subscribe(callback) {
    this.subscribers.add(callback)
    callback({ isPlaying: this.isPlaying, isBlocked: this.isBlocked })
    return () => {
      this.subscribers.delete(callback)
    }
  }

  notify() {
    const payload = { isPlaying: this.isPlaying, isBlocked: this.isBlocked }
    this.subscribers.forEach((cb) => cb(payload))
  }
}

export const heroAudio = new HeroAudioController()
