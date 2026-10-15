import { useState, useRef, useEffect, useCallback } from 'react'
import defaultProfileImg from '@/assets/profile.webp'
import './DeveloperIdCard.css'

/**
 * Premium 3D Developer ID Card Component
 * Luxury Futuristic Tech Identity with hanging woven lanyard, brushed steel clasp,
 * polycarbonate badge protector, EMV smart chip, and fluid pointer-tracked 3D physics.
 */
export default function DeveloperIdCard({
  name = 'Clynten Billiam Palad',
  role = 'Junior Web Developer',
  location = 'Indonesia',
  systemId = 'CLYNTEN-DEV',
  image = defaultProfileImg,
  stack = 'React • Vite • GSAP',
  enableSway = true,
  className = '',
  style = {},
}) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [swayActive, setSwayActive] = useState(enableSway)

  const cardVesselRef = useRef(null)
  const pendulumRigRef = useRef(null)

  // Physics animation values
  const physicsRef = useRef({
    isHovered: false,
    targetRotX: 0,
    targetRotY: 0,
    targetTransX: 0,
    targetTransY: 0,
    currentRotX: 0,
    currentRotY: 0,
    currentTransX: 0,
    currentTransY: 0,
    targetGlareX: 50,
    targetGlareY: 50,
    currentGlareX: 50,
    currentGlareY: 50,
  })

  const toggleFlip = useCallback(() => {
    setIsFlipped((prev) => !prev)
  }, [])

  // 60/120fps RAF lerp loop (Zero React re-renders during motion)
  useEffect(() => {
    let animId = null
    const LERP = 0.085

    const loop = () => {
      const p = physicsRef.current
      const card = cardVesselRef.current
      const rig = pendulumRigRef.current

      if (card && p.isHovered) {
        p.currentRotX += (p.targetRotX - p.currentRotX) * LERP
        p.currentRotY += (p.targetRotY - p.currentRotY) * LERP
        p.currentTransX += (p.targetTransX - p.currentTransX) * LERP
        p.currentTransY += (p.targetTransY - p.currentTransY) * LERP
        p.currentGlareX += (p.targetGlareX - p.currentGlareX) * LERP
        p.currentGlareY += (p.targetGlareY - p.currentGlareY) * LERP

        card.style.transform = `rotateX(${p.currentRotX.toFixed(2)}deg) rotateY(${p.currentRotY.toFixed(2)}deg) translate3d(${p.currentTransX.toFixed(2)}px, ${p.currentTransY.toFixed(2)}px, 15px)`
        if (rig) {
          rig.style.transform = `rotateZ(${(p.currentRotY * 0.15).toFixed(2)}deg)`
        }

        card.style.setProperty('--glare-x', `${p.currentGlareX.toFixed(1)}%`)
        card.style.setProperty('--glare-y', `${p.currentGlareY.toFixed(1)}%`)
        card.style.setProperty('--glare-opacity', '0.28')
      } else if (card) {
        // Return to resting position
        p.currentRotX += (0 - p.currentRotX) * 0.06
        p.currentRotY += (0 - p.currentRotY) * 0.06
        p.currentTransX += (0 - p.currentTransX) * 0.06
        p.currentTransY += (0 - p.currentTransY) * 0.06

        card.style.transform = `rotateX(${p.currentRotX.toFixed(2)}deg) rotateY(0deg) translate3d(0px, 0px, 0px)`
        card.style.setProperty('--glare-opacity', '0.12')
      }

      animId = requestAnimationFrame(loop)
    }

    animId = requestAnimationFrame(loop)
    return () => {
      if (animId) cancelAnimationFrame(animId)
    }
  }, [])

  // Pointer interactions
  const handlePointerEnter = useCallback(() => {
    physicsRef.current.isHovered = true
    setSwayActive(false)
  }, [])

  const handlePointerMove = useCallback((e) => {
    const card = cardVesselRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const clientX = e.clientX || (e.touches && e.touches[0].clientX)
    const clientY = e.clientY || (e.touches && e.touches[0].clientY)

    if (clientX === undefined || clientY === undefined) return

    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const normX = Math.max(-1, Math.min(1, (clientX - centerX) / (rect.width / 2)))
    const normY = Math.max(-1, Math.min(1, (clientY - centerY) / (rect.height / 2)))

    const p = physicsRef.current
    p.targetRotX = -normY * 14
    p.targetRotY = normX * 18
    p.targetTransX = normX * 8
    p.targetTransY = normY * 4
    p.targetGlareX = Math.max(0, Math.min(100, (normX + 1) * 50))
    p.targetGlareY = Math.max(0, Math.min(100, (normY + 1) * 50))
  }, [])

  const handlePointerLeave = useCallback(() => {
    const p = physicsRef.current
    p.isHovered = false
    p.targetRotX = 0
    p.targetRotY = 0
    p.targetTransX = 0
    p.targetTransY = 0

    if (enableSway) {
      setTimeout(() => {
        if (!physicsRef.current.isHovered) {
          setSwayActive(true)
        }
      }, 350)
    }
  }, [enableSway])

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        toggleFlip()
      }
    },
    [toggleFlip]
  )

  return (
    <div
      ref={pendulumRigRef}
      className={`developer-id-card-rig ${swayActive ? 'is-swaying' : ''} ${className}`}
      style={style}
    >
      {/* SECTION 3A: LANYARD STRAPS */}
      <div className="id-lanyard-straps" aria-hidden="true">
        <div className="id-lanyard-strap strap-left">
          <span className="id-lanyard-brand">CLYNTEN // DEV ARCHITECT</span>
        </div>
        <div className="id-lanyard-strap strap-right">
          <span className="id-lanyard-brand">CLYNTEN // DEV ARCHITECT</span>
        </div>
      </div>

      {/* SECTION 3B: METALLIC HARDWARE CLASP */}
      <div className="id-hardware-assembly" aria-hidden="true">
        <div className="id-crimp-collar">
          <div className="id-crimp-slot" />
        </div>
        <div className="id-swivel-ring" />
        <div className="id-clasp-body">
          <div className="id-clasp-barrel" />
          <div className="id-clasp-hook" />
          <div className="id-clasp-loop-beak" />
        </div>
      </div>

      {/* SECTION 3C & 3D: 3D CARD VESSEL */}
      <div
        ref={cardVesselRef}
        className="id-card-vessel"
        tabIndex={0}
        role="region"
        aria-label={`Developer ID card for ${name}. Press Enter or click to flip.`}
        onClick={toggleFlip}
        onKeyDown={handleKeyDown}
        onMouseEnter={handlePointerEnter}
        onMouseMove={handlePointerMove}
        onMouseLeave={handlePointerLeave}
        onTouchStart={handlePointerEnter}
        onTouchMove={handlePointerMove}
        onTouchEnd={handlePointerLeave}
      >
        <div className={`id-card-flip-wrap ${isFlipped ? 'flipped' : ''}`}>
          {/* Acrylic Badge Holder Sleeve */}
          <div className="id-acrylic-sleeve" aria-hidden="true">
            <div className="id-acrylic-slot-tab">
              <div className="id-acrylic-slot-hole" />
            </div>
            <div className="id-card-specular-glare" />
            <div className="id-card-diagonal-sheen" />
          </div>

          {/* FRONT FACE: Photo Only (Full Bleed Pure Portrait) */}
          <div className="id-face id-face-front" title="Klik kartu untuk membalik dan melihat data diri">
            <div className="front-photo-wrapper">
              <img
                className="front-photo-full"
                src={image}
                alt={name}
                loading="eager"
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src =
                    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='326' height='490' viewBox='0 0 326 490'><rect width='326' height='490' fill='%23111827'/><circle cx='163' cy='200' r='70' fill='%2338bdf8' opacity='0.3'/><path d='M60 440c0-60 45-90 103-90s103 30 103 90\' fill='%2338bdf8\' opacity='0.25'/><text x='163' y='470' font-family='sans-serif' font-size='14' fill='%2394a3b8' text-anchor='middle'>CLYNTEN BILLIAM PALAD</text></svg>"
                }}
              />
              {/* Subtle interactive flip indicator prompt visible only on hover */}
              <div className="front-flip-badge" aria-hidden="true">
                <span>KLIK UNTUK BALIK</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
                </svg>
              </div>
            </div>
          </div>

          {/* BACK FACE: Developer Credentials Dossier */}
          <div className="id-face id-face-back">
            {/* Header: Monogram & Verified Badge */}
            <div className="id-header-bar">
              <div className="id-monogram-lockup">
                <div className="id-monogram-crest">
                  C<span>.</span>
                </div>
                <span className="id-category-label">DEVELOPER IDENTITY // DOSSIER</span>
              </div>
              <div className="id-clearance-pill">
                <span className="id-clearance-dot" />
                <span>LVL 01 // PUBLIC</span>
              </div>
            </div>

            <div className="id-magnetic-stripe" />

            {/* Middle Grid: EMV Chip & Name */}
            <div className="back-identity-row">
              <div className="id-smart-chip-box">
                <div className="id-gold-emv-chip">
                  <div className="chip-micro-center" />
                </div>
                <svg className="id-contactless-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M8.5 16.5a5 5 0 0 1 0-7" />
                  <path d="M12 19a8.5 8.5 0 0 0 0-14" />
                  <path d="M15.5 21.5a12 12 0 0 0 0-19" />
                </svg>
              </div>

              <div className="back-name-block">
                <span className="id-profile-label">NAME // CITIZEN</span>
                <h2 className="id-profile-name">{name}</h2>
                <div className="id-profile-role">
                  <span className="id-role-dot" />
                  <span>{role}</span>
                </div>
              </div>
            </div>

            {/* Specification Matrix */}
            <div className="id-spec-matrix">
              <div className="id-spec-row">
                <span className="id-spec-key">LOCATION</span>
                <span className="id-spec-val">{location}</span>
              </div>
              <div className="id-spec-row">
                <span className="id-spec-key">SYS ID</span>
                <span className="id-spec-val">{systemId}</span>
              </div>
              <div className="id-spec-row">
                <span className="id-spec-key">STACK</span>
                <span className="id-spec-val">{stack}</span>
              </div>
              <div className="id-spec-row">
                <span className="id-spec-key">STATUS</span>
                <span className="id-spec-val">ONLINE // 3.20GHz</span>
              </div>
            </div>

            {/* Signature Area */}
            <div className="id-signature-area">
              <span className="id-signature-caption">AUTHORIZED SIGNATURE</span>
              <div className="id-signature-box">
                <span className="id-signature-hand">Clynten B. Palad</span>
              </div>
            </div>

            {/* Hologram Strip */}
            <div className="id-hologram-seal">
              <span className="id-hologram-text">SECURE ARCHITECTURE • AUTHENTIC IDENTITY</span>
            </div>

            {/* Bottom Footer: QR & Barcode */}
            <div className="back-footer-assembly">
              <div className="id-qr-holder" title="Scan to verify credentials">
                <svg viewBox="0 0 29 29" fill="#000000">
                  <path d="M1 1h7v7H1zM3 3h3v3H3zM21 1h7v7h-7zM23 3h3v3h-3zM1 21h7v7H1zM3 23h3v3H3z" />
                  <path d="M10 2h1v1h-1zM13 2h1v1h-1zM15 2h2v1h-2zM10 4h2v1h-2zM14 4h1v1h-1zM17 4h1v1h-1zM10 6h1v1h-1zM13 6h2v1h-2zM17 6h1v1h-1zM2 10h1v1H2zM5 10h2v1H5zM9 10h2v1H9zM12 10h1v1h-1zM15 10h1v1h-1zM18 10h3v1h-3zM23 10h1v1h-1zM26 10h2v1h-2zM3 12h2v1H3zM7 12h1v1H7zM11 12h3v1h-3zM16 12h2v1h-2zM20 12h1v1h-1zM24 12h3v1h-3zM1 14h3v1H1zM6 14h2v1H6zM10 14h1v1h-1zM13 14h3v1h-3zM18 14h2v1h-2zM22 14h1v1h-1zM25 14h3v1h-3zM2 16h1v1H2zM5 16h3v1H5zM10 16h2v1h-2zM14 16h1v1h-1zM17 16h3v1h-3zM22 16h2v1h-2zM26 16h1v1h-1zM10 18h3v1h-3zM15 18h2v1h-2zM19 18h1v1h-1zM22 18h3v1h-3zM27 18h1v1h-1zM10 21h2v1h-2zM14 21h1v1h-1zM17 21h2v1h-2zM21 21h1v1h-1zM24 21h2v1h-2zM11 23h1v1h-1zM14 23h2v1h-2zM18 23h1v1h-1zM21 23h3v1h-3zM26 23h2v1h-2zM10 25h3v1h-3zM15 25h1v1h-1zM18 25h2v1h-2zM22 25h1v1h-1zM25 25h3v1h-3zM11 27h2v1h-2zM15 27h3v1h-3zM20 27h1v1h-1zM23 27h2v1h-2zM27 27h1v1h-1z" />
                </svg>
              </div>

              <div className="id-barcode-box">
                <svg className="id-barcode-graphic" viewBox="0 0 160 20" preserveAspectRatio="none">
                  <rect x="0" y="0" width="3" height="20" fill="#000" />
                  <rect x="5" y="0" width="1" height="20" fill="#000" />
                  <rect x="8" y="0" width="4" height="20" fill="#000" />
                  <rect x="14" y="0" width="2" height="20" fill="#000" />
                  <rect x="18" y="0" width="1" height="20" fill="#000" />
                  <rect x="21" y="0" width="3" height="20" fill="#000" />
                  <rect x="26" y="0" width="2" height="20" fill="#000" />
                  <rect x="30" y="0" width="5" height="20" fill="#000" />
                  <rect x="37" y="0" width="1" height="20" fill="#000" />
                  <rect x="40" y="0" width="3" height="20" fill="#000" />
                  <rect x="45" y="0" width="2" height="20" fill="#000" />
                  <rect x="49" y="0" width="4" height="20" fill="#000" />
                  <rect x="55" y="0" width="1" height="20" fill="#000" />
                  <rect x="58" y="0" width="3" height="20" fill="#000" />
                  <rect x="63" y="0" width="2" height="20" fill="#000" />
                  <rect x="67" y="0" width="4" height="20" fill="#000" />
                  <rect x="73" y="0" width="1" height="20" fill="#000" />
                  <rect x="76" y="0" width="3" height="20" fill="#000" />
                  <rect x="81" y="0" width="2" height="20" fill="#000" />
                  <rect x="85" y="0" width="5" height="20" fill="#000" />
                  <rect x="92" y="0" width="2" height="20" fill="#000" />
                  <rect x="96" y="0" width="1" height="20" fill="#000" />
                  <rect x="99" y="0" width="4" height="20" fill="#000" />
                  <rect x="105" y="0" width="2" height="20" fill="#000" />
                  <rect x="109" y="0" width="1" height="20" fill="#000" />
                  <rect x="112" y="0" width="3" height="20" fill="#000" />
                  <rect x="117" y="0" width="2" height="20" fill="#000" />
                  <rect x="121" y="0" width="4" height="20" fill="#000" />
                  <rect x="127" y="0" width="1" height="20" fill="#000" />
                  <rect x="130" y="0" width="3" height="20" fill="#000" />
                  <rect x="135" y="0" width="2" height="20" fill="#000" />
                  <rect x="139" y="0" width="5" height="20" fill="#000" />
                  <rect x="146" y="0" width="2" height="20" fill="#000" />
                  <rect x="150" y="0" width="1" height="20" fill="#000" />
                  <rect x="153" y="0" width="3" height="20" fill="#000" />
                  <rect x="158" y="0" width="2" height="20" fill="#000" />
                </svg>
                <span className="id-barcode-code">*{systemId}-2026*</span>
              </div>
            </div>

            <div className="back-contact-specs-line">
              billiampalad@gmail.com • github.com/billiampalad
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
