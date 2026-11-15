import { NavLink, Link } from '../lib/router'
import { useState } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react'
import Flame from './Flame'
import Button from './Button'

const links = [
  { to: '/', label: 'Launch' },
  { to: '/offer', label: 'Offer' },
  { to: '/waitlist', label: 'Waitlist' },
  { to: '/banners', label: 'Ad banners' },
]

export default function Nav() {
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()

  // Hide the bar while scrolling down, show it again on the way up.
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setHidden(y > prev && y > 160 && !open)
  })

  return (
    <motion.header
      animate={{ y: hidden ? '-110%' : 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="fixed inset-x-0 top-0 z-50 border-b border-ink/10 bg-white/90 backdrop-blur"
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8" aria-label="Main">
        <Link to="/" className="flex items-center gap-2 font-display text-2xl tracking-tight text-ink">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-flare"><Flame className="h-5 w-5" fill="#0B1F3A" /></span>
          FLARE
        </Link>
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink to={l.to} end className={({ isActive }) => `relative rounded-full px-4 py-2 text-sm font-semibold transition-colors ${isActive ? 'text-ink' : 'text-ink-soft hover:text-ink'}`}>
                {({ isActive }) => (
                  <>
                    {isActive && <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-flare-soft" transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }} />}
                    {l.label}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="hidden md:block"><Button to="/offer" event="nav_buy" className="!px-5 !py-2.5 text-sm">Buy now</Button></div>
        <button onClick={() => setOpen((o) => !o)} className="grid h-10 w-10 place-items-center rounded-full border-2 border-ink md:hidden" aria-expanded={open} aria-label="Toggle menu">
          <span className="relative block h-3 w-5">
            <motion.span animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }} className="absolute left-0 top-0 h-0.5 w-5 bg-ink" />
            <motion.span animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }} className="absolute bottom-0 left-0 h-0.5 w-5 bg-ink" />
          </span>
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.ul initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden bg-white md:hidden">
            {links.map((l, i) => (
              <motion.li key={l.to} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                <NavLink to={l.to} end onClick={() => setOpen(false)} className="block border-t border-ink/10 px-5 py-4 font-display text-2xl">{l.label}</NavLink>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
