export default function TechIcon({ name, className = 'tech-chip-icon' }) {
  const key = name.toLowerCase().replace(/[^a-z0-9]/g, '')

  switch (key) {
    case 'react':
      return (
        <span className={className} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="#61DAFB" strokeWidth="1.6">
            <ellipse cx="12" cy="12" rx="10" ry="4.2" />
            <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" />
            <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" />
            <circle cx="12" cy="12" r="1.8" fill="#61DAFB" />
          </svg>
        </span>
      )

    case 'javascript':
    case 'leafletjs':
      return (
        <span className={className} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <rect x="2" y="2" width="20" height="20" rx="3" fill="#F7DF1E" />
            <g transform="translate(1.5, 0.8) scale(0.87)" fill="#000000">
              <path d="M22.034 18.276c-.175-1.095-.88-2.015-3.003-2.874-1.736-.71-2.546-1.227-2.546-2.13 0-.755.67-1.318 1.836-1.318 1.147 0 1.758.517 1.828 1.458h3.317c-.116-2.112-1.84-3.565-5.145-3.565-2.874 0-5.127 1.516-5.127 4.07 0 2.253 1.63 3.328 4.296 4.385 1.616.634 2.153 1.093 2.153 1.837 0 .918-.9 1.503-2.176 1.503-1.407 0-2.289-.607-2.433-1.844h-3.35c.182 2.766 2.457 4.248 5.86 4.248 3.167 0 5.467-1.464 5.467-4.148.012-.875-.316-1.558-1.042-2.034zM7.785 19.12c-.524.966-1.233 1.406-2.316 1.406-1.258 0-1.996-.607-1.996-1.748V10.15H.375v8.783c0 2.607 1.642 4.098 4.417 4.098 2.058 0 3.518-1.011 4.212-2.617l-1.219-.714z" />
            </g>
          </svg>
        </span>
      )

    case 'nextjs':
    case 'next':
      return (
        <span className={className} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9.5" fill="#000000" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
            <path d="M8.5 7.5v9h2v-5.2l5.8 5.2h1.7V7.5h-2v5.2L10.2 7.5H8.5z" fill="#ffffff" />
          </svg>
        </span>
      )

    case 'alpinejs':
    case 'alpine':
    case 'alphinejs':
    case 'alphine':
      return (
        <span className={className} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M5.72 6.254 0 12l5.72 5.746h11.44L5.72 6.254Z"
              fill="#2D3748"
              stroke="rgba(255,255,255,0.18)"
              strokeWidth="0.6"
            />
            <path
              d="m24 12-5.72 5.746-5.724-5.741 5.724-5.75L24 12Z"
              fill="#77C1D2"
            />
          </svg>
        </span>
      )

    case 'streamlit':
      return (
        <span className={className} aria-hidden="true">
          <svg viewBox="0 0 128 128" fill="none">
            <path
              d="M66.07 30.286c-.997-1.454-3.165-1.454-4.125 0L41.554 60.661l22.439 11.86l42.523 22.474c.267-.261.481-.516.708-.785c.32-.395.618-.817.881-1.29l-21.66-32.26Z"
              fill="#BD4043"
            />
            <path
              d="M125.446 40.075h-.035L86.446 60.66l21.66 32.259l19.797-50.712v-.071c.498-1.494-1.031-2.845-2.457-2.061Z"
              fill="#7D2525"
            />
            <path
              d="m63.993 72.521-22.44-11.86-38.95-20.587c-.035-.035-.106-.035-.142-.035-1.422-.676-2.88.746-2.346 2.168l19.846 50.62.004.01.06.15c.814 1.888 2.592 3.054 4.526 3.513.164.036.28.067.477.107.196.043.47.103.704.12.039.004.074.004.114.007h.028l.085.008H26c.024.003.053.003.078.003h.046l.085.004a349 349 0 0 0 75.629 0 9 9 0 0 0 1.152-.074c.01-.005.025-.005.035-.008l.182-.028a4 4 0 0 0 .266-.047c.178-.039.259-.067.5-.15a10 10 0 0 0 .893-.349c.25-.12.424-.237.634-.368.26-.164.506-.331.757-.519.108-.083.182-.135.26-.21l-.043-.025L63.993 72.521Z"
              fill="#FF4B4B"
            />
          </svg>
        </span>
      )

    case 'pytorch':
      return (
        <span className={className} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M12.005 0L4.952 7.053a9.865 9.865 0 000 14.022 9.866 9.866 0 0014.022 0c3.984-3.9 3.986-10.205.085-14.023l-1.744 1.743c2.904 2.905 2.904 7.634 0 10.538s-7.634 2.904-10.538 0-2.904-7.634 0-10.538l4.647-4.646.582-.665zm3.568 3.899a1.327 1.327 0 00-1.327 1.327 1.327 1.327 0 001.327 1.328A1.327 1.327 0 0016.9 5.226 1.327 1.327 0 0015.573 3.9z"
              fill="#EE4C2C"
            />
          </svg>
        </span>
      )

    case 'python':
    case 'pygame':
      return (
        <span className={className} aria-hidden="true">
          <svg viewBox="16 16 32 32" fill="none">
            <defs>
              <linearGradient id="py-blue" x1="19" y1="19" x2="35" y2="35" gradientUnits="userSpaceOnUse">
                <stop stopColor="#387EB8" />
                <stop offset="1" stopColor="#366994" />
              </linearGradient>
              <linearGradient id="py-yellow" x1="29" y1="29" x2="46" y2="45" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFE052" />
                <stop offset="1" stopColor="#FFC331" />
              </linearGradient>
            </defs>
            <path
              fill="url(#py-blue)"
              d="M31.885 16c-8.124 0-7.617 3.523-7.617 3.523l.01 3.65h7.752v1.095H21.197S16 23.678 16 31.876c0 8.196 4.537 7.906 4.537 7.906h2.708v-3.804s-.146-4.537 4.465-4.537h7.688s4.32.07 4.32-4.175v-7.019S40.374 16 31.885 16zm-4.275 2.454a1.394 1.394 0 1 1 0 2.79 1.393 1.393 0 0 1-1.395-1.395c0-.771.624-1.395 1.395-1.395z"
            />
            <path
              fill="url(#py-yellow)"
              d="M32.115 47.833c8.124 0 7.617-3.523 7.617-3.523l-.01-3.65H31.97v-1.095h10.832S48 40.155 48 31.958c0-8.197-4.537-7.906-4.537-7.906h-2.708v3.803s.146 4.537-4.465 4.537h-7.688s-4.32-.07-4.32 4.175v7.019s-.656 4.247 7.833 4.247zm4.275-2.454a1.393 1.393 0 0 1-1.395-1.395 1.394 1.394 0 1 1 1.395 1.395z"
            />
          </svg>
        </span>
      )

    case 'laravel':
      return (
        <span className={className} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="m3 8.5 8-4.5 8 4.5v7l-8 4.5-8-4.5v-7Z" stroke="#FF2D20" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="rgba(255,45,32,0.18)" />
            <path d="m11 4-4.5 9 8 4.5" stroke="#FF2D20" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M11 13 19 8.5" stroke="#FF2D20" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      )

    case 'nodejs':
    case 'node':
      return (
        <span className={className} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M12 2.5 3.5 7.4v9.8L12 22.1l8.5-4.9V7.4L12 2.5Z" stroke="#68A063" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="rgba(104,160,99,0.22)" />
            <path d="M12 8.5v7" stroke="#68A063" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M8.5 10.5 12 8.5l3.5 2" stroke="#68A063" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      )

    case 'mysql':
      return (
        <span className={className} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <ellipse cx="12" cy="5.5" rx="8" ry="3" stroke="#00758F" strokeWidth="1.6" fill="rgba(0,117,143,0.2)" />
            <path d="M4 5.5v5c0 1.66 3.58 3 8 3s8-1.34 8-3v-5" stroke="#00758F" strokeWidth="1.6" />
            <path d="M4 10.5v5c0 1.66 3.58 3 8 3s8-1.34 8-3v-5" stroke="#F29111" strokeWidth="1.6" />
            <circle cx="12" cy="18" r="1.5" fill="#F29111" />
          </svg>
        </span>
      )

    case 'vite':
      return (
        <span className={className} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="m20.5 3.5-8.5 17-8.5-17 12 2.5z" stroke="#BD34FE" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="rgba(189,52,254,0.22)" />
            <path d="m14 3.5-5 7.5h4.5l-3.5 7.5 7-9.5h-4.5z" fill="#FFD622" stroke="#FFD622" strokeWidth="0.6" strokeLinejoin="round" />
          </svg>
        </span>
      )

    case 'tailwindcss':
    case 'tailwind':
      return (
        <span className={className} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="#38BDF8">
            <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C8.335 13.382 6.974 12 6.001 12z" />
          </svg>
        </span>
      )

    case 'bootstrap':
    case 'bootstrap5':
      return (
        <span className={className} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="18" height="18" rx="4" fill="#7952B3" />
            <path d="M8.5 7.5h3.8c1.5 0 2.5.8 2.5 2 0 .9-.6 1.6-1.4 1.8 1.1.2 1.8 1 1.8 2.1 0 1.4-1.1 2.3-2.8 2.3H8.5V7.5Zm2.1 3.2h1.5c.6 0 1-.3 1-.8 0-.6-.4-.9-1-.9h-1.5v1.7Zm0 3.3h1.7c.7 0 1.2-.4 1.2-1 0-.6-.5-1-1.2-1h-1.7v2Z" fill="#ffffff" />
          </svg>
        </span>
      )

    case 'rbac':
      return (
        <span className={className} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M12 2.5 4.5 5.5v6c0 5 3.5 9.5 7.5 10.5 4-1 7.5-5.5 7.5-10.5v-6L12 2.5Z" stroke="#EF4444" strokeWidth="1.6" fill="rgba(239,68,68,0.18)" />
            <circle cx="12" cy="10" r="2" stroke="#EF4444" strokeWidth="1.3" />
            <path d="M8.5 15.5c0-1.8 1.6-3 3.5-3s3.5 1.2 3.5 3" stroke="#EF4444" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
        </span>
      )

    case 'kotlin':
      return (
        <span className={className} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <defs>
              <linearGradient id="kotlin-brand-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7F52FF" />
                <stop offset="50%" stopColor="#C711E1" />
                <stop offset="100%" stopColor="#E4485D" />
              </linearGradient>
            </defs>
            <path d="M3 3h18L12 12l9 9H3Z" fill="url(#kotlin-brand-grad)" stroke="#7F52FF" strokeWidth="0.8" />
            <path d="M3 12 12 3" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
          </svg>
        </span>
      )

    case 'androidsdk':
    case 'android':
      return (
        <span className={className} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M6 13a6 6 0 0 1 12 0v2H6v-2Z" stroke="#3DDC84" strokeWidth="1.6" fill="rgba(61,220,132,0.22)" />
            <circle cx="9" cy="11.5" r="0.8" fill="#3DDC84" />
            <circle cx="15" cy="11.5" r="0.8" fill="#3DDC84" />
            <path d="m7 7 1.5 2.5M17 7l-1.5 2.5" stroke="#3DDC84" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M6 17v2.5M18 17v2.5" stroke="#3DDC84" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </span>
      )

    case 'flutter':
      return (
        <span className={className} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M14.3 0 2.3 12 6.1 15.8 21.9 0h-7.6Z" fill="#02569B" />
            <path d="M14.3 11.2 8.6 16.9l5.7 5.7h7.6l-5.7-5.7 5.7-5.7h-7.6Z" fill="#54C5F8" />
            <path d="m11.5 14 2.8-2.8 2.8 2.8-2.8 2.8z" fill="#0175C2" />
          </svg>
        </span>
      )

    case 'reactnative':
      return (
        <span className={className} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <rect x="7" y="3" width="10" height="18" rx="2" stroke="#38BDF8" strokeWidth="1.4" fill="rgba(56,189,248,0.12)" />
            <ellipse cx="12" cy="11" rx="4" ry="1.6" stroke="#61DAFB" strokeWidth="1.2" />
            <ellipse cx="12" cy="11" rx="4" ry="1.6" transform="rotate(60 12 11)" stroke="#61DAFB" strokeWidth="1.2" />
            <ellipse cx="12" cy="11" rx="4" ry="1.6" transform="rotate(120 12 11)" stroke="#61DAFB" strokeWidth="1.2" />
            <circle cx="12" cy="18" r="0.8" fill="#61DAFB" />
          </svg>
        </span>
      )

    case 'restapis':
    case 'restapi':
    case 'api':
      return (
        <span className={className} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M16 4h4v4M18 6l-6 6M8 20H4v-4M6 18l6-6" stroke="#10B981" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="12" cy="12" r="2.5" fill="#10B981" />
          </svg>
        </span>
      )

    case 'mikrotik':
    case 'mikrotikrouteros':
      return (
        <span className={className} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 18h16M4 6h16M7 6v12M17 6v12M12 9v6" stroke="#0080C0" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="12" cy="7" r="1.3" fill="#E62325" />
            <circle cx="12" cy="17" r="1.3" fill="#0080C0" />
          </svg>
        </span>
      )

    case 'routing':
      return (
        <span className={className} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <circle cx="6" cy="18" r="2.5" fill="#06B6D4" stroke="#06B6D4" strokeWidth="1.2" />
            <circle cx="18" cy="6" r="2.5" fill="#06B6D4" stroke="#06B6D4" strokeWidth="1.2" />
            <path d="M8.5 18h4.5a5 5 0 0 0 5-5V8.5" stroke="#06B6D4" strokeWidth="1.6" strokeLinecap="round" />
            <path d="m15 9 3-3 3 3" stroke="#06B6D4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      )

    case 'switching':
      return (
        <span className={className} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <rect x="3" y="6" width="18" height="12" rx="2" stroke="#38BDF8" strokeWidth="1.5" fill="rgba(56,189,248,0.12)" />
            <path d="M7 10h10M14 8l3 2-3 2M17 14H7M10 12l-3 2 3 2" stroke="#38BDF8" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      )

    case 'enterpriseservers':
      return (
        <span className={className} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <rect
              x="3"
              y="4"
              width="18"
              height="6.5"
              rx="1.5"
              stroke="#3B82F6"
              strokeWidth="1.5"
              fill="rgba(59, 130, 246, 0.15)"
            />
            <circle cx="6.5" cy="7.25" r="1" fill="#10B981" />
            <circle cx="9.5" cy="7.25" r="0.8" fill="#3B82F6" />
            <line x1="14" y1="7.25" x2="18" y2="7.25" stroke="#3B82F6" strokeWidth="1.4" strokeLinecap="round" />
            <rect
              x="3"
              y="13.5"
              width="18"
              height="6.5"
              rx="1.5"
              stroke="#3B82F6"
              strokeWidth="1.5"
              fill="rgba(59, 130, 246, 0.15)"
            />
            <circle cx="6.5" cy="16.75" r="1" fill="#10B981" />
            <circle cx="9.5" cy="16.75" r="0.8" fill="#3B82F6" />
            <line x1="14" y1="16.75" x2="18" y2="16.75" stroke="#3B82F6" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </span>
      )

    case 'ciscopackettracer':
    case 'cisco':
      return (
        <span className={className} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="#049FD9" strokeWidth="1.8" strokeLinecap="round">
            <path d="M3 15v3M6 11v7M9 8v10M12 5v13M15 8v10M18 11v7M21 15v3" />
          </svg>
        </span>
      )

    case 'bgp':
    case 'bgpebgpibgp':
      return (
        <span className={className} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="3" stroke="#F59E0B" strokeWidth="1.6" fill="rgba(245,158,11,0.22)" />
            <path d="M12 3v6M12 15v6M3 12h6M15 12h6" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="12" cy="3" r="1.5" fill="#F59E0B" />
            <circle cx="12" cy="21" r="1.5" fill="#F59E0B" />
            <circle cx="3" cy="12" r="1.5" fill="#F59E0B" />
            <circle cx="21" cy="12" r="1.5" fill="#F59E0B" />
          </svg>
        </span>
      )

    case 'ospf':
    case 'ospfmultiarea':
      return (
        <span className={className} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="5" r="2.5" fill="#10B981" stroke="#10B981" strokeWidth="1" />
            <circle cx="5" cy="17" r="2.5" fill="#10B981" stroke="#10B981" strokeWidth="1" />
            <circle cx="19" cy="17" r="2.5" fill="#10B981" stroke="#10B981" strokeWidth="1" />
            <path d="m7.2 15.3 3.3-8M16.8 15.3l-3.3-8M7.5 17h9" stroke="#10B981" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </span>
      )

    case 'python':
      return (
        <span className={className} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M11.5 3H8a4 4 0 0 0-4 4v3a2 2 0 0 0 2 2h5.5v-1a2 2 0 0 1 2-2H17a2 2 0 0 0 2-2V7a4 4 0 0 0-4-4h-3.5Z" fill="#3776AB" />
            <circle cx="7.5" cy="5.5" r="0.9" fill="#ffffff" />
            <path d="M12.5 21H16a4 4 0 0 0 4-4v-3a2 2 0 0 0-2-2h-5.5v1a2 2 0 0 1-2 2H7a2 2 0 0 0-2 2v0a4 4 0 0 0 4 4h3.5Z" fill="#FFD43B" />
            <circle cx="16.5" cy="18.5" r="0.9" fill="#000000" />
          </svg>
        </span>
      )

    case 'yolov8vision':
    case 'yolov8':
    case 'yolo':
      return (
        <span className={className} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M3 8V5a2 2 0 0 1 2-2h3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M8 21H5a2 2 0 0 1-2-2v-3" stroke="#FF3838" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="12" cy="12" r="3" stroke="#00FFFF" strokeWidth="1.5" />
            <path d="M12 6.5v2M12 15.5v2M6.5 12h2M15.5 12h2" stroke="#00FFFF" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      )

    case 'tensorrt':
      return (
        <span className={className} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <rect x="4" y="4" width="16" height="16" rx="3" stroke="#76B900" strokeWidth="1.6" fill="rgba(118,185,0,0.18)" />
            <rect x="8" y="8" width="8" height="8" rx="1" fill="#76B900" />
            <path d="M8 2v2M12 2v2M16 2v2M8 20v2M12 20v2M16 20v2M2 8h2M2 12h2M2 16h2M20 8h2M20 12h2M20 16h2" stroke="#76B900" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </span>
      )

    case 'fastapi':
      return (
        <span className={className} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9.5" fill="#059669" stroke="#059669" strokeWidth="1" />
            <path d="M13 3.5 6.5 13.5h4.5L10 21l7.5-10.5h-4.5L13 3.5Z" fill="#ffffff" />
          </svg>
        </span>
      )

    case 'opencv':
      return (
        <span className={className} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="7.5" r="3.2" stroke="#EF4444" strokeWidth="1.8" />
            <circle cx="7.5" cy="15.5" r="3.2" stroke="#3B82F6" strokeWidth="1.8" />
            <circle cx="16.5" cy="15.5" r="3.2" stroke="#10B981" strokeWidth="1.8" />
          </svg>
        </span>
      )

    case 'websocket':
    case 'websockets':
      return (
        <span className={className} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="m6 9-3 3 3 3M18 9l3 3-3 3" stroke="#F59E0B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="m10 7 4 10" stroke="#F59E0B" strokeWidth="1.6" strokeLinecap="round" />
            <circle cx="12" cy="12" r="2" fill="#F59E0B" />
          </svg>
        </span>
      )

    case 'qgis':
    case 'qgis2web':
    case 'gis':
      return (
        <span className={className} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <polygon points="12 3 20 7.5 12 12 4 7.5 12 3" stroke="#589632" strokeWidth="1.6" fill="rgba(88,150,50,0.22)" />
            <path d="m4 12 8 4.5 8-4.5" stroke="#93B023" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="m4 16.5 8 4.5 8-4.5" stroke="#589632" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      )

    case 'pandas':
    case 'geopandas':
      return (
        <span className={className} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <rect x="3" y="4" width="18" height="16" rx="2" stroke="#150458" strokeWidth="1.6" fill="rgba(231,4,136,0.15)" />
            <path d="M3 10h18M3 15h18M9 4v16M15 4v16" stroke="#E70488" strokeWidth="1.5" />
          </svg>
        </span>
      )

    case 'figmauiux':
    case 'figma':
      return (
        <span className={className} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M8.5 2A3.5 3.5 0 0 0 5 5.5 3.5 3.5 0 0 0 8.5 9H12V2H8.5z" fill="#F24E1E" />
            <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" fill="#FF7262" />
            <path d="M12 9H8.5A3.5 3.5 0 0 0 5 12.5 3.5 3.5 0 0 0 8.5 16H12V9z" fill="#A259FF" />
            <path d="M12 9h3.5a3.5 3.5 0 1 1 0 7H12V9z" fill="#1ABCFE" />
            <path d="M8.5 16A3.5 3.5 0 0 0 5 19.5 3.5 3.5 0 0 0 8.5 23a3.5 3.5 0 0 0 3.5-3.5V16H8.5z" fill="#0ACF83" />
          </svg>
        </span>
      )

    case 'shapely':
      return (
        <span className={className} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <polygon points="12 3.5 20.5 9 17.5 19.5 6.5 19.5 3.5 9" stroke="#38BDF8" strokeWidth="1.6" fill="rgba(56,189,248,0.2)" strokeLinejoin="round" />
            <circle cx="12" cy="12" r="2" fill="#38BDF8" />
          </svg>
        </span>
      )

    case 'geojson':
      return (
        <span className={className} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M12 2.5a6.5 6.5 0 0 0-6.5 6.5c0 4.8 6.5 12.5 6.5 12.5s6.5-7.7 6.5-12.5A6.5 6.5 0 0 0 12 2.5Z" stroke="#10B981" strokeWidth="1.6" fill="rgba(16,185,129,0.18)" />
            <circle cx="12" cy="9" r="2.2" fill="#10B981" />
          </svg>
        </span>
      )

    case 'kalilinux':
    case 'kali':
      return (
        <span className={className} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M12 21.5s7.5-3.8 7.5-9.5V5.5L12 2.5 4.5 5.5V12c0 5.7 7.5 9.5 7.5 9.5Z" stroke="#278BF5" strokeWidth="1.5" fill="rgba(39,139,245,0.18)" />
            <path d="M12 7c-1.8 1.8-1.8 4.6 0 6.4 1.3 1.3 2.8.5 3.2 0-.9-.9-1.3-1.8-1.3-3.2 0-1.8 1.8-2.7 1.8-2.7S14.2 7 12 7Z" fill="#278BF5" />
          </svg>
        </span>
      )

    case 'wireshark':
      return (
        <span className={className} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 18c3-1 6-2 8-2 3.5 0 5.5 2 8 2M5 18c2-4 5.5-12 11-12-1 3-1 8 0 12" stroke="#167EC2" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="rgba(22,126,194,0.22)" />
          </svg>
        </span>
      )

    case 'nmap':
      return (
        <span className={className} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="8.5" stroke="#2684FF" strokeWidth="1.5" fill="rgba(38,132,255,0.12)" />
            <circle cx="12" cy="12" r="4.5" stroke="#00D2FF" strokeWidth="1.2" strokeDasharray="3 2" />
            <circle cx="12" cy="12" r="1.8" fill="#00D2FF" />
            <path d="M12 12 17.5 6.5" stroke="#00D2FF" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </span>
      )

    case 'openvas':
      return (
        <span className={className} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M12 2.5 4.5 5.8v5.5c0 4.8 3.2 9.2 7.5 10.7 4.3-1.5 7.5-5.9 7.5-10.7V5.8L12 2.5Z" stroke="#28A745" strokeWidth="1.5" fill="rgba(40,167,69,0.18)" />
            <path d="m9.2 12 2 2 3.8-4" stroke="#28A745" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      )

    case 'vlan':
    case 'vlan8021q':
      return (
        <span className={className} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <rect x="3" y="4" width="7" height="5.5" rx="1.5" stroke="#A855F7" strokeWidth="1.4" fill="rgba(168,85,247,0.15)" />
            <rect x="14" y="4" width="7" height="5.5" rx="1.5" stroke="#A855F7" strokeWidth="1.4" fill="rgba(168,85,247,0.15)" />
            <rect x="8.5" y="14.5" width="7" height="5.5" rx="1.5" stroke="#A855F7" strokeWidth="1.4" fill="rgba(168,85,247,0.15)" />
            <path d="M6.5 9.5V12a1.5 1.5 0 0 0 1.5 1.5h8a1.5 1.5 0 0 0 1.5-1.5V9.5M12 14.5v-1" stroke="#A855F7" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </span>
      )

    case 'subnetting':
    case 'vlsmsubnetting':
    case 'vlsm':
      return (
        <span className={className} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <circle cx="5" cy="12" r="2" fill="#38BDF8" />
            <circle cx="12" cy="12" r="2" fill="#38BDF8" />
            <circle cx="19" cy="12" r="2" fill="#38BDF8" />
            <path d="M7 12h3M14 12h3M12 5.5v4.5M12 14v4.5" stroke="#38BDF8" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </span>
      )

    case 'sql':
    case 'database':
    case 'dbms':
      return (
        <span className={className} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <ellipse cx="12" cy="5.5" rx="8" ry="2.5" stroke="#00758F" strokeWidth="1.5" fill="rgba(0,117,143,0.2)" />
            <path d="M4 5.5v4.5c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5V5.5M4 10v4.5c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5V10M4 14.5v4c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5v-4" stroke="#00758F" strokeWidth="1.5" />
          </svg>
        </span>
      )

    case 'nosql':
      return (
        <span className={className} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 6.5h16M4 12h16M4 17.5h16" stroke="#10B981" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="8" cy="6.5" r="2.2" fill="#10B981" />
            <circle cx="16" cy="12" r="2.2" fill="#10B981" />
            <circle cx="10" cy="17.5" r="2.2" fill="#10B981" />
          </svg>
        </span>
      )

    case 'prototype':
      return (
        <span className={className} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <rect x="4" y="4" width="6" height="6" rx="1.5" stroke="#EC4899" strokeWidth="1.5" fill="rgba(236,72,153,0.15)" />
            <rect x="14" y="14" width="6" height="6" rx="1.5" stroke="#EC4899" strokeWidth="1.5" fill="rgba(236,72,153,0.15)" />
            <path d="M10 7h4a3 3 0 0 1 3 3v4M14 11l3 3 3-3" stroke="#EC4899" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      )

    case 'uiux':
    case 'design':
      return (
        <span className={className} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="18" height="18" rx="3" stroke="#A855F7" strokeWidth="1.5" />
            <path d="M3 9h18M9 9v12" stroke="#A855F7" strokeWidth="1.3" />
            <circle cx="6" cy="6" r="1.2" fill="#A855F7" />
            <circle cx="15" cy="15" r="2.5" stroke="#EC4899" strokeWidth="1.4" fill="rgba(236,72,153,0.2)" />
          </svg>
        </span>
      )

    case 'gsap':
    case 'greensock':
      return (
        <span className={className} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <rect x="2.5" y="2.5" width="19" height="19" rx="4.5" fill="#0AE448" fillOpacity="0.18" stroke="#0AE448" strokeWidth="1.4" />
            <path d="M8 8.5h8M8 12h5.5M8 15.5h7" stroke="#0AE448" strokeWidth="2" strokeLinecap="round" />
            <circle cx="16.5" cy="15.5" r="1.2" fill="#0AE448" />
          </svg>
        </span>
      )

    case 'threejs':
    case 'three':
      return (
        <span className={className} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="m12 2.5 8.5 14.5h-17L12 2.5Z" stroke="#38BDF8" strokeWidth="1.5" strokeLinejoin="round" fill="rgba(56,189,248,0.15)" />
            <path d="M12 2.5v14.5M3.5 17 16 9.5M20.5 17 8 9.5" stroke="#38BDF8" strokeWidth="1" strokeOpacity="0.7" />
          </svg>
        </span>
      )

    case 'framermotion':
    case 'framer':
      return (
        <span className={className} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 2h16v7h-8zM4 9h8l8 8H4zM4 17h8l-8 5z" fill="#F43F5E" />
          </svg>
        </span>
      )

    default:
      return (
        <span className={className} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="#f43f5e" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
        </span>
      )
  }
}
