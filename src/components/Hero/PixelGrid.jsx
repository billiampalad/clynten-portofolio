import React, { useMemo } from 'react'
import './PixelGrid.css'

export default function PixelGrid({ gridRef, opacity = 1 }) {
  // Generate responsive grid blocks
  const cells = useMemo(() => {
    const totalCells = 16 * 10 // 16 cols x 10 rows
    return Array.from({ length: totalCells }, (_, i) => i)
  }, [])

  return (
    <div
      ref={gridRef}
      className="pixel-grid-container"
      style={{ opacity }}
    >
      <div className="pixel-grid-mesh">
        {cells.map((id) => (
          <div key={id} className="pixel-cell">
            <span className="pixel-crosshair">+</span>
          </div>
        ))}
      </div>
      <div className="digital-scanline" />
      <div className="vignette-overlay" />
    </div>
  )
}
