/**
 * SoundManager - Zero-Latency Web Audio API Sound Engine
 *
 * Technical Highlights:
 * 1. Singleton AudioContext with lazy initialization and transparent Autoplay policy unlock.
 * 2. In-memory pre-decoded AudioBuffer storage (zero runtime decoding overhead).
 * 3. Polyphonic playback via one-shot AudioBufferSourceNode (overlapping rapid clicks without cutoff).
 * 4. Master GainNode for volume & mute control with localStorage persistence.
 * 5. Subscriber pattern for reactive UI sound toggles.
 */

const STORAGE_KEY = 'clynten_sound_enabled'

class SoundManager {
  constructor() {
    this.audioCtx = null
    this.masterGain = null
    this.buffers = new Map()
    this.isMuted = false
    this.isInitialized = false
    this.subscribers = new Set()

    // Read stored sound preference (default to enabled: true)
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(STORAGE_KEY)
        this.isMuted = stored !== null ? stored === 'false' : false
      } catch {
        this.isMuted = false
      }
    }
  }

  /**
   * Lazy-initialize AudioContext and unlock via user gesture
   */
  initContext() {
    if (this.audioCtx) return this.audioCtx

    const AudioContextClass = window.AudioContext || window.webkitAudioContext
    if (!AudioContextClass) {
      console.warn('Web Audio API is not supported in this browser.')
      return null
    }

    this.audioCtx = new AudioContextClass()
    this.masterGain = this.audioCtx.createGain()
    this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 1, this.audioCtx.currentTime)
    this.masterGain.connect(this.audioCtx.destination)

    // Unlock suspended AudioContext on first user interaction
    const unlock = () => {
      if (this.audioCtx && this.audioCtx.state === 'suspended') {
        this.audioCtx.resume().catch(() => {})
      }
      window.removeEventListener('pointerdown', unlock)
      window.removeEventListener('keydown', unlock)
    }

    window.addEventListener('pointerdown', unlock, { once: true, passive: true })
    window.addEventListener('keydown', unlock, { once: true, passive: true })

    this.isInitialized = true
    return this.audioCtx
  }

  /**
   * Preload and decode audio file directly into memory
   */
  async loadSound(name, url) {
    if (this.buffers.has(name)) return this.buffers.get(name)

    const ctx = this.initContext()
    if (!ctx) return null

    try {
      const response = await fetch(url)
      const arrayBuffer = await response.arrayBuffer()
      const audioBuffer = await ctx.decodeAudioData(arrayBuffer)
      this.buffers.set(name, audioBuffer)
      return audioBuffer
    } catch (err) {
      console.error(`[SoundManager] Failed to load sound: ${name} from ${url}`, err)
      return null
    }
  }

  /**
   * Play preloaded sound with zero latency and polyphonic overlap
   */
  play(name = 'click', volume = 0.5) {
    if (this.isMuted) return

    const ctx = this.initContext()
    if (!ctx) return

    // Ensure AudioContext is running
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {})
    }

    const buffer = this.buffers.get(name)
    if (!buffer) return

    try {
      const source = ctx.createBufferSource()
      source.buffer = buffer

      // Individual gain node for fine volume tuning without clipping
      const gainNode = ctx.createGain()
      gainNode.gain.setValueAtTime(Math.min(1, Math.max(0, volume)), ctx.currentTime)

      source.connect(gainNode)
      gainNode.connect(this.masterGain)

      source.start(0)
    } catch (err) {
      console.warn('[SoundManager] Error playing sound:', err)
    }
  }

  /**
   * Toggle Mute / Unmute state with persistence
   */
  toggleMute() {
    this.setMuted(!this.isMuted)
    return this.isMuted
  }

  /**
   * Set specific mute state
   */
  setMuted(muted) {
    this.isMuted = muted

    if (this.masterGain && this.audioCtx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 1, this.audioCtx.currentTime)
    }

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, (!muted).toString())
      } catch {
        // Fallback if localStorage quota is exceeded or disabled
      }
    }

    this.notifySubscribers()
  }

  /**
   * Subscribe to sound mute/unmute state changes
   */
  subscribe(callback) {
    this.subscribers.add(callback)
    callback(this.isMuted)
    return () => {
      this.subscribers.delete(callback)
    }
  }

  notifySubscribers() {
    this.subscribers.forEach((cb) => cb(this.isMuted))
  }
}

// Export singleton instance
export const soundManager = new SoundManager()

