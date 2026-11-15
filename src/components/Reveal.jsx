import { motion } from 'motion/react'

// Fades and lifts children into view once.
export default function Reveal({ children, delay = 0, y = 40, x = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

// Splits a line into words that slide up from a mask, one after another.
export function SplitHeading({ words, className = '', wordClass = () => '', delay = 0 }) {
  return (
    <h1 className={className}>
      {words.map((w, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className={`block ${wordClass(i)}`}
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: delay + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </h1>
  )
}
