import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

// Pinned paragraph whose words light up one by one as you scroll.
// Wrap a word in *stars* to make it orange.
export default function ScrollText({ text, eyebrow }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const words = text.split(' ')
  return (
    <section ref={ref} className="relative h-[260vh] bg-white">
      <div className="sticky top-0 flex h-screen items-center">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          {eyebrow && <p className="mb-6 text-sm font-bold uppercase tracking-[0.3em] text-flare-deep">{eyebrow}</p>}
          <p className="font-display text-4xl leading-[1.08] tracking-tight md:text-7xl">
            {words.map((w, i) => {
              const start = i / words.length
              return <Word key={i} word={w} progress={scrollYProgress} range={[start, start + 1 / words.length]} />
            })}
          </p>
        </div>
      </div>
    </section>
  )
}

function Word({ word, progress, range }) {
  const opacity = useTransform(progress, range, [0.12, 1])
  const y = useTransform(progress, range, [12, 0])
  const hot = word.startsWith('*')
  const clean = word.replaceAll('*', '')
  return (
    <motion.span style={{ opacity, y }} className={`mr-[0.25em] inline-block ${hot ? 'text-flare' : 'text-ink'}`}>
      {clean}
    </motion.span>
  )
}
