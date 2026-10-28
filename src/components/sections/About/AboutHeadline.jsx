import { useState, useEffect } from 'react'
import { SKILLS_ROTATION } from './aboutData'

export default function AboutHeadline() {
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
    <div className="flex flex-col gap-2 mb-2">
      {/* Tagline & Greeting */}
      <div className="flex items-center gap-2.5 flex-wrap">
        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold tracking-[1.5px] uppercase text-rose-500 bg-rose-500/10 border border-rose-500/30 px-2.5 py-0.5 rounded-full shadow-[0_0_12px_rgba(244,63,94,0.15)]">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shadow-[0_0_6px_#f43f5e] animate-pulse" />
          <span>About</span>
        </span>
        <span className="font-mono text-xs md:text-sm font-semibold text-slate-200 tracking-wider uppercase">
          Hallo, I'm
        </span>
      </div>

      {/* Main Name & Animated Skill Rotator */}
      <div className="flex items-baseline flex-wrap gap-x-4 gap-y-1">
        <h2 className="font-mono text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-none">
          Clynten Palad
        </h2>

        <div className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm font-semibold tracking-wide text-zinc-400">
          <span className="text-zinc-500">And I'm a</span>
          <span className="inline-flex items-center text-rose-400 bg-rose-500/10 border border-rose-500/25 px-2 py-0.5 rounded-md shadow-[0_0_10px_rgba(244,63,94,0.12)]">
            <span>{displayedText}</span>
            <span className="text-rose-500 font-bold ml-0.5 animate-pulse" aria-hidden="true">_</span>
          </span>
        </div>
      </div>
    </div>
  )
}
