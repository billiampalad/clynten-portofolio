import { ABOUT_SECTIONS } from './aboutData'

export default function AboutNarrativeCard({ activeTab, setActiveTab }) {
  const currentSectionIndex = ABOUT_SECTIONS.findIndex((s) => s.id === activeTab)
  const currentSection = ABOUT_SECTIONS[currentSectionIndex] || ABOUT_SECTIONS[0]
  const nextSection = ABOUT_SECTIONS[(currentSectionIndex + 1) % ABOUT_SECTIONS.length]

  return (
    <div
      key={currentSection.id}
      className="relative bg-[#191720]/85 border border-white/10 rounded-2xl p-5 sm:p-6 shadow-[0_16px_36px_rgba(0,0,0,0.5)] backdrop-blur-md overflow-hidden transition-all duration-300 before:absolute before:top-0 before:left-0 before:right-0 before:h-[2px] before:bg-gradient-to-r before:from-transparent before:via-rose-500/80 before:to-transparent animate-fadeInTab"
    >
      {/* Header Tag */}
      <div className="mb-3.5">
        <span className="inline-block font-mono text-[10.5px] tracking-[1.5px] uppercase text-[#ff4d6d] bg-rose-500/10 border border-rose-500/30 px-2.5 py-0.5 rounded-md">
          {currentSection.index} // {currentSection.tag}
        </span>
      </div>

      {/* Body Content */}
      <div className="flex flex-col gap-3 min-h-[120px] sm:min-h-[110px]">
        {currentSection.paragraphs.map((p, idx) => (
          <p
            key={idx}
            className="text-[14px] sm:text-[14.5px] leading-relaxed text-zinc-200/90 font-normal m-0"
          >
            {p}
          </p>
        ))}
      </div>

      {/* Footer: Pagination & Next Button */}
      <div className="flex items-center justify-between mt-4 pt-3.5 border-t border-white/10">
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
                    : 'w-1.5 bg-white/20 hover:bg-white/40'
                }`}
              >
                <span className="absolute -inset-2" />
              </button>
            )
          })}
          <span className="ml-2 font-mono text-[11px] text-zinc-400">
            {currentSection.index} / 0{ABOUT_SECTIONS.length}
          </span>
        </div>

        {/* Next Section Switcher */}
        {nextSection && (
          <button
            type="button"
            onClick={() => setActiveTab(nextSection.id)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs font-semibold text-rose-400 bg-gradient-to-b from-[#35303f] to-[#221f2b] border border-white/10 shadow-[0_4px_10px_rgba(0,0,0,0.5)] hover:from-[#3e242c] hover:to-[#26181d] hover:border-rose-500/40 hover:text-rose-300 hover:translate-x-0.5 transition-all duration-200 cursor-pointer"
          >
            <span>Next</span>
            <span aria-hidden="true">→</span>
          </button>
        )}
      </div>
    </div>
  )
}
