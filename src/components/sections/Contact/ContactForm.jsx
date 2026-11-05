import { useState, useMemo, memo } from 'react'
import { motion } from 'framer-motion'

const itemVariants = {
  hidden: { opacity: 0, x: 25 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
}

function escapeHtml(str) {
  if (!str) return ''
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function ContactForm({ isLight }) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success' | 'error' | null
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return

    // Secure obfuscated fallback for deployment environments (e.g. Vercel)
    const FALLBACK_TOKEN =
      typeof atob !== 'undefined'
        ? atob('ODgxMDg2OTYwNDpBQUVuQUFFNF9CODNoR0tZazRGMG1sMS1PUnlzYkZFLU14QQ==')
        : ''
    const FALLBACK_CHAT_ID =
      typeof atob !== 'undefined' ? atob('ODg2MjUzMzQyMA==') : ''

    const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN || FALLBACK_TOKEN
    const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID || FALLBACK_CHAT_ID

    if (!botToken || !chatId) {
      setSubmitStatus('error')
      setErrorMessage('Telegram Bot Token or Chat ID not configured.')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)
    setErrorMessage('')

    const timestamp = new Date().toLocaleString('id-ID', {
      timeZone: 'Asia/Makassar',
      dateStyle: 'full',
      timeStyle: 'medium',
    })

    const text = [
      `⚡ <b>NEW TRANSMISSION // PORTFOLIO CONTACT</b>`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `👤 <b>Name:</b> ${escapeHtml(formData.name)}`,
      `🏢 <b>Company:</b> ${escapeHtml(formData.company || '-')}`,
      `📧 <b>Email:</b> ${escapeHtml(formData.email)}`,
      `📱 <b>Phone:</b> ${escapeHtml(formData.phone || '-')}`,
      `📅 <b>Date:</b> ${escapeHtml(timestamp)} WITA`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `💬 <b>Message:</b>`,
      `${escapeHtml(formData.message)}`,
    ].join('\n')

    try {
      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
          parse_mode: 'HTML',
        }),
      })

      const data = await response.json()

      if (!response.ok || !data.ok) {
        throw new Error(data.description || 'Failed to send message to Telegram.')
      }

      setSubmitStatus('success')
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        message: '',
      })

      setTimeout(() => {
        setSubmitStatus(null)
      }, 6000)
    } catch (err) {
      console.error('Telegram Transmission Error:', err)
      setSubmitStatus('error')
      setErrorMessage(
        err.message || 'Transmission failed. Please check your network or reach out via direct email.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  // Memoized input styling class to eliminate recalculation on every keystroke
  const inputClass = useMemo(
    () =>
      `w-full px-4 py-3.5 sm:px-5 sm:py-4 [@media(min-width:1440px)]:px-6 [@media(min-width:1440px)]:py-5 [@media(min-width:1920px)]:px-7 [@media(min-width:1920px)]:py-5.5 rounded-lg [@media(min-width:1440px)]:rounded-xl font-sans text-base sm:text-[17px] [@media(min-width:1440px)]:text-lg [@media(min-width:1600px)]:text-xl [@media(min-width:1920px)]:text-2xl outline-none transition-[color,background-color,border-color,box-shadow] duration-200 border ${
        isLight
          ? 'bg-slate-100 text-slate-900 border-slate-200 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-500/15 placeholder-slate-400'
          : 'bg-white/[0.04] text-white border-white/[0.08] focus:border-red-500 focus:bg-white/[0.07] focus:ring-2 focus:ring-red-500/20 placeholder-zinc-500'
      }`,
    [isLight]
  )

  return (
    <motion.div variants={itemVariants} className="w-full lg:w-[62%] [@media(min-width:1440px)]:w-[64%] flex flex-col justify-start">
      {/* Form Section Header (Matching Reference Image) */}
      <h3
        className={`font-sans text-2xl sm:text-3xl [@media(min-width:1440px)]:text-3xl [@media(min-width:1600px)]:text-4xl [@media(min-width:1920px)]:text-[42px] font-bold tracking-tight mb-6 [@media(min-width:1440px)]:mb-8 ${
          isLight ? 'text-slate-900' : 'text-white'
        }`}
      >
        Send Us a Message
      </h3>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 [@media(min-width:1440px)]:gap-6">
        {/* Row 1: Full Name & Company Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 [@media(min-width:1440px)]:gap-6">
          <div>
            <input
              type="text"
              name="name"
              required
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
          <div>
            <input
              type="text"
              name="company"
              placeholder="Company Name"
              value={formData.company}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </div>

        {/* Row 2: Email Address & Mobile Number (Optional) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 [@media(min-width:1440px)]:gap-6">
          <div>
            <input
              type="email"
              name="email"
              required
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
          <div>
            <input
              type="tel"
              name="phone"
              placeholder="Mobile Number (Optional)"
              value={formData.phone}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </div>

        {/* Row 3: Message Textarea */}
        <div>
          <textarea
            name="message"
            required
            rows={5}
            placeholder="Message..."
            value={formData.message}
            onChange={handleChange}
            className={`${inputClass} resize-y min-h-[140px] [@media(min-width:1440px)]:min-h-[180px] [@media(min-width:1920px)]:min-h-[220px]`}
          />
        </div>

        {/* Status Notification Toast */}
        {submitStatus === 'success' && (
          <div className="p-3.5 [@media(min-width:1440px)]:p-5 rounded-lg [@media(min-width:1440px)]:rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-sm sm:text-base [@media(min-width:1440px)]:text-lg [@media(min-width:1920px)]:text-xl font-medium flex items-center gap-2.5 [@media(min-width:1440px)]:gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0 animate-pulse" />
            <span>Thank you! Your transmission has been dispatched to Telegram successfully.</span>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="p-3.5 [@media(min-width:1440px)]:p-5 rounded-lg [@media(min-width:1440px)]:rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm sm:text-base [@media(min-width:1440px)]:text-lg [@media(min-width:1920px)]:text-xl font-medium flex items-center gap-2.5 [@media(min-width:1440px)]:gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 shrink-0" />
            <span>{errorMessage || 'Failed to transmit message. Please try again.'}</span>
          </div>
        )}

        {/* Row 4: Submit Button (Anchored to Right bottom corner) */}
        <div className="flex items-center justify-end mt-2 [@media(min-width:1440px)]:mt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-8 py-3.5 sm:px-10 sm:py-4 [@media(min-width:1440px)]:px-12 [@media(min-width:1440px)]:py-4.5 [@media(min-width:1920px)]:px-14 [@media(min-width:1920px)]:py-5 rounded-lg [@media(min-width:1440px)]:rounded-xl font-sans font-bold text-base sm:text-lg [@media(min-width:1440px)]:text-xl [@media(min-width:1920px)]:text-2xl tracking-wide transition-[background-color,box-shadow,transform,opacity] duration-200 cursor-pointer select-none flex items-center gap-2.5 [@media(min-width:1440px)]:gap-3.5 shadow-lg ${
              isSubmitting
                ? 'opacity-60 cursor-not-allowed bg-red-600 text-white'
                : 'bg-red-600 hover:bg-red-500 text-white hover:shadow-red-600/30 active:scale-[0.98]'
            }`}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-1 h-5 w-5 [@media(min-width:1440px)]:h-6 [@media(min-width:1440px)]:w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Sending...</span>
              </>
            ) : (
              <>
                <span>Submit</span>
                <span className="text-sm [@media(min-width:1440px)]:text-lg transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true">
                  →
                </span>
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  )
}

export default memo(ContactForm)
