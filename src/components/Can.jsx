// Flat SVG drink can. Solid fills only, no gradients.
export default function Can({ body = '#FF5A1F', band = '#0B1F3A', ink = '#FFFFFF', label = 'ORIGINAL', className = '' }) {
  return (
    <svg viewBox="0 0 200 380" className={className} role="img" aria-label={`FLARE ${label} can`}>
      <rect x="40" y="10" width="120" height="16" rx="8" fill="#C9CED6" />
      <rect x="70" y="4" width="60" height="10" rx="5" fill="#AEB4BE" />
      <path d="M44 24h112l12 24v284l-12 24H44l-12-24V48z" fill={body} />
      <rect x="32" y="160" width="136" height="104" fill={band} />
      <path d="M100 66c12 20 28 28 24 48-3 16-14 24-24 24-12 0-24-9-24-24 0-12 10-18 14-28 4 10 8 14 10 16 2-10-2-22 0-36z" fill={band} />
      <path d="M100 104c5 8 11 12 9 20-1 6-5 9-9 9-5 0-9-4-9-9 0-5 4-7 6-11 1 4 3 5 3 6 1-4-1-9 0-15z" fill={body} />
      <text x="100" y="222" textAnchor="middle" fontFamily="Archivo Black, sans-serif" fontSize="40" textLength="118" lengthAdjust="spacingAndGlyphs" fill={ink}>FLARE</text>
      <text x="100" y="248" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="11" letterSpacing="4" fill={ink}>{label}</text>
      <rect x="46" y="56" width="9" height="270" rx="4.5" fill="#FFFFFF" opacity=".22" />
      <text x="100" y="306" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="9" textLength="104" lengthAdjust="spacingAndGlyphs" fill={band} opacity=".85">0 SUGAR · 150MG CAFFEINE</text>
      <rect x="40" y="352" width="120" height="14" rx="7" fill="#C9CED6" />
    </svg>
  )
}

export const FLAVORS = [
  { name: 'Original Ember', note: 'Blood orange and a hint of chilli', label: 'ORIGINAL', body: '#FF5A1F', band: '#0B1F3A', ink: '#FFFFFF' },
  { name: 'Midnight Mango', note: 'Ripe mango, lime zest, dark berry', label: 'MIDNIGHT', body: '#0B1F3A', band: '#FF5A1F', ink: '#0B1F3A' },
  { name: 'White Heat', note: 'Yuzu, ginger and sparkling salt', label: 'WHITE HEAT', body: '#F5F6F8', band: '#FF5A1F', ink: '#0B1F3A' },
  { name: 'Afterburn', note: 'Passion fruit with smoked pineapple', label: 'AFTERBURN', body: '#FF5A1F', band: '#FFFFFF', ink: '#0B1F3A' },
]
