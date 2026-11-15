import { useRef } from 'react'
import { motion, useScroll, useVelocity, useSpring, useTransform, useMotionValue, useAnimationFrame } from 'motion/react'

const wrap = (min, max, v) => { const r = max - min; return ((((v - min) % r) + r) % r) + min }

// Endless text band. It speeds up and flips direction with your scroll.
export default function VelocityMarquee({ items, baseVelocity = -3, dark = false }) {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 })
  const factor = useTransform(velocity, [0, 1000], [0, 5], { clamp: false })
  const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`)
  const dir = useRef(1)

  useAnimationFrame((_, delta) => {
    let move = dir.current * baseVelocity * (delta / 1000)
    if (factor.get() < 0) dir.current = -1
    else if (factor.get() > 0) dir.current = 1
    move += dir.current * move * factor.get()
    baseX.set(baseX.get() + move)
  })

  const row = (
    <span className="flex shrink-0 items-center">
      {items.map((t, i) => (
        <span key={i} className="flex items-center">
          <span className="px-6 font-display text-4xl uppercase md:text-6xl">{t}</span>
          <span className={`h-4 w-4 rotate-45 ${dark ? 'bg-flare' : 'bg-ink'}`} />
        </span>
      ))}
    </span>
  )
  return (
    <div className={`overflow-hidden py-6 ${dark ? 'bg-ink text-white' : 'bg-flare text-ink'}`} aria-hidden="true">
      <motion.div className="flex whitespace-nowrap" style={{ x }}>{row}{row}{row}{row}</motion.div>
    </div>
  )
}
