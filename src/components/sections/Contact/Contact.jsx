import { useState, useEffect, memo } from 'react'
import { motion } from 'framer-motion'
import ContactHeader from './ContactHeader'
import ContactInfo from './ContactInfo'
import ContactForm from './ContactForm'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.08,
    },
  },
}

function Contact({ id = 'contact' }) {
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

  return (
    <section
      id={id}
      className={`relative w-full py-20 sm:py-28 [@media(min-width:1440px)]:py-28 [@media(min-width:1600px)]:py-32 [@media(min-width:1920px)]:py-36 px-4 sm:px-6 lg:px-8 [@media(min-width:1440px)]:px-14 [@media(min-width:1600px)]:px-20 [@media(min-width:1920px)]:px-28 transition-colors duration-500 ${
        isLight ? 'bg-[#f8fafc] text-[#0f172a]' : 'bg-[#0A0907] text-[#f1f5f9]'
      }`}
      style={{
        background: isLight ? 'var(--nav-bg, #f8fafc)' : 'var(--nav-bg, #0A0907)',
      }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
        className="max-w-6xl [@media(min-width:1440px)]:max-w-[1440px] [@media(min-width:1600px)]:max-w-[1680px] [@media(min-width:1920px)]:max-w-[1840px] w-full mx-auto flex flex-col relative z-10"
      >
        {/* 1. Header & Narrative Intro */}
        <ContactHeader isLight={isLight} />

        {/* 2. Split Grid: Channels Info (Left) + Send Message Form (Right) */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-14 [@media(min-width:1440px)]:gap-16 [@media(min-width:1600px)]:gap-20 [@media(min-width:1920px)]:gap-24 items-start w-full">
          <ContactInfo isLight={isLight} />
          <ContactForm isLight={isLight} />
        </div>
      </motion.div>
    </section>
  )
}

export default memo(Contact)
