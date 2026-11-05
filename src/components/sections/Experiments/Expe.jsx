import { useState, useEffect, useMemo, memo } from 'react'
import { motion } from 'framer-motion'

/**
 * Animation variants for smooth bottom-to-top entrance (staggered)
 */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.06,
    },
  },
}

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

const heatmapVariants = {
  hidden: {
    opacity: 0,
    y: 35,
    scale: 0.99,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1],
    },
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

function Expe({
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
      id={id || 'experience'}
      className={`relative w-full min-h-screen flex flex-col justify-center py-20 sm:py-28 [@media(min-width:1440px)]:py-32 [@media(min-width:1600px)]:py-36 [@media(min-width:1920px)]:py-40 px-4 sm:px-6 lg:px-8 [@media(min-width:1440px)]:px-14 [@media(min-width:1600px)]:px-20 [@media(min-width:1920px)]:px-28 transition-colors duration-500 overflow-hidden ${
        isLight ? 'bg-[#f8fafc] text-[#0f172a]' : 'bg-[#0A0907] text-[#f1f5f9]'
      }`}
      style={{
        background: isLight ? 'var(--nav-bg, #f8fafc)' : 'var(--nav-bg, #0A0907)',
      }}
    >
      {/* Fallback Anchors for #experiments and #experience-section */}
      <div id="experiments" className="absolute top-0 pointer-events-none" aria-hidden="true" />
      <div id="experience-section" className="absolute top-0 pointer-events-none" aria-hidden="true" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="max-w-6xl [@media(min-width:1440px)]:max-w-[1440px] [@media(min-width:1600px)]:max-w-[1680px] [@media(min-width:1920px)]:max-w-[1840px] w-full mx-auto flex flex-col relative z-10 my-auto"
      >
        {/* 1. Category Tag */}
        <motion.div variants={itemVariants} className="mb-2 [@media(min-width:1440px)]:mb-3">
          <span className="font-mono text-xs sm:text-sm [@media(min-width:1440px)]:text-base [@media(min-width:1920px)]:text-lg font-bold tracking-[0.2em] uppercase text-red-500">
            CODE
          </span>
        </motion.div>

        {/* 2. Main Title */}
        <motion.h2
          variants={itemVariants}
          className={`font-sans text-3xl sm:text-4xl md:text-5xl [@media(min-width:1440px)]:text-6xl [@media(min-width:1600px)]:text-7xl [@media(min-width:1920px)]:text-[80px] font-extrabold tracking-tight mb-3 [@media(min-width:1440px)]:mb-5 ${
            isLight ? 'text-slate-950' : 'text-white'
          }`}
        >
          Experiments
        </motion.h2>

        {/* 3. Subtitle / Narrative */}
        <motion.p
          variants={itemVariants}
          className={`text-sm sm:text-base md:text-[15px] [@media(min-width:1440px)]:text-xl [@media(min-width:1600px)]:text-2xl font-normal max-w-2xl [@media(min-width:1440px)]:max-w-3xl [@media(min-width:1600px)]:max-w-4xl [@media(min-width:1920px)]:max-w-5xl leading-relaxed mb-8 [@media(min-width:1440px)]:mb-12 ${
            isLight ? 'text-slate-600' : 'text-zinc-400'
          }`}
        >
          Side projects I build to test how AI changes product design, prototyping, and delivery.
        </motion.p>

        {/* 4. Stats & Handle Bar */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-between gap-3 mb-4 [@media(min-width:1440px)]:mb-8 select-none"
        >
          {/* Total Contributions Counter + Live Badge */}
          <div className="flex items-center gap-2.5 font-sans text-xs sm:text-sm md:text-base [@media(min-width:1440px)]:text-xl [@media(min-width:1920px)]:text-2xl">
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
                className="inline-flex items-center gap-1.5 px-2 py-0.5 [@media(min-width:1440px)]:px-3 [@media(min-width:1440px)]:py-1 rounded-full text-[10px] sm:text-[11px] [@media(min-width:1440px)]:text-xs [@media(min-width:1920px)]:text-sm font-mono font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                title="Synchronized in real-time with GitHub API"
              >
                <span className="w-1.5 h-1.5 [@media(min-width:1440px)]:w-2 [@media(min-width:1440px)]:h-2 rounded-full bg-emerald-500 animate-pulse" />
                LIVE SYNC
              </span>
            )}
          </div>

          {/* Social / GitHub Link Handle */}
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`font-sans text-xs sm:text-sm md:text-base [@media(min-width:1440px)]:text-xl [@media(min-width:1920px)]:text-2xl font-medium inline-flex items-center gap-1.5 transition-colors group ${
              isLight
                ? 'text-slate-600 hover:text-red-600'
                : 'text-zinc-400 hover:text-red-400'
            }`}
          >
            <span>{handle}</span>
            <span
              className="text-xs [@media(min-width:1440px)]:text-base transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            >
              ↗
            </span>
          </a>
        </motion.div>

        {/* 5. Contributions Heatmap Stage + Year Selector Column */}
        <motion.div variants={heatmapVariants} className="relative w-full">
          <div className="flex flex-col lg:flex-row gap-6 [@media(min-width:1440px)]:gap-10 [@media(min-width:1600px)]:gap-12 items-start w-full">
            {/* Left/Main Column: Heatmap Canvas + Activity Level Legend */}
            <div className="flex-1 w-full min-w-0">
              {/* Tooltip Popup on Hover */}
              {hoveredCell && (
                <div
                  className={`absolute -top-10 [@media(min-width:1440px)]:-top-12 z-30 px-3 py-1 [@media(min-width:1440px)]:px-4 [@media(min-width:1440px)]:py-1.5 rounded-md [@media(min-width:1440px)]:rounded-lg text-xs [@media(min-width:1440px)]:text-sm font-mono font-medium shadow-lg pointer-events-none transition-all duration-150 transform -translate-x-1/2 whitespace-nowrap ${
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
                className={`overflow-x-auto pb-4 pt-1 [-webkit-overflow-scrolling:touch] heatmap-container ${
                  isLight ? 'heatmap-scrollbar-light' : 'heatmap-scrollbar-dark'
                }`}
              >
                <div className="min-w-max flex flex-col gap-2 [@media(min-width:1440px)]:gap-3">
                  {/* Month Labels Header Row */}
                  <div className="relative h-5 [@media(min-width:1440px)]:h-7 flex text-[11px] [@media(min-width:1440px)]:text-sm [@media(min-width:1920px)]:text-base font-mono text-zinc-400 dark:text-zinc-500 select-none">
                    {monthLabels.map((m, idx) => (
                      <span
                        key={idx}
                        className="absolute"
                        style={{
                          left: `calc(var(--col-step, 16px) * ${m.colIndex})`,
                        }}
                      >
                        {m.name}
                      </span>
                    ))}
                  </div>

                  {/* 7-Row Grid of Rounded Contribution Squares with Staggered Wave animation */}
                  <div
                    key={selectedYear}
                    className="flex select-none"
                    style={{ gap: 'var(--cell-gap, 3px)' }}
                  >
                    {gridData.map((week, wIdx) => (
                      <div
                        key={wIdx}
                        className="flex flex-col shrink-0"
                        style={{
                          width: 'var(--cell-size, 13px)',
                          gap: 'var(--cell-gap, 3px)',
                        }}
                      >
                        {week.map((day, dIdx) => {
                          if (day.isPlaceholder) {
                            return (
                              <div
                                key={dIdx}
                                className="opacity-0 pointer-events-none"
                                style={{
                                  width: 'var(--cell-size, 13px)',
                                  height: 'var(--cell-size, 13px)',
                                }}
                                aria-hidden="true"
                              />
                            )
                          }

                          const isHighActive = day.level >= 3
                          const isMediumActive = day.level === 2

                          // Unique pseudo-random timing per cell for smooth, relaxed blinking
                          const seed1 = (wIdx * 37 + dIdx * 73 + 19) % 100
                          const seed2 = (wIdx * 19 + dIdx * 53 + 47) % 100
                          const blinkDelay = ((seed1 / 100) * 5.0).toFixed(2)
                          const blinkDuration = (3.6 + (seed2 / 100) * 2.2).toFixed(2)

                          return (
                            <div
                              key={`${wIdx}-${dIdx}`}
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
                                width: 'var(--cell-size, 13px)',
                                height: 'var(--cell-size, 13px)',
                                '--blink-delay': `${blinkDelay}s`,
                                '--blink-duration': `${blinkDuration}s`,
                              }}
                              className={`rounded-[3px] [@media(min-width:1440px)]:rounded-[4px] [@media(min-width:1920px)]:rounded-[5px] border cursor-pointer hover:scale-125 hover:z-30 transition-[transform,border-color] duration-150 ${getCellClasses(
                                day.level
                              )} ${
                                isHighActive
                                  ? 'cell-blink-high'
                                  : isMediumActive
                                  ? 'cell-blink-med'
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
              <div className="mt-3 [@media(min-width:1440px)]:mt-6 flex items-center justify-end gap-2 [@media(min-width:1440px)]:gap-3 text-xs [@media(min-width:1440px)]:text-sm [@media(min-width:1920px)]:text-base font-mono text-zinc-400 select-none">
                <span className={isLight ? 'text-slate-500' : 'text-zinc-500'}>Less</span>
                <div className="flex items-center gap-1 [@media(min-width:1440px)]:gap-1.5">
                  <span
                    className={`w-[11px] h-[11px] [@media(min-width:1440px)]:w-[15px] [@media(min-width:1440px)]:h-[15px] [@media(min-width:1920px)]:w-[18px] [@media(min-width:1920px)]:h-[18px] rounded-[2px] [@media(min-width:1440px)]:rounded-[3px] border ${getCellClasses(0)}`}
                    title="0 contributions"
                  />
                  <span
                    className={`w-[11px] h-[11px] [@media(min-width:1440px)]:w-[15px] [@media(min-width:1440px)]:h-[15px] [@media(min-width:1920px)]:w-[18px] [@media(min-width:1920px)]:h-[18px] rounded-[2px] [@media(min-width:1440px)]:rounded-[3px] border ${getCellClasses(1)}`}
                    title="Low"
                  />
                  <span
                    className={`w-[11px] h-[11px] [@media(min-width:1440px)]:w-[15px] [@media(min-width:1440px)]:h-[15px] [@media(min-width:1920px)]:w-[18px] [@media(min-width:1920px)]:h-[18px] rounded-[2px] [@media(min-width:1440px)]:rounded-[3px] border ${getCellClasses(2)}`}
                    title="Medium"
                  />
                  <span
                    className={`w-[11px] h-[11px] [@media(min-width:1440px)]:w-[15px] [@media(min-width:1440px)]:h-[15px] [@media(min-width:1920px)]:w-[18px] [@media(min-width:1920px)]:h-[18px] rounded-[2px] [@media(min-width:1440px)]:rounded-[3px] border ${getCellClasses(3)}`}
                    title="High"
                  />
                  <span
                    className={`w-[11px] h-[11px] [@media(min-width:1440px)]:w-[15px] [@media(min-width:1440px)]:h-[15px] [@media(min-width:1920px)]:w-[18px] [@media(min-width:1920px)]:h-[18px] rounded-[2px] [@media(min-width:1440px)]:rounded-[3px] border ${getCellClasses(4)}`}
                    title="Very High"
                  />
                </div>
                <span className={isLight ? 'text-slate-500' : 'text-zinc-500'}>More</span>
              </div>
            </div>

            {/* Right Column: 3 Latest Years Selection (2026, 2025, 2024 Stacked Vertically) */}
            <div className="w-full lg:w-32 [@media(min-width:1440px)]:w-44 [@media(min-width:1600px)]:w-52 [@media(min-width:1920px)]:w-60 shrink-0 flex flex-col gap-1.5 [@media(min-width:1440px)]:gap-2.5 select-none pt-0.5">
              <span className="font-mono text-[10px] [@media(min-width:1440px)]:text-xs [@media(min-width:1920px)]:text-sm tracking-wider uppercase text-zinc-400 dark:text-zinc-500 hidden lg:block mb-1 [@media(min-width:1440px)]:mb-2">
                YEARS
              </span>
              <div className="flex lg:flex-col gap-1.5 [@media(min-width:1440px)]:gap-2.5 w-full overflow-x-auto pb-1 lg:pb-0">
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
                      className={`px-3.5 py-2 [@media(min-width:1440px)]:px-5 [@media(min-width:1440px)]:py-3.5 [@media(min-width:1920px)]:px-6 [@media(min-width:1920px)]:py-4 rounded-lg [@media(min-width:1440px)]:rounded-xl font-mono text-xs sm:text-sm [@media(min-width:1440px)]:text-base [@media(min-width:1920px)]:text-lg font-bold transition-all duration-200 text-left flex items-center justify-between gap-3 cursor-pointer shrink-0 ${
                        isActive
                          ? 'bg-red-600 text-white shadow-md shadow-red-600/30 ring-1 ring-red-500'
                          : isLight
                          ? 'bg-slate-100 text-slate-600 hover:text-slate-950 hover:bg-slate-200/80 border border-slate-200/80'
                          : 'bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]'
                      }`}
                    >
                      <span>{year}</span>
                      <span
                        className={`w-1.5 h-1.5 [@media(min-width:1440px)]:w-2 [@media(min-width:1440px)]:h-2 rounded-full transition-opacity duration-200 ${
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

      {/* Scoped Scrollbar & Smooth Blink Styling */}
      <style>{`
        .heatmap-container {
          --cell-size: 13px;
          --cell-gap: 3px;
          --col-step: 16px;
        }

        @media only screen and (min-width: 1440px) {
          .heatmap-container {
            --cell-size: 17px;
            --cell-gap: 4px;
            --col-step: 21px;
          }
        }

        @media only screen and (min-width: 1600px) {
          .heatmap-container {
            --cell-size: 20px;
            --cell-gap: 4.5px;
            --col-step: 24.5px;
          }
        }

        @media only screen and (min-width: 1920px) {
          .heatmap-container {
            --cell-size: 23px;
            --cell-gap: 5px;
            --col-step: 28px;
          }
        }

        /* Smooth, Gentle Blinking on Active Cells */
        @keyframes cell-blink-high {
          0%, 25%, 75%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.35;
          }
        }

        @keyframes cell-blink-med {
          0%, 25%, 75%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.52;
          }
        }

        .cell-blink-high {
          animation: cell-blink-high var(--blink-duration, 4.5s) cubic-bezier(0.4, 0, 0.2, 1) infinite;
          animation-delay: var(--blink-delay, 0s);
          will-change: opacity;
        }

        .cell-blink-med {
          animation: cell-blink-med var(--blink-duration, 5s) cubic-bezier(0.4, 0, 0.2, 1) infinite;
          animation-delay: var(--blink-delay, 0s);
          will-change: opacity;
        }

        /* Fast, instant, solid hover response without slow spring */
        .cell-blink-high:hover,
        .cell-blink-med:hover {
          animation: none !important;
          opacity: 1 !important;
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

export default memo(Expe)
