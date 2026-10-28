import { useState, useEffect } from 'react'
import { SKILLS_ROTATION } from './aboutData'

export default function AboutHeadline({ isLight = false }) {
  const [skillIndex, setSkillIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  // Typing and Deleting Effect (Typewriter)
  useEffect(() => {
    const currentWord = SKILLS_ROTATION[skillIndex]
    let timer

    if (!isDeleting) {
      if (displayedText.length < currentWord.length) {
        timer = setTimeout(() => {
          setDisplayedText(currentWord.slice(0, displayedText.length + 1))
        }, 90)
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true)
        }, 1800)
      }
    } else {
      if (displayedText.length > 0) {
        timer = setTimeout(() => {
          setDisplayedText(currentWord.slice(0, displayedText.length - 1))
        }, 45)
      } else {
        timer = setTimeout(() => {
          setIsDeleting(false)
          setSkillIndex((prev) => (prev + 1) % SKILLS_ROTATION.length)
        }, 320)
      }
    }

    return () => clearTimeout(timer)
  }, [displayedText, isDeleting, skillIndex])

  return (
    <div className="flex flex-col gap-2 mb-2 transition-colors duration-300">
      {/* Tagline & Greeting */}
      <div className="flex items-center gap-2.5 flex-wrap">
        <span
          className={`inline-flex items-center gap-1.5 font-mono text-[10px] font-bold tracking-[1.5px] uppercase px-2.5 py-0.5 rounded-full transition-colors duration-300 ${
            isLight
              ? 'text-rose-600 bg-rose-50 border border-rose-200 shadow-sm'
              : 'text-rose-500 bg-rose-500/10 border border-rose-500/30 shadow-[0_0_12px_rgba(244,63,94,0.15)]'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shadow-[0_0_6px_#f43f5e] animate-pulse" />
          <span>About</span>
        </span>
        <span
          className={`font-mono text-xs md:text-sm font-semibold tracking-wider uppercase transition-colors duration-300 ${
            isLight ? 'text-slate-700' : 'text-slate-200'
          }`}
        >
          Hallo, I'm
        </span>
      </div>

      {/* Main Name & Animated Skill Rotator */}
      <div className="flex items-baseline flex-wrap gap-x-4 gap-y-1">
        <h2
          className={`font-mono text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-none transition-colors duration-300 ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}
        >
          Clynten Palad
        </h2>

        <div
          className={`inline-flex items-center gap-2 font-mono text-xs sm:text-sm font-semibold tracking-wide transition-colors duration-300 ${
            isLight ? 'text-slate-600' : 'text-zinc-400'
          }`}
        >
          <span className={isLight ? 'text-slate-500' : 'text-zinc-500'}>And I'm a</span>
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-md transition-colors duration-300 ${
              isLight
                ? 'text-rose-600 bg-rose-50 border border-rose-200 shadow-sm'
                : 'text-rose-400 bg-rose-500/10 border border-rose-500/25 shadow-[0_0_10px_rgba(244,63,94,0.12)]'
            }`}
          >
            <span>{displayedText}</span>
            <span className="text-rose-500 font-bold ml-0.5 animate-pulse" aria-hidden="true">_</span>
          </span>
        </div>
      </div>
    </div>
  )
}
