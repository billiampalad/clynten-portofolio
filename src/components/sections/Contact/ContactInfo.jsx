import { memo } from 'react'
import { motion } from 'framer-motion'
import { CONTACT_CHANNELS, SOCIAL_LINKS } from './contactData'

const itemVariants = {
  hidden: { opacity: 0, x: -25 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
}

function ContactChannelIcon({ type }) {
  if (type === 'phone') {
    return (
      <svg
        className="w-5 h-5 text-red-500 transition-transform duration-200 group-hover:scale-110"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
        />
      </svg>
    )
  }

  if (type === 'location') {
    return (
      <svg
        className="w-5 h-5 text-red-500 transition-transform duration-200 group-hover:scale-110"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
        />
      </svg>
    )
  }

  // Email icon
  return (
    <svg
      className="w-5 h-5 text-red-500 transition-transform duration-200 group-hover:scale-110"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
      />
    </svg>
  )
}

function ContactInfo({ isLight }) {
  const handleItemClick = (e, item) => {
    if (item.id === 'email') {
      const isMobile =
        typeof navigator !== 'undefined' &&
        /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
      if (isMobile) {
        window.location.href = `mailto:${item.value}?subject=${encodeURIComponent(
          'Project Inquiry / Collaboration'
        )}`
        e.preventDefault()
      }
    }
  }

  return (
    <motion.div
      variants={itemVariants}
      className={`w-full lg:w-[38%] flex flex-col justify-between pr-0 lg:pr-10 lg:border-r transition-colors duration-300 ${
        isLight ? 'lg:border-slate-200' : 'lg:border-white/[0.08]'
      }`}
    >
      {/* Contact Channels List */}
      <div className="flex flex-col gap-8 sm:gap-10">
        {CONTACT_CHANNELS.map((item) => (
          <a
            key={item.id}
            href={item.href}
            onClick={(e) => handleItemClick(e, item)}
            target={item.id === 'location' || item.id === 'email' ? '_blank' : undefined}
            rel={item.id === 'location' || item.id === 'email' ? 'noopener noreferrer' : undefined}
            title={item.id === 'email' ? `Send email to ${item.value}` : undefined}
            className="flex items-center gap-4 sm:gap-5 group cursor-pointer select-none"
          >
            {/* Circular Badge Icon (Matching Reference Image) */}
            <div
              className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shrink-0 border transition-all duration-200 group-hover:border-red-500/60 group-hover:shadow-md group-hover:shadow-red-500/10 ${
                isLight
                  ? 'bg-slate-100 border-slate-200/90 group-hover:bg-red-500/5'
                  : 'bg-white/[0.04] border-white/[0.08] group-hover:bg-white/[0.08]'
              }`}
            >
              <ContactChannelIcon type={item.icon} />
            </div>

            {/* Label and Content */}
            <div className="flex flex-col min-w-0">
              <span
                className={`font-mono text-xs uppercase tracking-wider mb-0.5 ${
                  isLight ? 'text-slate-500' : 'text-zinc-500'
                }`}
              >
                {item.type}
              </span>
              <span
                className={`font-sans text-sm sm:text-base font-semibold truncate transition-colors group-hover:text-red-500 ${
                  isLight ? 'text-slate-900' : 'text-zinc-100'
                }`}
              >
                {item.value}
              </span>
              <span
                className={`font-sans text-xs mt-0.5 ${
                  isLight ? 'text-slate-500' : 'text-zinc-400'
                }`}
              >
                {item.subText}
              </span>
            </div>
          </a>
        ))}
      </div>

      {/* Social / Direct Network Links Footer */}
      <div className="mt-10 pt-8 border-t border-dashed border-zinc-200 dark:border-white/[0.06] flex flex-wrap items-center gap-3">
        <span
          className={`font-mono text-[11px] uppercase tracking-wider select-none ${
            isLight ? 'text-slate-500' : 'text-zinc-500'
          }`}
        >
          CONNECT:
        </span>
        {SOCIAL_LINKS.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`font-mono text-xs px-2.5 py-1 rounded-md border transition-colors inline-flex items-center gap-1 ${
              isLight
                ? 'bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-600 border-slate-200'
                : 'bg-white/[0.03] hover:bg-red-500/10 text-zinc-300 hover:text-red-400 border-white/[0.08] hover:border-red-500/30'
            }`}
          >
            <span>{link.name}</span>
            <span className="text-[10px] opacity-60">↗</span>
          </a>
        ))}
      </div>
    </motion.div>
  )
}

export default memo(ContactInfo)
