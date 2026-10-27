/**
 * Static contact channels, metadata, and social links
 * Isolated to prevent re-renders on form keystrokes
 */
export const CONTACT_METADATA = {
  badge: 'TRANSMISSION // CONTACT',
  title: "Let's Build Something Exceptional",
  description:
    'Whether you have a question about system architecture, freelance engineering, product design, or just want to connect — our channels are always open.',
}

export const CONTACT_CHANNELS = [
  {
    id: 'phone',
    type: 'Telephone',
    value: '(+62) 821-9080-3358',
    href: 'tel:+6282190803358',
    subText: 'Available Mon - Fri, 09:00 - 18:00 WITA',
    icon: 'phone',
  },
  {
    id: 'location',
    type: 'Location',
    value: 'Makassar, Indonesia',
    href: 'https://maps.google.com/?q=Makassar,+South+Sulawesi,+Indonesia',
    subText: 'South Sulawesi (UTC+8 / WITA)',
    icon: 'location',
  },
  {
    id: 'email',
    type: 'Email',
    value: 'billiampalad@gmail.com',
    href: 'mailto:billiampalad@gmail.com',
    subText: 'Typical response time: < 24 hours',
    icon: 'email',
  },
]

export const SOCIAL_LINKS = [
  {
    name: 'GitHub',
    handle: '@billiampalad',
    href: 'https://github.com/billiampalad',
  },
  {
    name: 'LinkedIn',
    handle: 'Clynten Billiam Palad',
    href: 'https://linkedin.com/in/billiampalad',
  },
]
