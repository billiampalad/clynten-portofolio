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

    case 'cisco':
      return (
        <span className={className} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="#049FD9" strokeWidth="1.8" strokeLinecap="round">
            <path d="M3 15v3M6 11v7M9 8v10M12 5v13M15 8v10M18 11v7M21 15v3" />
          </svg>
        </span>
      )

    case 'bgp':
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

    case 'qgis':
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
