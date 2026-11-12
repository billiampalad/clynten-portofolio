import { memo } from 'react'
import { ABOUT_SECTIONS } from './aboutData'

function AboutNarrativeCard({ activeTab, setActiveTab, isLight = false }) {
  const currentSectionIndex = ABOUT_SECTIONS.findIndex((s) => s.id === activeTab)
  const currentSection = ABOUT_SECTIONS[currentSectionIndex] || ABOUT_SECTIONS[0]
  const nextSection = ABOUT_SECTIONS[(currentSectionIndex + 1) % ABOUT_SECTIONS.length]

  return (
    <div
      key={currentSection.id}
      className={`relative max-md:rounded-[clamp(12px,3.88vw,20px)] rounded-2xl md:max-lg:rounded-[clamp(12px,1.5vw,16px)] [@media(min-width:1440px)]:rounded-3xl max-md:px-[clamp(14px,4.85vw,26px)] max-md:py-[clamp(14px,2.37dvh,26px)] p-5 sm:p-6 md:max-lg:p-[clamp(18px,min(2.4vw,2.4vh),24px)] [@media(min-width:1440px)]:p-9 [@media(min-width:1600px)]:p-11 backdrop-blur-md overflow-hidden transition-all duration-300 ${
        isLight
          ? 'bg-white/90 border border-slate-200 shadow-[0_16px_36px_rgba(0,0,0,0.06)]'
          : 'bg-[#191720]/85 border border-white/10 shadow-[0_16px_36px_rgba(0,0,0,0.5)]'
      }`}
    >
      {/* Header Tag */}
      <div className="max-md:mb-[clamp(8px,1.42dvh,16px)] mb-3 md:max-lg:mb-[clamp(8px,1vh,12px)] [@media(min-width:1440px)]:mb-5">
        <span
          className={`inline-block font-mono max-md:text-[clamp(10px,2.91vw,14px)] text-xs md:max-lg:text-[clamp(10px,1.2vw,12px)] [@media(min-width:1440px)]:text-lg [@media(min-width:1600px)]:text-xl font-semibold max-md:tracking-[clamp(1px,0.36vw,2px)] tracking-[1.5px] md:max-lg:tracking-[clamp(1.1px,0.15vw,1.5px)] uppercase transition-colors duration-300 ${
            isLight ? 'text-rose-600' : 'text-rose-400'
          }`}
        >
          {currentSection.index} // {currentSection.tag}
        </span>
      </div>

      {/* Body Content */}
      <div className="flex flex-col max-md:gap-[clamp(8px,1.42dvh,16px)] gap-3 md:max-lg:gap-[clamp(8px,1vh,12px)] [@media(min-width:1440px)]:gap-5 max-md:min-h-[clamp(90px,14.22dvh,140px)] min-h-[120px] sm:min-h-[110px] md:max-lg:min-h-[clamp(85px,11vh,110px)] [@media(min-width:1440px)]:min-h-[160px] [@media(min-width:1600px)]:min-h-[180px]">
        {currentSection.paragraphs.map((p, idx) => (
          <p
            key={idx}
            className={`max-md:text-[clamp(12px,3.4vw,16px)] text-[14px] sm:text-[14.5px] md:max-lg:text-[clamp(12px,min(1.4vw,1.5vh),14.5px)] [@media(min-width:1440px)]:text-[22px] [@media(min-width:1600px)]:text-[24px] [@media(min-width:1920px)]:text-[26px] leading-relaxed md:max-lg:leading-[1.6] [@media(min-width:1440px)]:leading-[1.8] font-normal m-0 transition-colors duration-300 ${
              isLight ? 'text-slate-700' : 'text-zinc-200/90'
            }`}
          >
            {p}
          </p>
        ))}
      </div>

      {/* Footer: Pagination & Next Button */}
      <div
        className={`flex items-center justify-between max-md:mt-[clamp(10px,1.9dvh,20px)] mt-4 md:max-lg:mt-[clamp(12px,1.5vh,16px)] [@media(min-width:1440px)]:mt-7 max-md:pt-[clamp(9px,1.66dvh,18px)] pt-3.5 md:max-lg:pt-[clamp(10px,1.2vh,14px)] [@media(min-width:1440px)]:pt-5 border-t transition-colors duration-300 ${
          isLight ? 'border-slate-200' : 'border-white/10'
        }`}
      >
        {/* Pagination Dots */}
        <div className="flex items-center max-md:gap-[clamp(4px,1.46vw,8px)] gap-1.5 md:max-lg:gap-[clamp(4px,0.6vw,6px)] [@media(min-width:1440px)]:gap-2.5">
          {ABOUT_SECTIONS.map((sec) => {
            const isActive = activeTab === sec.id
            return (
              <button
                key={sec.id}
                type="button"
                onClick={() => setActiveTab(sec.id)}
                aria-label={`Jump to ${sec.tag}`}
                title={sec.tag}
                className={`relative max-md:h-[clamp(4.5px,0.71dvh,8px)] h-1.5 md:max-lg:h-[clamp(4px,0.5vh,6px)] [@media(min-width:1440px)]:h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'max-md:w-[clamp(12px,3.88vw,20px)] w-4 md:max-lg:w-[clamp(12px,1.6vw,16px)] bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.7)]'
                    : isLight
                    ? 'max-md:w-[clamp(4.5px,1.46vw,8px)] w-1.5 md:max-lg:w-[clamp(4px,0.6vw,6px)] bg-slate-300 hover:bg-slate-400'
                    : 'max-md:w-[clamp(4.5px,1.46vw,8px)] w-1.5 md:max-lg:w-[clamp(4px,0.6vw,6px)] bg-white/20 hover:bg-white/40'
                }`}
              >
                <span className="absolute -inset-2" />
              </button>
            )
          })}
          <span
            className={`max-md:ml-[clamp(5px,1.94vw,10px)] ml-2 md:max-lg:ml-[clamp(6px,0.8vw,8px)] [@media(min-width:1440px)]:ml-3 font-mono max-md:text-[clamp(9.5px,2.67vw,13px)] text-[11px] md:max-lg:text-[clamp(9.5px,1.1vw,11px)] [@media(min-width:1440px)]:text-[15px] transition-colors duration-300 ${
              isLight ? 'text-slate-500' : 'text-zinc-400'
            }`}
          >
            {currentSection.index} / 0{ABOUT_SECTIONS.length}
          </span>
        </div>

        {/* Next Section Switcher */}
        {nextSection && (
          <button
            type="button"
            onClick={() => setActiveTab(nextSection.id)}
            className={`inline-flex items-center max-md:gap-[clamp(4px,1.46vw,8px)] gap-1.5 md:max-lg:gap-[clamp(4px,0.6vw,6px)] [@media(min-width:1440px)]:gap-2 max-md:px-[clamp(8px,2.91vw,15px)] px-3 md:max-lg:px-[clamp(9px,1.2vw,12px)] max-md:py-[clamp(4px,0.71dvh,8px)] py-1.5 md:max-lg:py-[clamp(5px,0.7vh,6px)] [@media(min-width:1440px)]:px-4.5 [@media(min-width:1440px)]:py-2 [@media(min-width:1600px)]:px-5 [@media(min-width:1600px)]:py-2.5 max-md:rounded-[clamp(6px,1.94vw,10px)] rounded-lg md:max-lg:rounded-[clamp(6px,0.8vw,8px)] [@media(min-width:1440px)]:rounded-xl font-mono max-md:text-[clamp(10px,2.91vw,14px)] text-xs md:max-lg:text-[clamp(10px,1.2vw,12px)] [@media(min-width:1440px)]:text-lg [@media(min-width:1600px)]:text-xl font-semibold shadow-md hover:translate-x-0.5 transition-all duration-200 cursor-pointer ${
              isLight
                ? 'bg-gradient-to-b from-slate-100 to-slate-200 border border-slate-300 text-rose-600 hover:from-rose-50 hover:to-rose-100 hover:text-rose-700'
                : 'bg-gradient-to-b from-[#35303f] to-[#221f2b] border border-white/10 text-rose-400 hover:from-[#3e242c] hover:to-[#26181d] hover:border-rose-500/40 hover:text-rose-300'
            }`}
          >
            <span>Next</span>
            <span aria-hidden="true">→</span>
          </button>
        )}
      </div>
    </div>
  )
}

export default memo(AboutNarrativeCard)

