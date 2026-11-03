import { useState, useEffect, memo } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { heroAudio } from '@/utils/heroAudio'

const BARS = [
  { id: 1, duration: '0.65s', delay: '0.0s', height: '70%' },
  { id: 2, duration: '0.45s', delay: '0.15s', height: '100%' },
  { id: 3, duration: '0.8s', delay: '0.3s', height: '60%' },
  { id: 4, duration: '0.55s', delay: '0.1s', height: '85%' },
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
    <div className="w-full static pointer-events-auto select-none font-mono md:max-lg:static md:max-lg:w-full lg:absolute lg:bottom-[clamp(124px,17vh,156px)] [@media(min-width:1440px)]:bottom-[clamp(150px,17.78vh,192px)] lg:right-[clamp(70px,5.8vw,82px)] lg:left-auto lg:translate-x-0 [@media(min-width:1440px)]:right-[clamp(54px,3.75vw,72px)] lg:z-25">
      <button
        type="button"
        onClick={handleToggle}
        aria-label={isPlaying ? 'Pause Background Audio' : 'Play Background Audio'}
        aria-pressed={isPlaying}
        className="group flex items-center md:max-lg:w-full md:max-lg:justify-between gap-2.5 md:max-lg:gap-[clamp(10px,1.27vw,15px)] lg:gap-[clamp(8px,1vw,13px)] [@media(min-width:1440px)]:gap-[clamp(12px,0.83vw,16px)] px-2.5 py-1.5 md:max-lg:px-[clamp(11px,1.37vw,15px)] md:max-lg:py-[clamp(7px,0.9vh,10px)] lg:px-[clamp(10px,1.1vw,14px)] lg:py-[clamp(6px,1.1vh,10px)] [@media(min-width:1440px)]:px-[clamp(13.5px,0.94vw,18px)] [@media(min-width:1440px)]:py-[clamp(9px,1.11vh,12px)] rounded-lg md:max-lg:rounded-xl lg:rounded-xl [@media(min-width:1440px)]:rounded-[clamp(12px,0.83vw,16px)] bg-zinc-950/90 border border-white/10 hover:border-emerald-500/40 shadow-xl backdrop-blur-md transition-all duration-200 cursor-pointer text-left md:max-lg:box-border"
      >
        <div className="flex items-center gap-2.5 md:max-lg:gap-[clamp(10px,1.27vw,15px)]">
          {/* Animated Sound Wave Equalizer Bars (GPU transform: scaleY, zero layout reflow) */}
          <div className="flex items-end gap-[2px] md:max-lg:gap-[clamp(2.5px,0.29vw,3.5px)] lg:gap-[clamp(2px,0.22vw,3px)] [@media(min-width:1440px)]:gap-[clamp(3px,0.21vw,4px)] h-[18px] md:max-lg:h-[clamp(20px,2.44vh,26px)] lg:h-[clamp(18px,2.6vh,22px)] [@media(min-width:1440px)]:h-[clamp(24px,2.96vh,32px)] px-0.5">
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
                className={`w-[2.5px] md:max-lg:w-[clamp(3px,0.34vw,4px)] lg:w-[clamp(2.8px,0.25vw,3.5px)] [@media(min-width:1440px)]:w-[clamp(3.5px,0.26vw,5px)] rounded-t-[1px] transition-colors duration-200 ${
                  isPlaying
                    ? 'bg-emerald-400 shadow-[0_0_6px_#00ffaa]'
                    : 'bg-zinc-600'
                }`}
              />
            ))}
          </div>

          {/* Audio Meta Text */}
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 md:max-lg:gap-[clamp(6px,0.78vw,8px)] lg:gap-[clamp(5px,0.6vw,7px)] [@media(min-width:1440px)]:gap-2">
              <span
                className={`w-1.5 h-1.5 md:max-lg:w-[clamp(7px,0.88vh,9px)] md:max-lg:h-[clamp(7px,0.88vh,9px)] lg:w-[clamp(6px,0.9vh,8px)] lg:h-[clamp(6px,0.9vh,8px)] [@media(min-width:1440px)]:w-[clamp(7.5px,0.52vw,10px)] [@media(min-width:1440px)]:h-[clamp(7.5px,0.52vw,10px)] rounded-full transition-colors duration-200 ${
                  isPlaying
                    ? 'bg-emerald-400 shadow-[0_0_6px_#00ffaa] animate-pulse'
                    : 'bg-zinc-600'
                }`}
              />
              <span className="text-[8px] sm:text-[8.5px] md:max-lg:text-[clamp(11px,1.37vh,13.5px)] lg:text-[clamp(8.5px,1.25vh,10px)] [@media(min-width:1440px)]:text-[clamp(9.5px,0.63vw,12px)] tracking-[1.5px] md:max-lg:tracking-[clamp(1.6px,0.18vw,2.2px)] lg:tracking-[1.7px] [@media(min-width:1440px)]:tracking-[clamp(1.5px,0.1vw,2px)] font-bold text-zinc-300 uppercase">
                BGM // {isPlaying ? 'ACTIVE' : 'MUTED'}
              </span>
            </div>
            <span className="text-[7px] md:max-lg:text-[clamp(9px,1.07vh,11px)] lg:text-[clamp(7.5px,1vh,8.5px)] [@media(min-width:1440px)]:text-[clamp(8px,0.52vw,10px)] tracking-wider md:max-lg:tracking-[clamp(1.2px,0.14vw,1.6px)] text-zinc-500 uppercase">
              44.1kHz • AMBIENT
            </span>
          </div>
        </div>

        {/* Play/Mute Icon Indicator */}
        <div className="pl-1 text-zinc-400 group-hover:text-white transition-colors [&>svg]:w-[13px] [&>svg]:h-[13px] md:max-lg:[&>svg]:w-[clamp(16px,1.95vh,20px)] md:max-lg:[&>svg]:h-[clamp(16px,1.95vh,20px)] lg:[&>svg]:w-[clamp(13px,1.8vh,15px)] lg:[&>svg]:h-[clamp(13px,1.8vh,15px)] [@media(min-width:1440px)]:[&>svg]:w-[clamp(15px,0.99vw,19px)] [@media(min-width:1440px)]:[&>svg]:h-[clamp(15px,0.99vw,19px)]">
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

