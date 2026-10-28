'use client';

import { memo, useEffect, useRef } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Mail01Icon } from '@hugeicons/core-free-icons';
import defaultProfile from '@/assets/profile.webp';

const THEMES = {
  dark: {
    '--pc-frame': 'rgba(38, 35, 46, 0.66)',
    '--pc-frame-edge': 'rgba(255, 255, 255, 0.08)',
    '--pc-frame-highlight': 'rgba(255, 255, 255, 0.07)',
    '--pc-frame-shadow': '0 22px 44px -20px rgba(0, 0, 0, 0.8), 0 6px 16px -8px rgba(0, 0, 0, 0.5)',
    '--pc-tile': 'linear-gradient(180deg, #3a3644 0%, #27242f 100%)',
    '--pc-tile-edge': 'rgba(255, 255, 255, 0.07)',
    '--pc-tile-highlight': 'rgba(255, 255, 255, 0.12)',
    '--pc-tile-shadow': '0 4px 10px -4px rgba(0, 0, 0, 0.7)',
    '--pc-ink': '#f4f4f5',
    '--pc-muted': 'rgba(244, 244, 245, 0.6)',
    '--pc-hover': 'brightness(1.12)',
    '--pc-press': 'brightness(0.8)',
    '--pc-shade': 'rgba(0, 0, 0, 0.4)'
  },
  light: {
    '--pc-frame': 'rgba(240, 240, 243, 0.8)',
    '--pc-frame-edge': 'rgba(24, 24, 27, 0.07)',
    '--pc-frame-highlight': 'rgba(255, 255, 255, 0.95)',
    '--pc-frame-shadow': '0 22px 44px -22px rgba(24, 24, 27, 0.3), 0 6px 16px -10px rgba(24, 24, 27, 0.16)',
    '--pc-tile': 'linear-gradient(180deg, #ffffff 0%, #f6f6f8 100%)',
    '--pc-tile-edge': 'rgba(24, 24, 27, 0.08)',
    '--pc-tile-highlight': 'rgba(255, 255, 255, 1)',
    '--pc-tile-shadow': '0 4px 10px -5px rgba(24, 24, 27, 0.25)',
    '--pc-ink': '#27272a',
    '--pc-muted': 'rgba(39, 39, 42, 0.6)',
    '--pc-hover': 'brightness(0.97)',
    '--pc-press': 'brightness(0.92)',
    '--pc-shade': 'rgba(24, 24, 27, 0.14)'
  }
};

const FOILS = {
  dark: {
    '--pc-blend': 'color-dodge',
    '--pc-holo-filter': 'hue-rotate(0deg)',
    '--pc-sheen': 'rgba(255, 255, 255, 0.16)'
  },
  light: {
    '--pc-blend': 'multiply',
    '--pc-holo-filter': 'invert(1) hue-rotate(180deg)',
    '--pc-sheen': 'rgba(255, 255, 255, 0)'
  }
};

const GRAIN = `url("data:image/svg+xml,${encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='500' height='500'><filter id='g' x='0' y='0' width='100%' height='100%' color-interpolation-filters='sRGB'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0.55 0 0 0 -0.24 0.55 0 0 0 -0.24 0.55 0 0 0 -0.24 0 0 0 0 1'/></filter><rect width='100%' height='100%' filter='url(#g)'/></svg>"
)}")`;

const DEFAULT_PATTERN = `data:image/svg+xml,${encodeURIComponent(
  "<svg width='48' height='48' viewBox='0 0 36 36' fill='none' xmlns='http://www.w3.org/2000/svg'><g transform='translate(6, 6)'><path d='M16.4425 7.32787C16.7196 7.01999 17.1938 6.99503 17.5017 7.27213L19.2392 8.83587C19.9756 9.49853 20.5864 10.0482 21.0058 10.5468C21.4468 11.071 21.7603 11.6343 21.7603 12.3296C21.7603 13.0249 21.4468 13.5882 21.0058 14.1124C20.5864 14.611 19.9756 15.1607 19.2392 15.8233L17.5017 17.3871C17.1938 17.6642 16.7196 17.6392 16.4425 17.3313C16.1654 17.0234 16.1904 16.5492 16.4983 16.2721L18.1947 14.7453C18.9826 14.0362 19.5138 13.5558 19.8579 13.1468C20.1882 12.7542 20.2603 12.525 20.2603 12.3296C20.2603 12.1342 20.1882 11.905 19.8579 11.5124C19.5138 11.1034 18.9826 10.623 18.1947 9.91389L16.4983 8.38707C16.1904 8.10997 16.1654 7.63576 16.4425 7.32787Z' fill='#ffffff'/><path d='M7.50178 8.38707C7.80966 8.10997 7.83462 7.63576 7.55752 7.32787C7.28043 7.01999 6.80621 6.99503 6.49833 7.27213L4.76084 8.83587C4.0245 9.49853 3.41369 10.0482 2.99428 10.5468C2.55325 11.071 2.23975 11.6343 2.23975 12.3296C2.23975 13.0249 2.55325 13.5882 2.99428 14.1124C3.41369 14.611 4.02449 15.1607 4.76082 15.8233L6.49833 17.3871C6.80621 17.6642 7.28043 17.6392 7.55752 17.3313C7.83462 17.0234 7.80966 16.5492 7.50178 16.2721L5.80531 14.7453C5.01743 14.0362 4.48623 13.5558 4.14213 13.1468C3.81188 12.7542 3.73975 12.525 3.73975 12.3296C3.73975 12.1342 3.81188 11.905 4.14213 11.5124C4.48623 11.1034 5.01743 10.623 5.80531 9.91389L7.50178 8.38707Z' fill='#ffffff'/><path d='M14.1816 4.2755C14.5817 4.3827 14.8191 4.79396 14.7119 5.19406L10.7383 20.0238C10.6311 20.4239 10.2198 20.6613 9.81974 20.5541C9.41964 20.4469 9.18221 20.0356 9.28941 19.6355L13.263 4.80583C13.3702 4.40573 13.7815 4.16829 14.1816 4.2755Z' fill='#ffffff' opacity='0.8'/></g></svg>"
)}`;

const SPECTRUM =
  'repeating-linear-gradient(0deg, hsl(2, 100%, 73%) 5%, hsl(53, 100%, 69%) 10%, hsl(93, 100%, 69%) 15%, hsl(176, 100%, 76%) 20%, hsl(228, 100%, 74%) 25%, hsl(260, 100%, 76%) 30%, hsl(2, 100%, 73%) 35%)';
const BARS =
  'repeating-linear-gradient(-45deg, #0e152e 0%, hsl(180, 10%, 60%) 3.8%, hsl(180, 29%, 66%) 4.5%, hsl(180, 10%, 60%) 5.2%, #0e152e 10%, #0e152e 12%)';
const FALLOFF =
  'radial-gradient(farthest-corner circle at var(--pc-pointer-x) var(--pc-pointer-y), hsla(0, 0%, 0%, 0.1) 12%, hsla(0, 0%, 0%, 0.15) 20%, hsla(0, 0%, 0%, 0.25) 120%)';
const PATTERN_POSITION = 'calc(50% - var(--pc-shift-x) * 1.5) calc(50% - var(--pc-shift-y) * 1.5)';

const ROOT_VARS = {
  '--pc-light-x': '50%',
  '--pc-light-y': '50%',
  '--pc-pointer-x': '50%',
  '--pc-pointer-y': '50%',
  '--pc-band-x': '50%',
  '--pc-band-y': '50%',
  '--pc-reach': 0,
  '--pc-rotate-x': '0deg',
  '--pc-rotate-y': '0deg',
  '--pc-shift-x': '0px',
  '--pc-shift-y': '0px',
  '--pc-tilt': 0,
  '--pc-active': 0
};

const SHEEN_STYLE = {
  background:
    'radial-gradient(farthest-corner circle at calc(var(--pc-light-x) - 10px) calc(var(--pc-light-y) - 10px), var(--pc-sheen) 0%, transparent 55%)',
  opacity: 'calc(var(--pc-holo) * var(--pc-active))'
};

const HOLO_STYLE = {
  backgroundImage: `${SPECTRUM}, ${BARS}, ${FALLOFF}`,
  backgroundPosition: '0 var(--pc-band-y), var(--pc-band-x) var(--pc-band-y), center',
  backgroundSize: '500% 500%, 300% 300%, 200% 200%',
  backgroundBlendMode: 'color, hard-light',
  filter:
    'brightness(calc(0.66 + 0.19 * var(--pc-active))) contrast(calc(1.33 + 0.17 * var(--pc-active))) saturate(calc(0.33 + 0.17 * var(--pc-active))) var(--pc-holo-filter)',
  opacity: 'calc(var(--pc-holo) * var(--pc-holo-gain) * (0.5 + 0.5 * var(--pc-active)))',
  WebkitMaskImage: 'var(--pc-pattern)',
  WebkitMaskSize: 'var(--pc-pattern-size)',
  WebkitMaskPosition: PATTERN_POSITION,
  WebkitMaskRepeat: 'var(--pc-pattern-repeat, no-repeat)',
  maskImage: 'var(--pc-pattern)',
  maskSize: 'var(--pc-pattern-size)',
  maskPosition: PATTERN_POSITION,
  maskRepeat: 'var(--pc-pattern-repeat, no-repeat)'
};

const GLOW_STYLE = {
  backgroundImage:
    'linear-gradient(45deg, hsl(176, 100%, 76%), hsl(228, 100%, 74%), hsl(260, 100%, 76%), hsl(2, 100%, 73%), hsl(53, 100%, 69%), hsl(93, 100%, 69%)), radial-gradient(circle at var(--pc-pointer-x) var(--pc-pointer-y), hsl(0, 0%, 70%) 0%, hsla(0, 0%, 30%, 0.2) 90%), var(--pc-grain)',
  backgroundSize: '250% 250%, 100% 100%, 220px 220px',
  backgroundPosition: 'var(--pc-pointer-x) var(--pc-pointer-y), center, 0 0',
  backgroundBlendMode: 'color-dodge',
  filter:
    'brightness(calc(2 - var(--pc-reach))) contrast(calc(var(--pc-reach) + 2)) saturate(calc(0.5 + var(--pc-reach)))',
  mixBlendMode: 'luminosity',
  opacity: 'calc(var(--pc-active) * var(--pc-holo-detail))'
};

const SHIFT_STYLE = {
  backgroundImage: `${SPECTRUM}, ${BARS}, ${FALLOFF}`,
  backgroundPosition: '0 var(--pc-band-y), calc(var(--pc-band-x) * 0.4) calc(var(--pc-band-y) * 0.5), center',
  backgroundSize: '200% 300%, 700% 700%, 100% 100%',
  backgroundBlendMode: 'color, hard-light',
  mixBlendMode: 'difference',
  filter: 'brightness(0.8) contrast(1.5)',
  opacity: 'calc(var(--pc-active) * var(--pc-holo-detail))'
};

const PHOTO_STYLE = {
  inset: 'calc(var(--pc-parallax) * -1)',
  width: 'calc(100% + var(--pc-parallax) * 2)',
  height: 'calc(100% + var(--pc-parallax) * 2)',
  transform: 'translate3d(var(--pc-shift-x), var(--pc-shift-y), 0)'
};

const SCRIM_STYLE = {
  background:
    'linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.57) 6%, rgba(0, 0, 0, 0.5) 12%, rgba(0, 0, 0, 0.4) 19%, rgba(0, 0, 0, 0.28) 26%, rgba(0, 0, 0, 0.16) 33%, rgba(0, 0, 0, 0.07) 40%, rgba(0, 0, 0, 0.02) 46%, rgba(0, 0, 0, 0) 52%)'
};

const GLARE_STYLE = {
  background:
    'radial-gradient(farthest-corner circle at var(--pc-light-x) var(--pc-light-y), rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.36) 20%, rgba(255, 255, 255, 0) 60%)',
  opacity: 'calc(var(--pc-glare) * var(--pc-active))'
};

const SHADE_STYLE = {
  background:
    'radial-gradient(farthest-corner circle at var(--pc-light-x) var(--pc-light-y), transparent 30%, var(--pc-shade) 100%)',
  opacity: 'calc(var(--pc-glare) * var(--pc-tilt))'
};

const ROOT = 'relative w-[280px] max-w-full touch-pan-y [perspective:1000px] [-webkit-tap-highlight-color:transparent]';
const BODY =
  'relative flex flex-col gap-[10px] rounded-[calc(var(--pc-radius)+10px)] p-[10px] backdrop-blur-[20px] backdrop-saturate-[1.6] will-change-transform [background:var(--pc-frame)] [box-shadow:var(--pc-frame-shadow)] [transform:rotateX(var(--pc-rotate-x))_rotateY(var(--pc-rotate-y))]';
const TILE =
  'relative isolate aspect-[4/5] overflow-hidden rounded-[var(--pc-radius)] [background:var(--pc-backdrop)] [box-shadow:var(--pc-tile-shadow)]';
const LAYER = 'pointer-events-none absolute inset-0 rounded-[inherit]';
const HOLO = `${LAYER} [mix-blend-mode:var(--pc-blend)]`;
const HOLO_LAYER = 'absolute inset-0';
const PHOTO = 'pointer-events-none absolute select-none object-cover object-[50%_15%]';
const INFO = 'absolute bottom-[18px] left-5 right-5 text-white';
const NAME = 'm-0 text-[20px] font-semibold leading-[1.25] tracking-[-0.01em] text-[inherit]';
const TITLE = 'mx-0 mb-0 mt-1 text-[14px] leading-[1.45] text-white/78';
const TILE_RIM = `${LAYER} [box-shadow:inset_0_0_0_1px_var(--pc-tile-edge),inset_0_1px_0_var(--pc-tile-highlight)]`;
const FOOTER = 'flex min-w-0 items-center gap-3 px-5 pb-2 pt-1.5';
const AVATAR =
  "relative h-9 w-9 flex-none overflow-hidden rounded-full [background:var(--pc-tile)] after:absolute after:inset-0 after:rounded-[inherit] after:content-[''] after:[box-shadow:inset_0_0_0_1px_var(--pc-tile-edge)]";
const AVATAR_IMAGE = 'block h-full w-full object-cover object-top';
const META = 'flex min-w-0 flex-1 flex-col gap-[3px]';
const HANDLE =
  'overflow-hidden text-ellipsis whitespace-nowrap text-[14px] font-semibold leading-[1.25] text-[var(--pc-ink)]';
const STATUS =
  "flex items-center gap-1.5 whitespace-nowrap text-[12.5px] leading-[1.25] text-[var(--pc-muted)] before:h-1.5 before:w-1.5 before:flex-none before:rounded-full before:bg-[var(--pc-status)] before:content-['']";
const CONTACT =
  'flex h-9 flex-none cursor-pointer items-center gap-1.5 rounded-[calc(var(--pc-radius)*0.75)] border-none px-3.5 font-[inherit] text-[13px] font-semibold text-[var(--pc-ink)] [background:var(--pc-tile)] [box-shadow:inset_0_0_0_1px_var(--pc-tile-edge),inset_0_1px_0_var(--pc-tile-highlight),var(--pc-tile-shadow)] transition-[filter,transform] duration-200 hover:[filter:var(--pc-hover)] active:scale-[0.96] active:duration-0 active:[filter:var(--pc-press)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--pc-ink)]';
const GLARE = `${LAYER} mix-blend-overlay`;
const RIM = `${LAYER} [box-shadow:inset_0_0_0_1px_var(--pc-frame-edge),inset_0_1px_0_var(--pc-frame-highlight)]`;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const isDark = color => {
  const match = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(String(color).trim());
  if (!match) return null;
  const hex = match[1].length === 3 ? match[1].replace(/./g, digit => digit + digit) : match[1];
  const [r, g, b] = [0, 2, 4].map(index => parseInt(hex.slice(index, index + 2), 16) / 255);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 0.5;
};

const ProfileCard = ({
  avatarUrl = defaultProfile,
  iconUrl = '/assets/demo/code-svgrepo-com.svg',
  patternSize = '100% 100%',
  patternRepeat = 'no-repeat',
  miniAvatarUrl,
  name = 'Clynten Palad',
  title = 'Software Engineer',
  handle = 'javicodes',
  status = 'Online',
  statusColor = '#22c55e',
  contactText = 'Contact',
  showUserInfo = true,
  onContactClick,
  theme = 'dark',
  backdropColor,
  radius = 16,
  holo = 0.8,
  glare = 0.6,
  tiltStrength = 24,
  parallax = 0,
  enableTilt = true,
  intro = true,
  showUserInfo: showInfoProp = true,
  enableMobileTilt = false,
  mobileTiltSensitivity = 5,
  className = ''
}) => {
  const rootRef = useRef(null);
  const engineRef = useRef(null);
  const settings = { enableTilt, tiltStrength, parallax, mobileTiltSensitivity, intro };
  const settingsRef = useRef(settings);
  settingsRef.current = settings;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const size = { width: root.offsetWidth || 340, height: root.offsetHeight || 480 };
    const x = { p: 0, v: 0, target: 0 };
    const y = { p: 0, v: 0, target: 0 };
    const light = { p: 0, target: 0 };
    let raf = 0;
    let last = 0;
    let slowUntil = 0;
    let touchId = null;

    const write = () => {
      const { enableTilt: tiltOn, tiltStrength: strength, parallax: depth } = settingsRef.current;
      const angle = tiltOn && !reduced ? strength : 0;
      const tilt = Math.min(1, Math.hypot(x.p, y.p));
      const style = root.style;
      style.setProperty('--pc-light-x', `${((x.p + 1) * 0.5 * size.width).toFixed(1)}px`);
      style.setProperty('--pc-light-y', `${((y.p + 1) * 0.5 * size.height).toFixed(1)}px`);
      style.setProperty('--pc-pointer-x', `${((x.p + 1) * 50).toFixed(2)}%`);
      style.setProperty('--pc-pointer-y', `${((y.p + 1) * 50).toFixed(2)}%`);
      style.setProperty('--pc-band-x', `${(50 + x.p * 15).toFixed(2)}%`);
      style.setProperty('--pc-band-y', `${(50 + y.p * 15).toFixed(2)}%`);
      style.setProperty('--pc-rotate-x', `${(y.p * angle).toFixed(3)}deg`);
      style.setProperty('--pc-rotate-y', `${(-x.p * angle).toFixed(3)}deg`);
      style.setProperty('--pc-shift-x', `${(x.p * (reduced ? 0 : depth)).toFixed(2)}px`);
      style.setProperty('--pc-shift-y', `${(y.p * (reduced ? 0 : depth)).toFixed(2)}px`);
      style.setProperty('--pc-reach', tilt.toFixed(4));
      style.setProperty('--pc-tilt', (tilt * light.p).toFixed(4));
      style.setProperty('--pc-active', light.p.toFixed(4));
    };

    const frame = now => {
      const dt = Math.min(0.05, (now - last) / 1000 || 0);
      last = now;
      const slow = now < slowUntil;
      const stiffness = slow ? 24 : 120;
      const damping = slow ? 9 : 16;
      const steps = Math.max(1, Math.ceil(dt / (1 / 120)));
      const h = dt / steps;
      for (let i = 0; i < steps; i++) {
        for (const axis of [x, y]) {
          axis.v += (stiffness * (axis.target - axis.p) - damping * axis.v) * h;
          axis.p += axis.v * h;
        }
      }
      const tau = light.target > light.p ? 0.18 : slow ? 0.9 : 0.45;
      light.p += (light.target - light.p) * (1 - Math.exp(-dt / tau));
      write();
      const moving =
        Math.abs(x.target - x.p) > 0.0005 ||
        Math.abs(y.target - y.p) > 0.0005 ||
        Math.abs(x.v) > 0.0005 ||
        Math.abs(y.v) > 0.0005 ||
        Math.abs(light.target - light.p) > 0.002;
      if (moving) {
        raf = requestAnimationFrame(frame);
      } else {
        x.p = x.target;
        y.p = y.target;
        light.p = light.target;
        write();
        raf = 0;
      }
    };

    const wake = () => {
      if (raf) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };

    const aim = (nx, ny, on = true) => {
      x.target = clamp(nx, -1, 1);
      y.target = clamp(ny, -1, 1);
      light.target = on ? 1 : 0;
      slowUntil = 0;
      wake();
    };

    const aimAt = event => {
      const rect = root.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      aim(((event.clientX - rect.left) / rect.width) * 2 - 1, ((event.clientY - rect.top) / rect.height) * 2 - 1);
    };

    const release = () => aim(0, 0, false);

    const onEnter = event => {
      if (event.pointerType === 'mouse') aimAt(event);
    };
    const onMove = event => {
      if (event.pointerType === 'mouse' || event.pointerId === touchId) aimAt(event);
    };
    const onLeave = event => {
      if (event.pointerType === 'mouse') release();
    };
    const onDown = event => {
      if (event.pointerType === 'mouse') return;
      touchId = event.pointerId;
      aimAt(event);
    };
    const onUp = event => {
      if (event.pointerId !== touchId) return;
      touchId = null;
      release();
    };

    root.addEventListener('pointerenter', onEnter);
    root.addEventListener('pointermove', onMove);
    root.addEventListener('pointerleave', onLeave);
    root.addEventListener('pointerdown', onDown);
    root.addEventListener('pointerup', onUp);
    root.addEventListener('pointercancel', onUp);

    const observer = new ResizeObserver(() => {
      size.width = root.offsetWidth;
      size.height = root.offsetHeight;
      write();
    });
    observer.observe(root);

    engineRef.current = { aim, release, write };

    if (settingsRef.current.intro && !reduced) {
      x.p = 0.62;
      y.p = -0.55;
      light.p = 1;
      slowUntil = performance.now() + 1400;
      write();
      wake();
    } else {
      write();
    }

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      root.removeEventListener('pointerenter', onEnter);
      root.removeEventListener('pointermove', onMove);
      root.removeEventListener('pointerleave', onLeave);
      root.removeEventListener('pointerdown', onDown);
      root.removeEventListener('pointerup', onUp);
      root.removeEventListener('pointercancel', onUp);
      engineRef.current = null;
    };
  }, []);

  useEffect(() => {
    engineRef.current?.write();
  }, [enableTilt, tiltStrength, parallax]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !enableMobileTilt) return;

    let listening = false;
    const onOrientation = event => {
      if (event.beta == null || event.gamma == null) return;
      const sensitivity = settingsRef.current.mobileTiltSensitivity;
      engineRef.current?.aim((event.gamma * sensitivity) / 150, ((event.beta - 20) * sensitivity) / 150);
    };
    const listen = () => {
      if (listening) return;
      listening = true;
      window.addEventListener('deviceorientation', onOrientation);
    };
    const onClick = () => {
      const Motion = window.DeviceOrientationEvent;
      if (Motion && typeof Motion.requestPermission === 'function') {
        Motion.requestPermission()
          .then(state => {
            if (state === 'granted') listen();
          })
          .catch(() => { });
      } else {
        listen();
      }
    };

    root.addEventListener('click', onClick);
    return () => {
      root.removeEventListener('click', onClick);
      window.removeEventListener('deviceorientation', onOrientation);
    };
  }, [enableMobileTilt]);

  const palette = theme === 'light' ? 'light' : 'dark';
  const foil = backdropColor ? ((isDark(backdropColor) ?? palette === 'dark') ? 'dark' : 'light') : palette;
  const backdrop = backdropColor
    ? `linear-gradient(180deg, color-mix(in srgb, ${backdropColor}, #ffffff 12%) 0%, color-mix(in srgb, ${backdropColor}, #000000 18%) 100%)`
    : 'var(--pc-tile)';

  // Handle avatar fallback to profile.webp if placeholder is provided
  const resolvedAvatar = (!avatarUrl || avatarUrl === '/path/to/portrait.png') ? defaultProfile : avatarUrl;
  const resolvedMini = (!miniAvatarUrl || miniAvatarUrl === '/path/to/portrait.png') ? resolvedAvatar : miniAvatarUrl;
  const patternUrl = iconUrl ? `url("${iconUrl}")` : `url("${DEFAULT_PATTERN}")`;

  return (
    <div
      ref={rootRef}
      className={`${ROOT} ${className}`.trim()}
      style={{
        ...ROOT_VARS,
        ...THEMES[palette],
        ...FOILS[foil],
        '--pc-radius': `${Math.max(0, radius)}px`,
        '--pc-backdrop': backdrop,
        '--pc-holo': clamp(holo, 0, 1),
        '--pc-glare': clamp(glare, 0, 1),
        '--pc-parallax': `${Math.max(0, parallax)}px`,
        '--pc-status': statusColor,
        '--pc-grain': GRAIN,
        '--pc-pattern': patternUrl,
        '--pc-pattern-size': patternSize,
        '--pc-pattern-repeat': patternRepeat,
        '--pc-holo-gain': iconUrl ? 1.25 : 0.75,
        '--pc-holo-detail': iconUrl && foil === 'dark' ? 1 : 0
      }}
    >
      <div className={BODY}>
        <div className={TILE}>
          <span className={LAYER} style={SHEEN_STYLE} />
          <span className={HOLO} style={HOLO_STYLE}>
            <span className={HOLO_LAYER} style={GLOW_STYLE} />
            <span className={HOLO_LAYER} style={SHIFT_STYLE} />
          </span>
          {resolvedAvatar && (
            <img
              className={PHOTO}
              style={PHOTO_STYLE}
              src={resolvedAvatar}
              alt={name || ''}
              loading="lazy"
              draggable={false}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = defaultProfile;
              }}
            />
          )}
          {(name || title) && (
            <>
              <span className={LAYER} style={SCRIM_STYLE} />
              <div className={INFO}>
                {name && <h3 className={NAME}>{name}</h3>}
                {title && <p className={TITLE}>{title}</p>}
              </div>
            </>
          )}
          <span className={TILE_RIM} />
        </div>

        {showUserInfo && (
          <div className="px-1.5 pt-1 pb-1">
            <button
              type="button"
              onClick={onContactClick}
              className={`group w-full flex items-center gap-3 p-2 rounded-xl border transition-all duration-200 cursor-pointer text-left ${
                theme === 'light'
                  ? 'bg-rose-50/80 hover:bg-rose-100/90 border-rose-200/90 shadow-sm hover:shadow-md hover:border-rose-300'
                  : 'bg-gradient-to-r from-[#2c0d13]/95 via-[#22090e]/95 to-[#170509]/95 hover:from-[#381119] hover:via-[#2a0c12] hover:to-[#1e070c] border-rose-500/25 hover:border-rose-500/50 shadow-[0_4px_16px_rgba(0,0,0,0.45)] hover:shadow-[0_6px_20px_rgba(244,63,94,0.3)]'
              }`}
              aria-label={contactText || "Let's Connect"}
            >
              {resolvedMini && (
                <div className="relative w-10 h-10 flex-none overflow-hidden rounded-lg border border-white/15 shadow-inner bg-black/40">
                  <img
                    className="w-full h-full object-cover object-top"
                    src={resolvedMini}
                    alt={name || 'Clynten Palad'}
                    loading="lazy"
                    draggable={false}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = defaultProfile;
                    }}
                  />
                </div>
              )}

              <div className="flex flex-col min-w-0 flex-1 justify-center">
                {/* Status Row: ONLINE + Red Glowing Dot */}
                <div className="flex items-center gap-1.5">
                  <span
                    className={`font-mono text-[11px] font-extrabold tracking-wider uppercase leading-none ${
                      theme === 'light' ? 'text-rose-600' : 'text-white'
                    }`}
                  >
                    {status || 'ONLINE'}
                  </span>
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500 shadow-[0_0_8px_#f43f5e]" />
                  </span>
                </div>

                {/* Connect Text */}
                <div className="flex items-center justify-between mt-0.5">
                  <span
                    className={`text-[15px] font-bold tracking-tight leading-tight ${
                      theme === 'light' ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    {contactText || "Let's Connect"}
                  </span>
                  <span
                    className="text-rose-400 text-sm font-bold opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200 mr-1"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </div>
              </div>
            </button>
          </div>
        )}

        <span className={GLARE} style={GLARE_STYLE} />
        <span className={LAYER} style={SHADE_STYLE} />
        <span className={RIM} />
      </div>
    </div>
  );
};

export default memo(ProfileCard);
