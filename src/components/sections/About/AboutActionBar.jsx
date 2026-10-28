import TechIcon from '@/components/sections/Skills/TechIcon'
import { PROJECT_TECH_STACK } from './aboutData'

export default function AboutActionBar({ onContactClick, isLight = false }) {
  return (
    <div
      className={`relative z-20 flex flex-wrap items-center justify-between gap-3.5 p-3 sm:px-4 sm:py-3 rounded-xl backdrop-blur-md transition-all duration-300 ${
        isLight
          ? 'bg-white/90 border border-slate-200 shadow-[0_12px_28px_rgba(0,0,0,0.06)]'
          : 'bg-[#191720]/85 border border-white/10 shadow-[0_12px_28px_rgba(0,0,0,0.4)]'
      }`}
    >
      {/* Left: Project Tech Stack Icons */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {PROJECT_TECH_STACK.map((tech) => (
          <div
            key={tech.key}
            className={`group relative w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 cursor-pointer ${
              isLight
                ? 'bg-slate-100/90 border border-slate-200/90 hover:bg-rose-50 hover:border-rose-300 hover:-translate-y-0.5'
                : 'bg-white/[0.04] border border-white/[0.08] hover:bg-rose-500/15 hover:border-rose-500/40 hover:-translate-y-0.5'
            }`}
            aria-label={tech.name}
          >
            <TechIcon name={tech.key} className="w-4 h-4" />

            {/* Micro Tooltip */}
            <div
              role="tooltip"
              className="pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-[#0e121a]/95 border border-white/15 text-slate-100 font-mono text-[11px] font-semibold tracking-wide whitespace-nowrap opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-200 shadow-xl z-50 before:content-[''] before:absolute before:-bottom-1 before:left-1/2 before:-translate-x-1/2 before:w-2 before:h-2 before:bg-[#0e121a]/95 before:border-r before:border-b before:border-white/15 before:rotate-45"
            >
              <span>{tech.name}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Right: Actions (Contact + Resume + LinkedIn) */}
      <div className="flex items-center gap-2.5 flex-wrap">
        {/* Get in Touch CTA */}
        <a
          href="#contact"
          onClick={onContactClick}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-mono text-xs font-semibold text-white bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 border border-white/20 shadow-[0_4px_14px_rgba(244,63,94,0.35)] hover:shadow-[0_6px_18px_rgba(244,63,94,0.5)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
        >
          <span>Get in touch</span>
          <span className="font-bold transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">→</span>
        </a>

        {/* Download Resume Button */}
        <a
          href="/assets/CV%20ATS%20-%20CLYNTEN%20BILLIAM%20PALAD.pdf"
          download="CV ATS - CLYNTEN BILLIAM PALAD.pdf"
          target="_blank"
          rel="noopener noreferrer"
          title="Download Resume (ATS Format)"
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs font-semibold transition-all duration-200 cursor-pointer ${
            isLight
              ? 'text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 hover:border-rose-400 hover:text-rose-600 hover:-translate-y-0.5'
              : 'text-zinc-200 bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-rose-500/40 hover:text-rose-300 hover:-translate-y-0.5'
          }`}
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeLinecap="round" strokeLinejoin="round" />
            <polyline points="7 10 12 15 17 10" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="12" y1="15" x2="12" y2="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Resume</span>
        </a>

        {/* LinkedIn Icon Button */}
        <a
          href="https://www.linkedin.com/in/clynten-palad-915a41432"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn Profile"
          className={`group relative w-8 h-8 rounded-lg inline-flex items-center justify-center text-[#0a66c2] transition-all duration-200 cursor-pointer ${
            isLight
              ? 'bg-slate-100 border border-slate-200 hover:bg-[#0a66c2]/10 hover:border-[#0a66c2]/40 hover:-translate-y-0.5'
              : 'bg-white/[0.05] border border-white/10 hover:bg-[#0a66c2]/15 hover:border-[#0a66c2]/50 hover:-translate-y-0.5'
          }`}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
          </svg>

          {/* Micro Tooltip */}
          <div
            role="tooltip"
            className="pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-[#0e121a]/95 border border-white/15 text-slate-100 font-mono text-[11px] font-semibold tracking-wide whitespace-nowrap opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-200 shadow-xl z-50 before:content-[''] before:absolute before:-bottom-1 before:left-1/2 before:-translate-x-1/2 before:w-2 before:h-2 before:bg-[#0e121a]/95 before:border-r before:border-b before:border-white/15 before:rotate-45"
          >
            <span>LinkedIn</span>
          </div>
        </a>
      </div>
    </div>
  )
}
