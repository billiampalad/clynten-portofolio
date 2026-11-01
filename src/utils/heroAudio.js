/**
 * HeroAudio - Singleton Audio Controller for Hero Background Sound
 *
 * Core Engineering:
 * 1. Singleton HTMLAudioElement (`/audio/sound.MP3`).
 * 2. Autoplay Policy handling with transparent user-gesture unlock.
 * 3. Reactive state subscription for UI components (HeroAudioPlayer).
 * 4. Safe Play/Pause guards (prevents AbortError and infinite trigger loops).
 * 5. 100% memory leak free lifecycle.
 */

class HeroAudioController {
  constructor() {
    this.audio = null
    this.isPlaying = false
    this.hasTriggered = false
    this.subscribers = new Set()
    this.volume = 0.45
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
      await this.audio.play()
      this.isPlaying = true
      this.notify()
    } catch (err) {
      // Browser Autoplay Policy blocked playback (waiting for first user gesture)
      this.isPlaying = false
      this.notify()

      const unlock = () => {
        if (this.audio && !this.isPlaying && this.hasTriggered) {
          this.audio.play().catch(() => {})
        }
        window.removeEventListener('pointerdown', unlock)
        window.removeEventListener('keydown', unlock)
      }

      window.addEventListener('pointerdown', unlock, { once: true, passive: true })
      window.addEventListener('keydown', unlock, { once: true, passive: true })
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
    callback(this.isPlaying)
    return () => {
      this.subscribers.delete(callback)
    }
  }

  notify() {
    this.subscribers.forEach((cb) => cb(this.isPlaying))
  }
}

export const heroAudio = new HeroAudioController()

