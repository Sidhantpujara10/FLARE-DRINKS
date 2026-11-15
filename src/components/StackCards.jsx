import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

// Cards pin on top of each other; the ones underneath shrink back as you scroll.
export default function StackCards({ cards }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  return (
    <div ref={ref} className="relative">
      {cards.map((c, i) => (
        <Card key={i} i={i} total={cards.length} progress={scrollYProgress} {...c} />
      ))}
    </div>
  )
}

const tones = [
  'bg-ink text-white',
  'bg-flare text-ink',
  'bg-white text-ink border-2 border-ink',
  'bg-mist text-ink',
]

function Card({ i, total, progress, title, body, stat, statLabel }) {
  const target = 1 - (total - i) * 0.05
  const scale = useTransform(progress, [i / total, 1], [1, target])
  return (
    <div className="sticky top-0 flex h-screen items-center justify-center px-5">
      <motion.article
        style={{ scale, top: `calc(-6vh + ${i * 28}px)` }}
        className={`relative grid w-full max-w-5xl origin-top gap-8 rounded-[2rem] p-8 md:grid-cols-[1.4fr_1fr] md:p-14 ${tones[i % tones.length]}`}
      >
        <div>
          <p className="font-display text-sm tracking-[0.3em] opacity-70">0{i + 1} / 0{total}</p>
          <h3 className="mt-4 font-display text-4xl leading-none md:text-6xl">{title}</h3>
          <p className="mt-6 max-w-md text-lg opacity-80">{body}</p>
        </div>
        <div className="flex flex-col justify-end md:items-end">
          <p className="font-display text-7xl leading-none md:text-9xl">{stat}</p>
          <p className="mt-2 font-semibold opacity-80">{statLabel}</p>
        </div>
      </motion.article>
    </div>
  )
}
