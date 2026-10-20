import * as THREE from 'three'

/**
 * DeepSpaceParticles for Infinite Deep Space Tunnel 2.0
 * Generates and manages multi-layer digital dust particles, perspective guide lines,
 * and atmospheric depth fog for cinematic realism.
 */
export class DeepSpaceParticles {
  constructor(scene) {
    this.scene = scene
    this.disposables = []

    this.initFog()
    this.initLights()
    this.initParticleLayers()
    this.initPerspectiveLines()
  }

  initFog() {
    // Deep charcoal & navy exponential atmospheric fog
    this.fog = new THREE.FogExp2(0x030712, 0.018)
    this.scene.fog = this.fog
  }

  initLights() {
    // 1. Deep navy ambient base
    const ambientLight = new THREE.AmbientLight(0x071126, 0.85)
    this.scene.add(ambientLight)
    this.disposables.push(ambientLight)

    // 2. Soft cyan/electric blue directional key light
    const dirLight = new THREE.DirectionalLight(0x06b6d4, 1.2)
    dirLight.position.set(0, 10, 20)
    this.scene.add(dirLight)
    this.disposables.push(dirLight)

    // 3. Center point light for focal convergence glow
    this.focalPointLight = new THREE.PointLight(0x06b6d4, 1.5, 90, 1.2)
    this.focalPointLight.position.set(0, 0, 0)
    this.scene.add(this.focalPointLight)
    this.disposables.push(this.focalPointLight)

    // 4. Subtle crimson accent light for depth contrast
    const accentLight = new THREE.PointLight(0xf43f5e, 0.5, 60, 1.5)
    accentLight.position.set(12, -8, -10)
    this.scene.add(accentLight)
    this.disposables.push(accentLight)
  }

  initParticleLayers() {
    // LAYER 1: Background Sparse Digital Dust (1200 particles, small, deep in Z)
    this.bgParticles = this.createParticleLayer({
      count: 1200,
      radiusMin: 8,
      radiusMax: 35,
      zMin: -100,
      zMax: 120,
      size: 0.06,
      color: 0x93c5fd,
      opacity: 0.45,
    })

    // LAYER 2: Midground Cyan & Blue Telemetry Motes (450 particles)
    this.midParticles = this.createParticleLayer({
      count: 450,
      radiusMin: 4,
      radiusMax: 20,
      zMin: -60,
      zMax: 100,
      size: 0.12,
      color: 0x06b6d4,
      opacity: 0.65,
    })

    // LAYER 3: Foreground Atmospheric Floaters (100 particles, soft glow)
    this.fgParticles = this.createParticleLayer({
      count: 100,
      radiusMin: 2,
      radiusMax: 12,
      zMin: -20,
      zMax: 70,
      size: 0.22,
      color: 0xe0f2fe,
      opacity: 0.85,
    })
  }

  createParticleLayer({ count, radiusMin, radiusMax, zMin, zMax, size, color, opacity }) {
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(count * 3)
    const originalPositions = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = radiusMin + Math.random() * (radiusMax - radiusMin)
      const x = Math.cos(angle) * radius
      const y = Math.sin(angle) * radius * 0.75 // slight horizontal anamorphic stretch
      const z = zMin + Math.random() * (zMax - zMin)

      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z

      originalPositions[i * 3] = x
      originalPositions[i * 3 + 1] = y
      originalPositions[i * 3 + 2] = z
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    // Soft round particle texture generated programmatically on canvas
    const canvas = document.createElement('canvas')
    canvas.width = 64
    canvas.height = 64
    const ctx = canvas.getContext('2d')
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
    gradient.addColorStop(0, 'rgba(255,255,255,1)')
    gradient.addColorStop(0.3, 'rgba(255,255,255,0.7)')
    gradient.addColorStop(0.7, 'rgba(255,255,255,0.15)')
    gradient.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 64, 64)

    const texture = new THREE.CanvasTexture(canvas)
    this.disposables.push(texture)

    const material = new THREE.PointsMaterial({
      size,
      color,
      map: texture,
      transparent: true,
      opacity,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const points = new THREE.Points(geometry, material)
    this.scene.add(points)

    this.disposables.push(geometry)
    this.disposables.push(material)
    this.disposables.push(points)

    return { points, geometry, originalPositions, count }
  }

  initPerspectiveLines() {
    // 12 subtle perspective rays converging toward central vanishing point
    const lineCount = 16
    const lineSegments = 40
    const totalVertices = lineCount * lineSegments * 2
    const positions = new Float32Array(totalVertices * 3)
    const colors = new Float32Array(totalVertices * 3)

    let idx = 0
    const colorCyan = new THREE.Color(0x06b6d4)
    const colorCrimson = new THREE.Color(0xf43f5e)
    const colorNavy = new THREE.Color(0x0284c7)

    for (let i = 0; i < lineCount; i++) {
      const angle = (i / lineCount) * Math.PI * 2
      const radius = 12 + (i % 2) * 4
      const isAccent = i % 4 === 0 // occasional crimson accent

      for (let s = 0; s < lineSegments; s++) {
        const z1 = -80 + (s / lineSegments) * 160
        const z2 = -80 + ((s + 0.6) / lineSegments) * 160
        const scale1 = Math.max(0.08, (z1 + 100) / 100)
        const scale2 = Math.max(0.08, (z2 + 100) / 100)

        // Point 1
        positions[idx * 3] = Math.cos(angle) * radius * scale1
        positions[idx * 3 + 1] = Math.sin(angle) * (radius * 0.7) * scale1
        positions[idx * 3 + 2] = z1

        const activeColor = isAccent ? colorCrimson : (i % 2 === 0 ? colorCyan : colorNavy)
        const alpha = Math.max(0.05, 0.45 * (1 - Math.abs(z1) / 120))

        colors[idx * 3] = activeColor.r * alpha
        colors[idx * 3 + 1] = activeColor.g * alpha
        colors[idx * 3 + 2] = activeColor.b * alpha
        idx++

        // Point 2
        positions[idx * 3] = Math.cos(angle) * radius * scale2
        positions[idx * 3 + 1] = Math.sin(angle) * (radius * 0.7) * scale2
        positions[idx * 3 + 2] = z2

        colors[idx * 3] = activeColor.r * alpha
        colors[idx * 3 + 1] = activeColor.g * alpha
        colors[idx * 3 + 2] = activeColor.b * alpha
        idx++
      }
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const material = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    this.perspectiveLines = new THREE.LineSegments(geometry, material)
    this.scene.add(this.perspectiveLines)

    this.disposables.push(geometry)
    this.disposables.push(material)
    this.disposables.push(this.perspectiveLines)
  }

  /**
   * Update particle positions and line glow based on scroll progress and time
   */
  update(progress, elapsedTime = 0) {
    // Parallax motion factor increases as camera pull-back initiates (progress > 0.75)
    const isTraversing = progress >= 0.75
    const traverseFactor = isTraversing ? (progress - 0.75) / 0.25 : 0

    // Gentle axial rotation of the perspective tunnel guides
    if (this.perspectiveLines) {
      this.perspectiveLines.rotation.z = elapsedTime * 0.02 + traverseFactor * 0.15
      this.perspectiveLines.material.opacity = isTraversing
        ? Math.min(0.45, 0.15 + traverseFactor * 0.4)
        : 0.12
    }

    // Focal light pulsing & focus convergence
    if (this.focalPointLight) {
      const pulse = 1.0 + Math.sin(elapsedTime * 2.0) * 0.15
      this.focalPointLight.intensity = isTraversing ? 1.5 * pulse * (1 + traverseFactor) : 0.8
    }

    // Dynamic particle layer drift
    const updateLayer = (layer, speedMultiplier) => {
      if (!layer) return
      const positions = layer.geometry.attributes.position.array
      const orig = layer.originalPositions
      const count = layer.count

      for (let i = 0; i < count; i++) {
        // Subtle organic float
        const seed = i * 0.1
        positions[i * 3] = orig[i * 3] + Math.sin(elapsedTime * 0.5 + seed) * 0.15
        positions[i * 3 + 1] = orig[i * 3 + 1] + Math.cos(elapsedTime * 0.4 + seed) * 0.12

        // Longitudinal drift toward camera during traversal
        if (isTraversing) {
          positions[i * 3 + 2] = orig[i * 3 + 2] + traverseFactor * 25 * speedMultiplier
        } else {
          positions[i * 3 + 2] = orig[i * 3 + 2]
        }
      }
      layer.geometry.attributes.position.needsUpdate = true
    }

    updateLayer(this.fgParticles, 1.4)
    updateLayer(this.midParticles, 0.85)
    updateLayer(this.bgParticles, 0.4)
  }

  dispose() {
    this.disposables.forEach((item) => {
      if (item && typeof item.dispose === 'function') {
        item.dispose()
      }
      if (item && item.parent) {
        item.parent.remove(item)
      }
    })
    this.disposables = []
  }
}
