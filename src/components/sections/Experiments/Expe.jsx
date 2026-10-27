import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'

/**
 * Animation variants for smooth bottom-to-top entrance (staggered)
 */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
}

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 35,
    filter: 'blur(6px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

const heatmapVariants = {
  hidden: {
    opacity: 0,
    y: 55,
    scale: 0.98,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.95,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

/**
 * Scattered / Randomized pop-in animation for individual contribution cells
 * (Each cell pops in independently at its own pseudo-random time)
 */
const cellVariants = {
  hidden: {
    opacity: 0,
    scale: 0.15,
  },
  visible: ({ wIdx, dIdx }) => {
    // Deterministic pseudo-random delay between 0.04s and 0.76s
    const seed = (wIdx * 41 + dIdx * 89 + 17) % 1000
    const pseudoRandom = Math.abs((Math.sin(seed) * 10000) % 1)
    const delay = 0.04 + pseudoRandom * 0.72

    return {
      opacity: 1,
      scale: 1,
      transition: {
        delay,
        duration: 0.38,
        ease: [0.34, 1.45, 0.64, 1], // bouncy pop
      },
    }
  },
}

/**
 * 3 latest years from now downwards
 */
const AVAILABLE_YEARS = [2026, 2025, 2024]

/**
 * Month labels matching the timeline in the reference screenshot
 * (Spans from April 2025 to October 2026 ~ 18 months / 78 weeks)
 * USED AS THE DEFAULT VIEW (2026)
 */
const DEFAULT_MONTH_LABELS = [
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

/**
 * Standard 12-month labels for full calendar years (52 weeks)
 */
const STANDARD_MONTH_LABELS = [
  { name: 'Jan', colIndex: 0 },
  { name: 'Feb', colIndex: 4 },
  { name: 'Mar', colIndex: 8 },
  { name: 'Apr', colIndex: 13 },
  { name: 'May', colIndex: 17 },
  { name: 'Jun', colIndex: 21 },
  { name: 'Jul', colIndex: 26 },
  { name: 'Aug', colIndex: 30 },
  { name: 'Sep', colIndex: 35 },
  { name: 'Oct', colIndex: 39 },
  { name: 'Nov', colIndex: 43 },
  { name: 'Dec', colIndex: 48 },
]

const TOTAL_WEEKS_DEFAULT = 78
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
function generateDefaultContributionGrid() {
  const grid = []
  const startDate = new Date(2025, 3, 6) // Sunday, April 6, 2025

  for (let w = 0; w < TOTAL_WEEKS_DEFAULT; w++) {
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

/**
 * Generates realistic contribution distribution for a specific 52-week calendar year
 */
function generateYearGrid(year, seedOffset) {
  const grid = []
  const jan1 = new Date(year, 0, 1)
  const dayOfWeek = jan1.getDay()
  const startDate = new Date(year, 0, 1 - dayOfWeek)

  for (let w = 0; w < 52; w++) {
    const week = []
    for (let d = 0; d < DAYS_PER_WEEK; d++) {
      const cellDate = new Date(startDate)
      cellDate.setDate(startDate.getDate() + w * 7 + d)

      const rand = seededRandom(w * 23 + d * 41 + seedOffset)
      let level = 0
      let count = 0

      if (rand > 0.44) {
        if (rand > 0.88) {
          level = 4
          count = Math.floor(rand * 12) + 8
        } else if (rand > 0.70) {
          level = 3
          count = Math.floor(rand * 7) + 4
        } else if (rand > 0.54) {
          level = 2
          count = Math.floor(rand * 4) + 2
        } else {
          level = 1
          count = Math.floor(rand * 2) + 1
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

/**
 * Helper to fetch complete year data: labels, stats & contributions grid (fallback)
 */
function getYearContributionData(year) {
  if (year === 2026) {
    return {
      monthLabels: DEFAULT_MONTH_LABELS,
      totalContributions: '1,260',
      startDateText: 'in 2026',
      grid: generateDefaultContributionGrid(),
    }
  }

  if (year === 2025) {
    return {
      monthLabels: STANDARD_MONTH_LABELS,
      totalContributions: '40',
      startDateText: 'in 2025',
      grid: generateYearGrid(2025, 773),
    }
  }

  // 2024
  return {
    monthLabels: STANDARD_MONTH_LABELS,
    totalContributions: '0',
    startDateText: 'in 2024',
    grid: generateYearGrid(2024, 389),
  }
}

/**
 * Helper to parse live GitHub contributions API data for a specific year
 * Endpoint: https://github-contributions-api.jogruber.de/v4/${username}?y=all
 */
function parseGithubYearData(year, apiData) {
  if (!apiData || !Array.isArray(apiData.contributions)) return null

  const yearStr = String(year)
  let days = apiData.contributions.filter((c) => c.date.startsWith(yearStr))

  // If no records (e.g. year before account creation), generate a full empty year (level 0)
  if (days.length === 0) {
    const isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
    const totalDays = isLeap ? 366 : 365
    days = []
    const d = new Date(Date.UTC(year, 0, 1))
    for (let i = 0; i < totalDays; i++) {
      const iso = d.toISOString().slice(0, 10)
      days.push({ date: iso, count: 0, level: 0 })
      d.setUTCDate(d.getUTCDate() + 1)
    }
  } else {
    days = [...days].sort((a, b) => a.date.localeCompare(b.date))
  }

  const firstDay = new Date(days[0].date + 'T00:00:00Z')
  const firstDayOfWeek = firstDay.getUTCDay() // 0 = Sunday

  const weeks = []
  let currentWeek = []

  // Pad days before the first day of the year in week 0
  for (let i = 0; i < firstDayOfWeek; i++) {
    currentWeek.push({ isPlaceholder: true, level: 0, count: 0 })
  }

  days.forEach((item) => {
    const d = new Date(item.date + 'T00:00:00Z')
    const dateFormatted = d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'UTC',
    })
    currentWeek.push({
      date: d,
      dateString: dateFormatted,
      rawDate: item.date,
      count: item.count,
      level: item.level,
      isPlaceholder: false,
    })
    if (currentWeek.length === 7) {
      weeks.push(currentWeek)
      currentWeek = []
    }
  })

  // Pad remaining days in the last week
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push({ isPlaceholder: true, level: 0, count: 0 })
    }
    weeks.push(currentWeek)
  }

  // Calculate dynamic month labels matching column index
  const monthLabels = []
  let lastMonth = -1
  weeks.forEach((week, wIdx) => {
    for (const day of week) {
      if (day.date && !day.isPlaceholder) {
        const m = day.date.getUTCMonth()
        if (m !== lastMonth) {
          const mName = day.date.toLocaleDateString('en-US', {
            month: 'short',
            timeZone: 'UTC',
          })
          monthLabels.push({ name: mName, colIndex: wIdx })
          lastMonth = m
          break
        }
      }
    }
  })

  const total =
    apiData.total && apiData.total[yearStr] !== undefined
      ? apiData.total[yearStr]
      : days.reduce((sum, d) => sum + d.count, 0)

  return {
    monthLabels,
    totalContributions: Number(total).toLocaleString('en-US'),
    startDateText: `in ${year}`,
    grid: weeks,
  }
}

export default function Expe({
  id = 'experience',
  username = 'billiampalad',
  githubUrl = 'https://github.com/billiampalad',
  handle = '@billiampalad',
  totalContributions: propTotalContributions,
  startDateText: propStartDateText,
  defaultYear = 2026,
}) {
  const [selectedYear, setSelectedYear] = useState(defaultYear)
  const [hoveredCell, setHoveredCell] = useState(null)
  const [liveData, setLiveData] = useState(null)
  const [isLiveSynced, setIsLiveSynced] = useState(false)
  const [, setIsLoading] = useState(false)
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

  // Fetch real-time GitHub contributions dynamically
  useEffect(() => {
    let isMounted = true
    const fetchContributions = async () => {
      try {
        setIsLoading(true)
        const res = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${username}?y=all`
        )
        if (!res.ok) throw new Error('Failed to fetch contributions')
        const data = await res.json()
        if (isMounted && data && data.contributions) {
          setLiveData(data)
          setIsLiveSynced(true)
        }
      } catch (err) {
        console.warn('Real-time GitHub contributions fetch failed, using fallback:', err)
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    fetchContributions()

    return () => {
      isMounted = false
    }
  }, [username])

  const activeData = useMemo(() => {
    if (liveData) {
      const parsed = parseGithubYearData(selectedYear, liveData)
      if (parsed) return parsed
    }
    return getYearContributionData(selectedYear)
  }, [selectedYear, liveData])

  const totalContributions =
    selectedYear === 2026 && propTotalContributions && !isLiveSynced
      ? propTotalContributions
      : activeData.totalContributions
  const startDateText =
    selectedYear === 2026 && propStartDateText && !isLiveSynced
      ? propStartDateText
      : activeData.startDateText
  const gridData = activeData.grid
  const monthLabels = activeData.monthLabels

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
      id={id}
      className={`relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 transition-colors duration-500 ${
        isLight ? 'bg-white text-slate-900' : 'bg-[#0A0907] text-slate-100'
      }`}
    >
      {/* Fallback Anchors for #experience and #experiments */}
      <div id="experience" className="absolute -top-20 pointer-events-none" aria-hidden="true" />
      <div id="experiments" className="absolute -top-20 pointer-events-none" aria-hidden="true" />

      {/* Background Ambient Glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[320px] bg-red-600/5 dark:bg-red-600/10 rounded-full blur-[130px] pointer-events-none select-none"
        aria-hidden="true"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="max-w-6xl mx-auto flex flex-col relative z-10"
      >
        {/* 1. Category Tag */}
        <motion.div variants={itemVariants} className="mb-2">
          <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-red-500">
            CODE
          </span>
        </motion.div>

        {/* 2. Main Title */}
        <motion.h2
          variants={itemVariants}
          className={`font-sans text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-3 ${
            isLight ? 'text-slate-950' : 'text-white'
          }`}
        >
          Experiments
        </motion.h2>

        {/* 3. Subtitle / Narrative */}
        <motion.p
          variants={itemVariants}
          className={`text-sm sm:text-base md:text-[15px] font-normal max-w-2xl leading-relaxed mb-8 ${
            isLight ? 'text-slate-600' : 'text-zinc-400'
          }`}
        >
          Side projects I build to test how AI changes product design, prototyping, and delivery.
        </motion.p>

        {/* 4. Stats & Handle Bar */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-between gap-3 mb-4 select-none"
        >
          {/* Total Contributions Counter + Live Badge */}
          <div className="flex items-center gap-2.5 font-sans text-xs sm:text-sm md:text-base">
            <div>
              <span
                className={`font-bold mr-1.5 ${isLight ? 'text-slate-900' : 'text-white'}`}
              >
                {totalContributions} contributions
              </span>
              <span className={`${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
                {startDateText}
              </span>
            </div>

            {/* Live Real-Time Badge */}
            {isLiveSynced && (
              <span
                className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                title="Synchronized in real-time with GitHub API"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                LIVE SYNC
              </span>
            )}
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
        </motion.div>

        {/* 5. Contributions Heatmap Stage + Year Selector Column */}
        <motion.div variants={heatmapVariants} className="relative w-full">
          <div className="flex flex-col lg:flex-row gap-6 items-start w-full">
            {/* Left/Main Column: Heatmap Canvas + Activity Level Legend */}
            <div className="flex-1 w-full min-w-0">
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
                    {monthLabels.map((m, idx) => (
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

                  {/* 7-Row Grid of Rounded Contribution Squares with Staggered Wave animation */}
                  <div key={selectedYear} className="flex gap-[3px] select-none">
                    {gridData.map((week, wIdx) => (
                      <div key={wIdx} className="w-[13px] flex flex-col gap-[3px] shrink-0">
                        {week.map((day, dIdx) => {
                          if (day.isPlaceholder) {
                            return (
                              <div
                                key={dIdx}
                                className="w-[13px] h-[13px] opacity-0 pointer-events-none"
                                aria-hidden="true"
                              />
                            )
                          }

                          const isHighActive = day.level >= 3
                          const isMediumActive = day.level === 2

                          // Unique pseudo-random timing per cell so each cell pulses independently
                          const seed1 = (wIdx * 37 + dIdx * 73 + 19) % 100
                          const seed2 = (wIdx * 19 + dIdx * 53 + 47) % 100
                          const pulseDelay = ((seed1 / 100) * 3.5).toFixed(2)
                          const pulseDuration = (2.4 + (seed2 / 100) * 2.0).toFixed(2)

                          return (
                            <motion.div
                              key={`${wIdx}-${dIdx}`}
                              custom={{ wIdx, dIdx }}
                              variants={cellVariants}
                              initial="hidden"
                              animate="visible"
                              whileHover={{ scale: 1.35, zIndex: 30 }}
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
                              style={{
                                '--pulse-delay': `${pulseDelay}s`,
                                '--pulse-duration': `${pulseDuration}s`,
                              }}
                              className={`w-[13px] h-[13px] rounded-[3px] border transition-colors duration-150 cursor-pointer ${getCellClasses(
                                day.level
                              )} ${
                                isHighActive
                                  ? 'cell-scatter-pulse-high'
                                  : isMediumActive
                                  ? 'cell-scatter-pulse-med'
                                  : ''
                              }`}
                            />
                          )
                        })}
                      </div>
                    ))}
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

            {/* Right Column: 3 Latest Years Selection (2026, 2025, 2024 Stacked Vertically) */}
            <div className="w-full lg:w-32 shrink-0 flex flex-col gap-1.5 select-none pt-0.5">
              <span className="font-mono text-[10px] tracking-wider uppercase text-zinc-400 dark:text-zinc-500 hidden lg:block mb-1">
                YEARS
              </span>
              <div className="flex lg:flex-col gap-1.5 w-full overflow-x-auto pb-1 lg:pb-0">
                {AVAILABLE_YEARS.map((year) => {
                  const isActive = selectedYear === year
                  return (
                    <button
                      key={year}
                      type="button"
                      onClick={() => {
                        setSelectedYear(year)
                        setHoveredCell(null)
                      }}
                      className={`px-3.5 py-2 rounded-lg font-mono text-xs sm:text-sm font-bold transition-all duration-200 text-left flex items-center justify-between gap-3 cursor-pointer shrink-0 ${
                        isActive
                          ? 'bg-red-600 text-white shadow-md shadow-red-600/30 ring-1 ring-red-500'
                          : isLight
                          ? 'bg-slate-100 text-slate-600 hover:text-slate-950 hover:bg-slate-200/80 border border-slate-200/80'
                          : 'bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]'
                      }`}
                    >
                      <span>{year}</span>
                      <span
                        className={`w-1.5 h-1.5 rounded-full transition-opacity duration-200 ${
                          isActive ? 'bg-white opacity-100' : 'opacity-0'
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scoped Scrollbar & Organic Pulse Styling */}
      <style>{`
        /* Individual & Organic Pulse on Active Cells */
        @keyframes cell-scatter-high {
          0%, 100% {
            transform: scale(1);
            filter: brightness(1);
            box-shadow: 0 0 0 rgba(239, 68, 68, 0);
          }
          50% {
            transform: scale(1.14);
            filter: brightness(1.35);
            box-shadow: 0 0 9px rgba(239, 68, 68, 0.65);
          }
        }

        @keyframes cell-scatter-med {
          0%, 100% {
            transform: scale(1);
            filter: brightness(1);
          }
          50% {
            transform: scale(1.08);
            filter: brightness(1.22);
          }
        }

        .cell-scatter-pulse-high {
          animation: cell-scatter-high var(--pulse-duration, 3.2s) ease-in-out infinite;
          animation-delay: var(--pulse-delay, 0s);
          will-change: transform, filter;
        }

        .cell-scatter-pulse-med {
          animation: cell-scatter-med var(--pulse-duration, 3.6s) ease-in-out infinite;
          animation-delay: var(--pulse-delay, 0s);
          will-change: transform, filter;
        }

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
