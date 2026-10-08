import './PixelGrid.css'

export default function PixelGrid({ gridRef, opacity = 1 }) {
  return (
    <div
      ref={gridRef}
      className="scanline-overlay-container"
      style={{ opacity }}
    >
      {/* Subtle Digital Scanlines */}
      <div className="digital-scanlines" />
      {/* Cinematic Vignette */}
      <div className="cinematic-vignette" />
    </div>
  )
}