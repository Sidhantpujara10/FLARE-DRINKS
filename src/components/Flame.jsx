export default function Flame({ className = 'h-5 w-5', fill = 'currentColor' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill={fill} d="M12 2c1.6 3.6 5 5.4 5 9.6A5 5 0 0 1 12 17a5 5 0 0 1-5-5.2c0-2.6 1.7-3.8 2.6-6 .8 2 1.7 2.8 2.2 3.2.5-2.2-.4-4.6.2-7z" />
      <rect x="6" y="19" width="12" height="2.4" rx="1.2" fill={fill} />
    </svg>
  )
}
