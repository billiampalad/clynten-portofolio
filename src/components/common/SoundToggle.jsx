import { memo } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { useClickSound } from '@/hooks/useClickSound'

/**
 * SoundToggle - Elegant Cyberpunk Audio Mute/Unmute Switch
 */
function SoundToggle({ className = '', showTooltip = true, tooltipPosition = '' }) {
  const { isMuted, toggleMute } = useClickSound({ autoDelegate: false })

  return (
    <div className={`nav-tooltip-wrapper ${tooltipPosition} ${className}`}>
      <button
        type="button"
        onClick={toggleMute}
        className="nav-icon-btn sound-toggle"
        aria-label={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
        aria-pressed={!isMuted}
      >
        {isMuted ? (
          <VolumeX size={16} strokeWidth={1.8} className="text-zinc-500 transition-colors" />
        ) : (
          <Volume2 size={16} strokeWidth={1.8} className="text-emerald-400 drop-shadow-[0_0_6px_rgba(52,211,153,0.6)] transition-colors" />
        )}
      </button>

      {showTooltip && (
        <div className="nav-custom-tooltip" role="tooltip" aria-hidden="true">
          <span className="tooltip-text">
            {isMuted ? 'Sound: Muted' : 'Sound: Active'}
          </span>
        </div>
      )}
    </div>
  )
}

export default memo(SoundToggle)

