import * as THREE from 'three'

/**
 * CameraController for Infinite Deep Space Tunnel 2.0
 * Smoothly interpolates Three.js PerspectiveCamera position, elevation, and target
 * synchronized with GSAP scroll progress (0.00 -> 1.00).
 */
export class CameraController {
  constructor(fov = 48, aspect = 16 / 9, near = 0.1, far = 1500) {
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
    this.basePosition = new THREE.Vector3(0, 0, 5)
    this.target = new THREE.Vector3(0, 0, 0)
    this.camera.position.copy(this.basePosition)
    this.camera.lookAt(this.target)
  }

  resize(width, height) {
    if (height === 0) return
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
  }

  /**
   * Updates camera position and orientation based on scroll progress and elapsed time.
   * @param {number} progress - Normalized scroll progress (0.00 -> 1.00)
   * @param {number} elapsedTime - Elapsed time in seconds for micro drift
   * @param {boolean} reducedMotion - Whether reduced motion is active
   */
  update(progress, elapsedTime = 0, reducedMotion = false) {
    // Hermite smoothstep curve for natural organic deceleration
    const smoothStep = (t) => t * t * (3 - 2 * t)

    // Micro drift for cinematic realism (disabled if reduced motion is requested)
    const driftX = reducedMotion ? 0 : Math.sin(elapsedTime * 0.35) * 0.035
    const driftY = reducedMotion ? 0 : Math.cos(elapsedTime * 0.28) * 0.025

    if (progress < 0.75) {
      // Fase A: Digital World Establishing Shot (Resting, subtle drift)
      this.camera.position.set(driftX, driftY, 5)
      this.target.set(0, 0, 0)
    } else if (progress >= 0.75 && progress < 0.84) {
      // Fase B: Cinematic Camera Pull-Back (Progress 0.75 -> 0.84)
      const t = smoothStep((progress - 0.75) / 0.09)
      const zPos = 5 + t * 16 // 5.0 -> 21.0
      const yPos = driftY + t * 0.5 // subtle dolly elevation
      this.camera.position.set(driftX * (1 - t * 0.5), yPos, zPos)
      this.target.set(0, t * 0.1, 0)
    } else if (progress >= 0.84 && progress < 0.92) {
      // Fase C: Deep Space Tunnel Traversal (Progress 0.84 -> 0.92)
      const t = smoothStep((progress - 0.84) / 0.08)
      const zPos = 21 + t * 34 // 21.0 -> 55.0
      const yPos = 0.5 * (1 - t * 0.6)
      this.camera.position.set(driftX * 0.3, yPos, zPos)
      this.target.set(0, 0, 0)
    } else if (progress >= 0.92 && progress < 0.97) {
      // Fase D: Focus Convergence (Progress 0.92 -> 0.97)
      const t = smoothStep((progress - 0.92) / 0.05)
      const zPos = 55 + t * 25 // 55.0 -> 80.0
      const yPos = 0.2 * (1 - t)
      this.camera.position.set(0, yPos, zPos)
      this.target.set(0, 0, 0)
    } else {
      // Fase E: Soft Emergence About (Progress 0.97 -> 1.00)
      this.camera.position.set(0, 0, 80)
      this.target.set(0, 0, 0)
    }

    this.camera.lookAt(this.target)
  }

  dispose() {
    // Camera is a garbage-collected Three.js object, references cleared
  }
}
