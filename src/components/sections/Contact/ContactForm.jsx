import { useState } from 'react'
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

export default function ContactForm({ isLight }) {
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

    const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN
    const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID

    if (!botToken || !chatId) {
      setSubmitStatus('error')
      setErrorMessage('Telegram Bot Token or Chat ID not configured in .env.local')
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

  // Common input styling class generator
  const getInputClasses = () =>
    `w-full px-4 py-3 rounded-lg font-sans text-sm outline-none transition-all duration-200 border ${
      isLight
        ? 'bg-slate-100 text-slate-900 border-slate-200 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-500/15 placeholder-slate-400'
        : 'bg-white/[0.04] text-white border-white/[0.08] focus:border-red-500 focus:bg-white/[0.07] focus:ring-2 focus:ring-red-500/20 placeholder-zinc-500'
    }`

  return (
    <motion.div variants={itemVariants} className="w-full lg:w-[62%] flex flex-col justify-start">
      {/* Form Section Header (Matching Reference Image) */}
      <h3
        className={`font-sans text-xl sm:text-2xl font-bold tracking-tight mb-6 ${
          isLight ? 'text-slate-900' : 'text-white'
        }`}
      >
        Send Us a Message
      </h3>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Row 1: Full Name & Company Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              name="name"
              required
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className={getInputClasses()}
            />
          </div>
          <div>
            <input
              type="text"
              name="company"
              placeholder="Company Name"
              value={formData.company}
              onChange={handleChange}
              className={getInputClasses()}
            />
          </div>
        </div>

        {/* Row 2: Email Address & Mobile Number (Optional) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <input
              type="email"
              name="email"
              required
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className={getInputClasses()}
            />
          </div>
          <div>
            <input
              type="tel"
              name="phone"
              placeholder="Mobile Number (Optional)"
              value={formData.phone}
              onChange={handleChange}
              className={getInputClasses()}
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
            className={`${getInputClasses()} resize-y min-h-[120px]`}
          />
        </div>

        {/* Status Notification Toast */}
        {submitStatus === 'success' && (
          <div className="p-3.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs sm:text-sm font-medium flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 animate-pulse" />
            <span>Thank you! Your transmission has been dispatched to Telegram successfully.</span>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="p-3.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs sm:text-sm font-medium flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
            <span>{errorMessage || 'Failed to transmit message. Please try again.'}</span>
          </div>
        )}

        {/* Row 4: Submit Button (Anchored to Right bottom corner) */}
        <div className="flex items-center justify-end mt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-8 py-3 rounded-lg font-sans font-bold text-sm tracking-wide transition-all duration-200 cursor-pointer select-none flex items-center gap-2 shadow-lg ${
              isSubmitting
                ? 'opacity-60 cursor-not-allowed bg-red-600 text-white'
                : 'bg-red-600 hover:bg-red-500 text-white hover:shadow-red-600/30 active:scale-[0.98]'
            }`}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-1 h-4 w-4 text-white"
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
                <span className="text-xs transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true">
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
