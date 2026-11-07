import { useState, useEffect, memo } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { heroAudio } from '@/utils/heroAudio'

const BARS = [
  { id: 1, duration: '0.65s', delay: '0.0s', height: '14px' },
  { id: 2, duration: '0.45s', delay: '0.15s', height: '18px' },
  { id: 3, duration: '0.8s', delay: '0.3s', height: '12px' },
  { id: 4, duration: '0.55s', delay: '0.1s', height: '16px' },
]

function HeroAudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(heroAudio.isPlaying)

  useEffect(() => {
    return heroAudio.subscribe(({ isPlaying }) => {
      setIsPlaying(isPlaying)
    })
  }, [])

  const handleToggle = () => {
    heroAudio.toggle()
  }

  return (
    <div className="absolute bottom-20 sm:bottom-24 [@media(min-width:1440px)]:bottom-34 right-6 sm:right-12 [@media(min-width:1440px)]:right-10 [@media(min-width:1600px)]:right-12 z-25 pointer-events-auto select-none font-mono">
      <button
        type="button"
        onClick={handleToggle}
        aria-label={isPlaying ? 'Pause Background Audio' : 'Play Background Audio'}
        aria-pressed={isPlaying}
        className="group flex items-center gap-2.5 [@media(min-width:1440px)]:gap-4 px-2.5 py-1.5 [@media(min-width:1440px)]:px-4.5 [@media(min-width:1440px)]:py-3 rounded-lg [@media(min-width:1440px)]:rounded-2xl bg-zinc-950/90 border border-white/10 hover:border-emerald-500/40 shadow-xl backdrop-blur-md transition-all duration-200 cursor-pointer text-left"
      >
        {/* Animated Sound Wave Equalizer Bars (GPU transform: scaleY, zero layout reflow) */}
        <div className="flex items-end gap-[2px] [@media(min-width:1440px)]:gap-[3.5px] h-[18px] [@media(min-width:1440px)]:h-[27px] px-0.5">
          {BARS.map((bar) => (
            <span
              key={bar.id}
              style={{
                height: bar.height,
                transformOrigin: 'bottom',
                animation: isPlaying ? `heroAudioWave ${bar.duration} ease-in-out infinite alternate ${bar.delay}` : 'none',
                transform: isPlaying ? undefined : 'scaleY(0.25)',
                willChange: 'transform',
              }}
              className={`w-[2.5px] [@media(min-width:1440px)]:w-[4px] rounded-t-[1px] transition-colors duration-200 ${
                isPlaying
                  ? 'bg-emerald-400 shadow-[0_0_6px_#00ffaa]'
                  : 'bg-zinc-600'
              }`}
            />
          ))}
        </div>

        {/* Audio Meta Text */}
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 [@media(min-width:1440px)]:gap-2">
            <span
              className={`w-1.5 h-1.5 [@media(min-width:1440px)]:w-2.5 [@media(min-width:1440px)]:h-2.5 rounded-full transition-colors duration-200 ${
                isPlaying
                  ? 'bg-emerald-400 shadow-[0_0_6px_#00ffaa] animate-pulse'
                  : 'bg-zinc-600'
              }`}
            />
            <span className="text-[8px] sm:text-[8.5px] [@media(min-width:1440px)]:text-[12px] tracking-[1.5px] [@media(min-width:1440px)]:tracking-[2px] font-bold text-zinc-300 uppercase">
              BGM // {isPlaying ? 'ACTIVE' : 'MUTED'}
            </span>
          </div>
          <span className="text-[7px] [@media(min-width:1440px)]:text-[10px] tracking-wider text-zinc-500 uppercase">
            44.1kHz • AMBIENT
          </span>
        </div>

        {/* Play/Mute Icon Indicator */}
        <div className="pl-1 text-zinc-400 group-hover:text-white transition-colors [&>svg]:w-[13px] [&>svg]:h-[13px] [@media(min-width:1440px)]:[&>svg]:w-[19px] [@media(min-width:1440px)]:[&>svg]:h-[19px]">
          {isPlaying ? (
            <Volume2 strokeWidth={2} className="text-emerald-400 drop-shadow-[0_0_6px_rgba(0,255,170,0.6)]" />
          ) : (
            <VolumeX strokeWidth={2} className="text-zinc-500" />
          )}
        </div>
      </button>

      {/* GPU Keyframe Style for Equalizer (ScaleY Only) */}
      <style>{`
        @keyframes heroAudioWave {
          0% {
            transform: scaleY(0.2);
          }
          100% {
            transform: scaleY(1.0);
          }
        }
      `}</style>
    </div>
  )
}

export default memo(HeroAudioPlayer)

