import { ScrollTrigger } from '@/lib/animations/gsap'

/**
 * Smart section routing that accurately navigates across Locomotive, Lenis, and native scroll.
 */
export const scrollToSection = (targetId, onHomeClick) => {
  // 1. Target: HERO / HOME (Scroll 0)
  if (targetId === 'hero' || targetId === 'home') {
    if (onHomeClick) {
      onHomeClick()
    } else if (window.__locomotiveScroll && typeof window.__locomotiveScroll.scrollTo === 'function') {
      window.__locomotiveScroll.scrollTo(0, { duration: 1.2, immediate: false })
    } else if (window.__lenis && typeof window.__lenis.scrollTo === 'function') {
      window.__lenis.scrollTo(0, { duration: 1.2 })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    return
  }

  // 2. Target: ABOUT
  // About is the backdrop reveal layer at the landing end of Hero (timeline progress ~0.98)
  if (targetId === 'about') {
    const heroTrigger = ScrollTrigger.getById('hero-trigger')
    const targetY = heroTrigger
      ? Math.round(heroTrigger.start + (heroTrigger.end - heroTrigger.start) * 0.98)
      : 0

    if (window.__locomotiveScroll && typeof window.__locomotiveScroll.scrollTo === 'function') {
      window.__locomotiveScroll.scrollTo(targetY, { duration: 1.2, immediate: false })
    } else if (window.__lenis && typeof window.__lenis.scrollTo === 'function') {
      window.__lenis.scrollTo(targetY, { duration: 1.2 })
    } else {
      window.scrollTo({ top: targetY, behavior: 'smooth' })
    }
    return
  }

  // 3. Target: PROJECTS
  if (targetId === 'projects') {
    const projectsEl = document.getElementById('projects')
    if (!projectsEl) return

    if (window.__locomotiveScroll && typeof window.__locomotiveScroll.scrollTo === 'function') {
      window.__locomotiveScroll.scrollTo(projectsEl, { offset: 0, duration: 1.2, immediate: false })
    } else if (window.__lenis && typeof window.__lenis.scrollTo === 'function') {
      window.__lenis.scrollTo(projectsEl, { offset: 0, duration: 1.2 })
    } else {
      const top = projectsEl.getBoundingClientRect().top + window.scrollY
      window.scrollTo({ top, behavior: 'smooth' })
    }
    return
  }

  // 4. Target: SKILLS
  if (targetId === 'skills') {
    const skillsEl = document.getElementById('skills')
    if (!skillsEl) return
    const SKILLS_OFFSET = -50

    if (window.__locomotiveScroll && typeof window.__locomotiveScroll.scrollTo === 'function') {
      window.__locomotiveScroll.scrollTo(skillsEl, { offset: SKILLS_OFFSET, duration: 1.2, immediate: false })
    } else if (window.__lenis && typeof window.__lenis.scrollTo === 'function') {
      window.__lenis.scrollTo(skillsEl, { offset: SKILLS_OFFSET, duration: 1.2 })
    } else {
      const top = skillsEl.getBoundingClientRect().top + window.scrollY + SKILLS_OFFSET
      window.scrollTo({ top, behavior: 'smooth' })
    }
    return
  }

  // 5. Fallback for other sections (Contact, Experience, etc.)
  const targetEl = document.getElementById(targetId)
  if (targetEl) {
    if (window.__locomotiveScroll && typeof window.__locomotiveScroll.scrollTo === 'function') {
      window.__locomotiveScroll.scrollTo(targetEl, { offset: 0, duration: 1.2, immediate: false })
    } else if (window.__lenis && typeof window.__lenis.scrollTo === 'function') {
      window.__lenis.scrollTo(targetEl, { offset: 0, duration: 1.2 })
    } else {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
}
