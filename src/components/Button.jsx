import { Link } from '../lib/router'
import { motion } from 'motion/react'
import { track } from '../lib/track'

const MLink = motion.create(Link)
const styles = {
  primary: 'bg-flare text-ink hover:bg-ink hover:text-white',
  dark: 'bg-ink text-white hover:bg-flare hover:text-ink',
  ghost: 'border-2 border-ink text-ink hover:bg-ink hover:text-white',
  light: 'bg-white text-ink hover:bg-flare',
}

export default function Button({ to, children, variant = 'primary', event, className = '', ...rest }) {
  const cls = `inline-flex items-center gap-2 rounded-full px-7 py-4 text-base font-bold transition-colors duration-300 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-flare ${styles[variant]} ${className}`
  const onClick = () => event && track('cta_click', { cta: event })
  const anim = { whileHover: { scale: 1.04 }, whileTap: { scale: 0.96 } }
  if (to) return <MLink to={to} className={cls} onClick={onClick} {...anim} {...rest}>{children}<Arrow /></MLink>
  return <motion.button className={cls} onClick={onClick} {...anim} {...rest}>{children}</motion.button>
}

const Arrow = () => (
  <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true"><path d="M4 10h11m-4-5 5 5-5 5" stroke="currentColor" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
)
