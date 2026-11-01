import { useState, useEffect, memo } from 'react'
import { SKILLS_ROTATION } from './aboutData'

function AboutHeadline({ isLight = false }) {
  const [skillIndex, setSkillIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState(SKILLS_ROTATION[0])
  const [isDeleting, setIsDeleting] = useState(false)

  // Typing and Deleting Effect (Typewriter) dengan interval stabil & hemat CPU
  useEffect(() => {
    const currentWord = SKILLS_ROTATION[skillIndex]
    let timer

    if (!isDeleting) {
      if (displayedText.length < currentWord.length) {
        timer = setTimeout(() => {
          setDisplayedText(currentWord.slice(0, displayedText.length + 1))
        }, 110)
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true)
        }, 2200)
      }
    } else {
      if (displayedText.length > 0) {
        timer = setTimeout(() => {
          setDisplayedText(currentWord.slice(0, displayedText.length - 1))
        }, 60)
      } else {
        timer = setTimeout(() => {
          setIsDeleting(false)
          setSkillIndex((prev) => (prev + 1) % SKILLS_ROTATION.length)
        }, 360)
      }
    }

    return () => clearTimeout(timer)
  }, [displayedText, isDeleting, skillIndex])

  return (
    <div className="flex flex-col gap-2 md:max-lg:gap-[clamp(6px,min(0.8vw,0.8vh),8px)] [@media(min-width:1440px)]:gap-3.5 mb-2 md:max-lg:mb-[clamp(4px,min(0.8vw,0.8vh),8px)] [@media(min-width:1440px)]:mb-3 transition-colors duration-300">
      {/* Tagline & Greeting */}
      <div className="flex items-center gap-2.5 md:max-lg:gap-[clamp(7px,1vw,10px)] [@media(min-width:1440px)]:gap-3.5 flex-wrap">
        <span
          className={`inline-flex items-center gap-1.5 md:max-lg:gap-[clamp(4px,0.6vw,6px)] [@media(min-width:1440px)]:gap-2 font-mono text-[10px] md:max-lg:text-[clamp(9px,min(1.1vw,1.2vh),10px)] [@media(min-width:1440px)]:text-[13.5px] [@media(min-width:1600px)]:text-[15px] font-bold tracking-[1.5px] md:max-lg:tracking-[clamp(1.1px,0.15vw,1.5px)] uppercase px-2.5 md:max-lg:px-[clamp(7px,1vw,10px)] py-0.5 md:max-lg:py-[clamp(1px,0.2vh,2px)] [@media(min-width:1440px)]:px-4 [@media(min-width:1440px)]:py-1.5 rounded-full transition-colors duration-300 ${
            isLight
              ? 'text-rose-600 bg-rose-50 border border-rose-200 shadow-sm'
              : 'text-rose-500 bg-rose-500/10 border border-rose-500/30 shadow-[0_0_12px_rgba(244,63,94,0.15)]'
          }`}
        >
          <span className="w-1.5 h-1.5 md:max-lg:w-[clamp(4px,0.6vw,6px)] md:max-lg:h-[clamp(4px,0.6vw,6px)] [@media(min-width:1440px)]:w-2.5 [@media(min-width:1440px)]:h-2.5 rounded-full bg-rose-500 shadow-[0_0_6px_#f43f5e] animate-pulse" />
          <span>About</span>
        </span>
        <span
          className={`font-mono text-xs md:max-lg:text-[clamp(11px,min(1.4vw,1.6vh),14px)] md:text-sm [@media(min-width:1440px)]:text-base [@media(min-width:1600px)]:text-lg font-semibold tracking-wider uppercase transition-colors duration-300 ${
            isLight ? 'text-slate-700' : 'text-slate-200'
          }`}
        >
          Hallo, I'm
        </span>
      </div>

      {/* Main Name & Animated Skill Rotator */}
      <div className="flex items-baseline flex-wrap gap-x-4 md:max-lg:gap-x-[clamp(10px,1.6vw,16px)] [@media(min-width:1440px)]:gap-x-5 gap-y-1 md:max-lg:gap-y-[clamp(2px,0.5vh,4px)] [@media(min-width:1440px)]:gap-y-1.5">
        <h2
          className={`font-mono text-3xl sm:text-4xl md:max-lg:text-[clamp(27px,min(3.6vw,4.2vh),36px)] lg:text-5xl [@media(min-width:1440px)]:text-[52px] [@media(min-width:1600px)]:text-[62px] font-black tracking-tight leading-none transition-colors duration-300 ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}
        >
          Clynten Palad
        </h2>

        <div
          className={`inline-flex items-baseline gap-2 md:max-lg:gap-[clamp(6px,0.8vw,8px)] [@media(min-width:1440px)]:gap-3.5 font-mono transition-colors duration-300 ${
            isLight ? 'text-slate-600' : 'text-zinc-400'
          }`}
        >
          <span className={`text-sm sm:text-base md:text-lg md:max-lg:text-[clamp(13px,min(1.8vw,2.1vh),18px)] [@media(min-width:1440px)]:text-[24px] [@media(min-width:1600px)]:text-[28px] [@media(min-width:1920px)]:text-[32px] font-medium ${isLight ? 'text-slate-500' : 'text-zinc-500'}`}>
            And I'm a
          </span>
          <span className={`text-base sm:text-lg md:text-xl md:max-lg:text-[clamp(15px,min(2.1vw,2.4vh),20px)] [@media(min-width:1440px)]:text-[32px] [@media(min-width:1600px)]:text-[38px] [@media(min-width:1920px)]:text-[44px] font-bold tracking-tight ${isLight ? 'text-rose-600' : 'text-rose-400'}`}>
            {displayedText}
            <span className="text-rose-500 font-black ml-0.5 animate-pulse" aria-hidden="true">_</span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default memo(AboutHeadline)
