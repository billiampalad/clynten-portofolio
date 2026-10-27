import { useState, useEffect, useMemo } from 'react'

/**
 * Month labels matching the timeline in the reference screenshot
 * (Spans from April 2025 to October 2026 ~ 18 months / 78 weeks)
 */
const MONTH_LABELS = [
  { name: 'Apr', colIndex: 0 },
  { name: 'May', colIndex: 4 },
  { name: 'Jun', colIndex: 8 },
  { name: 'Jul', colIndex: 12 },
  { name: 'Aug', colIndex: 16 },
  { name: 'Sep', colIndex: 21 },
  { name: 'Oct', colIndex: 25 },
  { name: 'Nov', colIndex: 29 },
  { name: 'Dec', colIndex: 33 },
  { name: "Jan '26", colIndex: 38 },
  { name: 'Feb', colIndex: 42 },
  { name: 'Mar', colIndex: 46 },
  { name: 'Apr', colIndex: 50 },
  { name: 'May', colIndex: 54 },
  { name: 'Jun', colIndex: 59 },
  { name: 'Jul', colIndex: 63 },
  { name: 'Aug', colIndex: 67 },
  { name: 'Sep', colIndex: 71 },
  { name: 'Oct', colIndex: 75 },
]

const TOTAL_WEEKS = 78
const DAYS_PER_WEEK = 7

/**
 * Seeded pseudo-random generator for consistent heatmap rendering
 */
function seededRandom(seed) {
  const x = Math.sin(seed++) * 10000
  return x - Math.floor(x)
}

/**
 * Generates realistic contribution distribution matching the screenshot:
 * - Apr-Aug 2025: Moderate bursts & clusters
 * - Sep 2025-Apr 2026: Calm period with sporadic commits
 * - May-Oct 2026: Heavy intense activity (dense level 3 & 4 red clusters)
 */
function generateContributionGrid() {
  const grid = []
  const startDate = new Date(2025, 3, 6) // Sunday, April 6, 2025

  for (let w = 0; w < TOTAL_WEEKS; w++) {
    const week = []
    for (let d = 0; d < DAYS_PER_WEEK; d++) {
      const cellDate = new Date(startDate)
      cellDate.setDate(startDate.getDate() + w * 7 + d)

      const rand = seededRandom(w * 17 + d * 31 + 109)
      let level = 0
      let count = 0

      // Pattern 1: Initial early phase (w < 20)
      if (w < 20) {
        if (rand > 0.68) {
          level = rand > 0.88 ? 3 : rand > 0.78 ? 2 : 1
          count = level === 3 ? Math.floor(rand * 6) + 5 : Math.floor(rand * 4) + 1
        }
      }
      // Pattern 2: Quiet/Winter phase (20 <= w < 54)
      else if (w < 54) {
        if (rand > 0.94) {
          level = rand > 0.98 ? 2 : 1
          count = Math.floor(rand * 3) + 1
        }
      }
      // Pattern 3: High-intensity Sprint phase (54 <= w < 60)
      else if (w < 60) {
        if (rand > 0.45) {
          level = rand > 0.82 ? 3 : rand > 0.65 ? 2 : 1
          count = Math.floor(rand * 8) + 2
        }
      }
      // Pattern 4: Peak Activity Phase (60 <= w)
      else {
        if (rand > 0.22) {
          level = rand > 0.72 ? 4 : rand > 0.48 ? 3 : rand > 0.35 ? 2 : 1
          count = level === 4 ? Math.floor(rand * 14) + 10 : Math.floor(rand * 8) + 3
        }
      }

      week.push({
        date: cellDate,
        dateString: cellDate.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
        level,
        count,
      })
    }
    grid.push(week)
  }
  return grid
}

export default function Expe({
  githubUrl = 'https://github.com/billiampalad',
  handle = '@product-llc',
  totalContributions = '3,455',
  startDateText = 'since January 2025',
}) {
  const [hoveredCell, setHoveredCell] = useState(null)
  const [isLight, setIsLight] = useState(() => {
    if (typeof document !== 'undefined') {
      return (
        document.documentElement.getAttribute('data-theme') === 'light' ||
        document.documentElement.classList.contains('light-theme')
      )
    }
    return false
  })

  // Synchronize with global theme changes
  useEffect(() => {
    const checkTheme = () => {
      const isLightMode =
        document.documentElement.getAttribute('data-theme') === 'light' ||
        document.documentElement.classList.contains('light-theme')
      setIsLight(isLightMode)
    }

    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme'],
    })

    return () => observer.disconnect()
  }, [])

  const gridData = useMemo(() => generateContributionGrid(), [])

  // Red theme level styling mapping for both Dark & Light modes
  const getCellClasses = (level) => {
    switch (level) {
      case 1:
        return isLight
          ? 'bg-[#fca5a5]/70 border-[#f87171]/40 hover:border-red-500'
          : 'bg-red-500/25 border-red-500/30 hover:border-red-400'
      case 2:
        return isLight
          ? 'bg-[#f87171] border-[#ef4444] hover:border-red-600'
          : 'bg-red-500/55 border-red-500/60 hover:border-red-400'
      case 3:
        return isLight
          ? 'bg-[#ef4444] border-[#dc2626] shadow-sm shadow-red-500/20'
          : 'bg-red-500 border-red-400 shadow-[0_0_8px_rgba(239,68,68,0.5)]'
      case 4:
        return isLight
          ? 'bg-[#dc2626] border-[#b91c1c] shadow-md shadow-red-600/30'
          : 'bg-red-600 border-red-500 shadow-[0_0_12px_rgba(220,38,38,0.7)]'
      case 0:
      default:
        return isLight
          ? 'bg-slate-100 border-slate-200/80 hover:border-slate-300'
          : 'bg-white/[0.04] border-white/[0.06] hover:border-white/20'
    }
  }

  return (
    <section
      id="experiments"
      className={`relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 transition-colors duration-500 ${
        isLight ? 'bg-white text-slate-900' : 'bg-[#0A0907] text-slate-100'
      }`}
    >
      <div className="max-w-6xl mx-auto flex flex-col">
        {/* 1. Category Tag */}
        <div className="mb-2">
          <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-red-500">
            CODE
          </span>
        </div>

        {/* 2. Main Title */}
        <h2
          className={`font-sans text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-3 ${
            isLight ? 'text-slate-950' : 'text-white'
          }`}
        >
          Experiments
        </h2>

        {/* 3. Subtitle / Narrative */}
        <p
          className={`text-sm sm:text-base md:text-[15px] font-normal max-w-2xl leading-relaxed mb-8 ${
            isLight ? 'text-slate-600' : 'text-zinc-400'
          }`}
        >
          Side projects I build to test how AI changes product design, prototyping, and delivery.
        </p>

        {/* 4. Stats & Handle Bar */}
        <div className="flex items-center justify-between gap-4 mb-4 select-none">
          {/* Total Contributions Counter */}
          <div className="font-sans text-xs sm:text-sm md:text-base">
            <span
              className={`font-bold mr-1.5 ${isLight ? 'text-slate-900' : 'text-white'}`}
            >
              {totalContributions} contributions
            </span>
            <span className={`${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
              {startDateText}
            </span>
          </div>

          {/* Social / GitHub Link Handle */}
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`font-sans text-xs sm:text-sm md:text-base font-medium inline-flex items-center gap-1 transition-colors group ${
              isLight
                ? 'text-slate-600 hover:text-red-600'
                : 'text-zinc-400 hover:text-red-400'
            }`}
          >
            <span>{handle}</span>
            <span
              className="text-xs transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            >
              ↗
            </span>
          </a>
        </div>

        {/* 5. Contributions Heatmap Stage */}
        <div className="relative w-full">
          {/* Tooltip Popup on Hover */}
          {hoveredCell && (
            <div
              className={`absolute -top-10 z-30 px-3 py-1 rounded-md text-xs font-mono font-medium shadow-lg pointer-events-none transition-all duration-150 transform -translate-x-1/2 whitespace-nowrap ${
                isLight
                  ? 'bg-slate-900 text-white shadow-slate-900/20'
                  : 'bg-zinc-800 text-zinc-100 border border-white/10 shadow-black/40'
              }`}
              style={{
                left: `${hoveredCell.x}px`,
              }}
            >
              <span className="font-bold text-red-400 mr-1.5">
                {hoveredCell.count > 0 ? `${hoveredCell.count} commits` : 'No commits'}
              </span>
              <span>on {hoveredCell.dateString}</span>
            </div>
          )}

          {/* Scrollable Heatmap Canvas */}
          <div
            className={`overflow-x-auto pb-4 pt-1 [-webkit-overflow-scrolling:touch] ${
              isLight ? 'heatmap-scrollbar-light' : 'heatmap-scrollbar-dark'
            }`}
          >
            <div className="min-w-max flex flex-col gap-2">
              {/* Month Labels Header Row */}
              <div className="relative h-5 flex text-[11px] font-mono text-zinc-400 dark:text-zinc-500 select-none">
                {MONTH_LABELS.map((m, idx) => (
                  <span
                    key={idx}
                    className="absolute"
                    style={{
                      left: `${m.colIndex * 16}px`,
                    }}
                  >
                    {m.name}
                  </span>
                ))}
              </div>

              {/* 7-Row Grid of Rounded Contribution Squares */}
              <div className="flex gap-[3px] select-none">
                {gridData.map((week, wIdx) => (
                  <div key={wIdx} className="w-[13px] flex flex-col gap-[3px] shrink-0">
                    {week.map((day, dIdx) => (
                      <div
                        key={dIdx}
                        onMouseEnter={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect()
                          const parentRect = e.currentTarget
                            .closest('.relative')
                            ?.getBoundingClientRect()
                          if (parentRect) {
                            setHoveredCell({
                              ...day,
                              x: rect.left - parentRect.left + rect.width / 2,
                            })
                          }
                        }}
                        onMouseLeave={() => setHoveredCell(null)}
                        className={`w-[13px] h-[13px] rounded-[3px] border transition-all duration-150 cursor-pointer hover:scale-125 hover:z-20 ${getCellClasses(
                          day.level
                        )}`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 6. Activity Level Legend */}
        <div className="mt-3 flex items-center justify-end gap-2 text-xs font-mono text-zinc-400 select-none">
          <span className={isLight ? 'text-slate-500' : 'text-zinc-500'}>Less</span>
          <div className="flex items-center gap-1">
            <span
              className={`w-[11px] h-[11px] rounded-[2px] border ${getCellClasses(0)}`}
              title="0 contributions"
            />
            <span
              className={`w-[11px] h-[11px] rounded-[2px] border ${getCellClasses(1)}`}
              title="Low"
            />
            <span
              className={`w-[11px] h-[11px] rounded-[2px] border ${getCellClasses(2)}`}
              title="Medium"
            />
            <span
              className={`w-[11px] h-[11px] rounded-[2px] border ${getCellClasses(3)}`}
              title="High"
            />
            <span
              className={`w-[11px] h-[11px] rounded-[2px] border ${getCellClasses(4)}`}
              title="Very High"
            />
          </div>
          <span className={isLight ? 'text-slate-500' : 'text-zinc-500'}>More</span>
        </div>
      </div>

      {/* Scoped Scrollbar Styling matching reference image */}
      <style>{`
        .heatmap-scrollbar-dark::-webkit-scrollbar {
          height: 7px;
        }
        .heatmap-scrollbar-dark::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.04);
          border-radius: 9999px;
        }
        .heatmap-scrollbar-dark::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.18);
          border-radius: 9999px;
        }
        .heatmap-scrollbar-dark::-webkit-scrollbar-thumb:hover {
          background: rgba(239, 68, 68, 0.6);
        }

        .heatmap-scrollbar-light::-webkit-scrollbar {
          height: 7px;
        }
        .heatmap-scrollbar-light::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05);
          border-radius: 9999px;
        }
        .heatmap-scrollbar-light::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 9999px;
        }
        .heatmap-scrollbar-light::-webkit-scrollbar-thumb:hover {
          background: rgba(239, 68, 68, 0.6);
        }
      `}</style>
    </section>
  )
}
