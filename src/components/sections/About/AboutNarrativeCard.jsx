import { ABOUT_SECTIONS } from './aboutData'

export default function AboutNarrativeCard({ activeTab, setActiveTab, isLight = false }) {
  const currentSectionIndex = ABOUT_SECTIONS.findIndex((s) => s.id === activeTab)
  const currentSection = ABOUT_SECTIONS[currentSectionIndex] || ABOUT_SECTIONS[0]
  const nextSection = ABOUT_SECTIONS[(currentSectionIndex + 1) % ABOUT_SECTIONS.length]

  return (
    <div
      key={currentSection.id}
      className={`relative rounded-2xl p-5 sm:p-6 backdrop-blur-md overflow-hidden transition-all duration-300 before:absolute before:top-0 before:left-0 before:right-0 before:h-[2px] before:bg-gradient-to-r before:from-transparent before:via-rose-500/80 before:to-transparent ${
        isLight
          ? 'bg-white/90 border border-slate-200 shadow-[0_16px_36px_rgba(0,0,0,0.06)]'
          : 'bg-[#191720]/85 border border-white/10 shadow-[0_16px_36px_rgba(0,0,0,0.5)]'
      }`}
    >
      {/* Header Tag */}
      <div className="mb-3">
        <span
          className={`inline-block font-mono text-xs font-semibold tracking-[1.5px] uppercase transition-colors duration-300 ${
            isLight ? 'text-rose-600' : 'text-rose-400'
          }`}
        >
          {currentSection.index} // {currentSection.tag}
        </span>
      </div>

      {/* Body Content */}
      <div className="flex flex-col gap-3 min-h-[120px] sm:min-h-[110px]">
        {currentSection.paragraphs.map((p, idx) => (
          <p
            key={idx}
            className={`text-[14px] sm:text-[14.5px] leading-relaxed font-normal m-0 transition-colors duration-300 ${
              isLight ? 'text-slate-700' : 'text-zinc-200/90'
            }`}
          >
            {p}
          </p>
        ))}
      </div>

      {/* Footer: Pagination & Next Button */}
      <div
        className={`flex items-center justify-between mt-4 pt-3.5 border-t transition-colors duration-300 ${
          isLight ? 'border-slate-200' : 'border-white/10'
        }`}
      >
        {/* Pagination Dots */}
        <div className="flex items-center gap-1.5">
          {ABOUT_SECTIONS.map((sec) => {
            const isActive = activeTab === sec.id
            return (
              <button
                key={sec.id}
                type="button"
                onClick={() => setActiveTab(sec.id)}
                aria-label={`Jump to ${sec.tag}`}
                title={sec.tag}
                className={`relative h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'w-4 bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.7)]'
                    : isLight
                    ? 'w-1.5 bg-slate-300 hover:bg-slate-400'
                    : 'w-1.5 bg-white/20 hover:bg-white/40'
                }`}
              >
                <span className="absolute -inset-2" />
              </button>
            )
          })}
          <span
            className={`ml-2 font-mono text-[11px] transition-colors duration-300 ${
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
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs font-semibold shadow-md hover:translate-x-0.5 transition-all duration-200 cursor-pointer ${
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
