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
    value: '(+62) 895-4107-03377',
    href: 'tel:+62895410703377',
    subText: 'Available Mon - Sun, 09:00 - 21:00 WITA',
    icon: 'phone',
  },
  {
    id: 'location',
    type: 'Location',
    value: 'Manado, Indonesia',
    href: 'https://maps.google.com/?q=Manado,+North+Sulawesi,+Indonesia',
    subText: 'North Sulawesi (UTC+8 / WITA)',
    icon: 'location',
  },
  {
    id: 'email',
    type: 'Email',
    value: 'billiamclynten@gmail.com',
    href: 'https://mail.google.com/mail/?view=cm&fs=1&to=billiamclynten@gmail.com&su=Project%20Inquiry%20/%20Collaboration',
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
    href: 'https://www.linkedin.com/in/clynten-palad-915a41432',
  },
]
