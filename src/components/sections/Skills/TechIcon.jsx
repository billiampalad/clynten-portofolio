export default function TechIcon({ name, className = 'tech-chip-icon' }) {
  const key = name.toLowerCase().replace(/[^a-z0-9]/g, '')

  switch (key) {
    case 'react':
      return (
        <span className={className} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <ellipse cx="12" cy="12" rx="10" ry="4" />
            <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
            <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
            <circle cx="12" cy="12" r="1.5" fill="currentColor" />
          </svg>
        </span>
      )

    case 'nextjs':
    case 'next':
      return (
        <span className={className} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <circle cx="12" cy="12" r="9.5" />
            <path d="M9 16.5V7.5l9 10.5" />
            <path d="M15 7.5v4" />
          </svg>
        </span>
      )

    case 'laravel':
      return (
        <span className={className} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="m3 8.5 7.5-4.5 7.5 4.5v7l-7.5 4.5L3 15.5v-7Z" />
            <path d="m10.5 4-4.5 9 7.5 4.5" />
            <path d="M10.5 13 18 8.5" />
          </svg>
        </span>
      )

    case 'nodejs':
    case 'node':
      return (
        <span className={className} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2.5 3.5 7.4v9.8L12 22.1l8.5-4.9V7.4L12 2.5Z" />
            <path d="M12 8.5v7" />
            <path d="M8.5 10.5 12 8.5l3.5 2" />
          </svg>
        </span>
      )

    case 'mysql':
      return (
        <span className={className} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <ellipse cx="12" cy="5.5" rx="8" ry="3" />
            <path d="M4 5.5v5c0 1.66 3.58 3 8 3s8-1.34 8-3v-5" />
            <path d="M4 10.5v5c0 1.66 3.58 3 8 3s8-1.34 8-3v-5" />
          </svg>
        </span>
      )

    case 'vite':
      return (
        <span className={className} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="m20.5 3.5-8.5 17-8.5-17 12 2.5z" />
            <path d="m14 3.5-5 7.5h4.5l-3.5 7.5 7-9.5h-4.5z" fill="currentColor" fillOpacity="0.2" />
          </svg>
        </span>
      )

    case 'tailwindcss':
    case 'tailwind':
      return (
        <span className={className} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C8.335 13.382 6.974 12 6.001 12z" />
          </svg>
        </span>
      )

    case 'kotlin':
      return (
        <span className={className} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 3h18L12 12l9 9H3Z" />
            <path d="M3 12 12 3" />
          </svg>
        </span>
      )

    case 'androidsdk':
    case 'android':
      return (
        <span className={className} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <path d="M6 13a6 6 0 0 1 12 0v2H6v-2Z" />
            <circle cx="9" cy="11.5" r="0.8" fill="currentColor" />
            <circle cx="15" cy="11.5" r="0.8" fill="currentColor" />
            <path d="m7 7 1.5 2.5M17 7l-1.5 2.5" />
            <path d="M6 17v2.5M18 17v2.5" />
          </svg>
        </span>
      )

    case 'flutter':
      return (
        <span className={className} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M14.314 0 2.3 12 6.1 15.8 21.9 0h-7.586zm0 11.2-5.7 5.7 5.7 5.7h7.586l-5.7-5.7 5.7-5.7h-7.586z" />
          </svg>
        </span>
      )

    case 'reactnative':
      return (
        <span className={className} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <rect x="7" y="3" width="10" height="18" rx="2" strokeWidth="1.4" />
            <ellipse cx="12" cy="11" rx="4" ry="1.6" />
            <ellipse cx="12" cy="11" rx="4" ry="1.6" transform="rotate(60 12 11)" />
            <ellipse cx="12" cy="11" rx="4" ry="1.6" transform="rotate(120 12 11)" />
            <circle cx="12" cy="18" r="0.8" fill="currentColor" />
          </svg>
        </span>
      )

    case 'restapis':
    case 'api':
      return (
        <span className={className} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 4h4v4M18 6l-6 6M8 20H4v-4M6 18l6-6" />
            <circle cx="12" cy="12" r="2" fill="currentColor" />
          </svg>
        </span>
      )

    case 'mikrotik':
      return (
        <span className={className} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 18h16M4 6h16M7 6v12M17 6v12M12 9v6" />
            <circle cx="12" cy="7" r="1" fill="currentColor" />
            <circle cx="12" cy="17" r="1" fill="currentColor" />
          </svg>
        </span>
      )

    case 'routing':
      return (
        <span className={className} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="6" r="3" />
            <path d="M9 18h4a5 5 0 0 0 5-5V9" />
            <path d="m15 9 3-3 3 3" />
          </svg>
        </span>
      )

    case 'switching':
      return (
        <span className={className} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="6" width="18" height="12" rx="2" />
            <path d="M7 10h10M14 8l3 2-3 2M17 14H7M10 12l-3 2 3 2" />
          </svg>
        </span>
      )

    case 'cisco':
      return (
        <span className={className} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <path d="M3 15v3M6 11v7M9 8v10M12 5v13M15 8v10M18 11v7M21 15v3" />
          </svg>
        </span>
      )

    case 'bgp':
      return (
        <span className={className} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 3v6M12 15v6M3 12h6M15 12h6" />
            <circle cx="12" cy="3" r="1.5" />
            <circle cx="12" cy="21" r="1.5" />
            <circle cx="3" cy="12" r="1.5" />
            <circle cx="21" cy="12" r="1.5" />
          </svg>
        </span>
      )

    case 'ospf':
      return (
        <span className={className} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="5" r="2.5" />
            <circle cx="5" cy="17" r="2.5" />
            <circle cx="19" cy="17" r="2.5" />
            <path d="m7.2 15.3 3.3-8M16.8 15.3l-3.3-8M7.5 17h9" />
          </svg>
        </span>
      )

    case 'python':
      return (
        <span className={className} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11.5 3H8a4 4 0 0 0-4 4v3a2 2 0 0 0 2 2h5.5v-1a2 2 0 0 1 2-2H17a2 2 0 0 0 2-2V7a4 4 0 0 0-4-4h-3.5Z" />
            <circle cx="7.5" cy="5.5" r="0.8" fill="currentColor" />
            <path d="M12.5 21H16a4 4 0 0 0 4-4v-3a2 2 0 0 0-2-2h-5.5v1a2 2 0 0 1-2 2H7a2 2 0 0 0-2 2v0a4 4 0 0 0 4 4h3.5Z" />
            <circle cx="16.5" cy="18.5" r="0.8" fill="currentColor" />
          </svg>
        </span>
      )

    case 'yolov8vision':
    case 'yolov8':
    case 'yolo':
      return (
        <span className={className} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <path d="M3 8V5a2 2 0 0 1 2-2h3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M8 21H5a2 2 0 0 1-2-2v-3" />
            <circle cx="12" cy="12" r="3" />
            <path d="M12 7v2M12 15v2M7 12h2M15 12h2" />
          </svg>
        </span>
      )

    case 'qgis':
    case 'gis':
      return (
        <span className={className} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 3 20 7.5 12 12 4 7.5 12 3" />
            <path d="m4 12 8 4.5 8-4.5" />
            <path d="m4 16.5 8 4.5 8-4.5" />
          </svg>
        </span>
      )

    case 'pandas':
      return (
        <span className={className} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <path d="M3 10h18M3 15h18M9 4v16M15 4v16" />
          </svg>
        </span>
      )

    case 'figmauiux':
    case 'figma':
      return (
        <span className={className} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M8.5 2A3.5 3.5 0 0 0 5 5.5 3.5 3.5 0 0 0 8.5 9H12V2H8.5zM12 2h3.5a3.5 3.5 0 1 1 0 7H12V2zM12 9H8.5A3.5 3.5 0 0 0 5 12.5 3.5 3.5 0 0 0 8.5 16H12V9zM12 9h3.5a3.5 3.5 0 1 1 0 7H12V9zM8.5 16A3.5 3.5 0 0 0 5 19.5 3.5 3.5 0 0 0 8.5 23a3.5 3.5 0 0 0 3.5-3.5V16H8.5z" />
          </svg>
        </span>
      )

    default:
      return (
        <span className={className} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
        </span>
      )
  }
}
