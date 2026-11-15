import { useRef } from 'react'
import { useSearchParams } from '../lib/router'
import { motion, useScroll, useTransform, useSpring } from 'motion/react'
import Can, { FLAVORS } from '../components/Can'
import Button from '../components/Button'
import Reveal, { SplitHeading } from '../components/Reveal'
import ScrollText from '../components/ScrollText'
import VelocityMarquee from '../components/VelocityMarquee'
import HorizontalScroll from '../components/HorizontalScroll'
import StackCards from '../components/StackCards'
import Counter from '../components/Counter'
import { getVariant, VARIANTS } from '../lib/ab'

export default function Launch() {
  const [params] = useSearchParams()
  const v = VARIANTS[getVariant(params)]
  return (
    <>
      <Hero v={v} />
      <VelocityMarquee items={['Zero sugar', '150mg caffeine', 'No crash', 'Real fruit', 'Sparkling']} />
      <ScrollText
        eyebrow="Why FLARE"
        text="Most energy drinks spike you, then *drop* you. FLARE releases caffeine slowly with green tea and B vitamins, so the *fire* lasts all afternoon and you still sleep at night."
      />
      <Stats />
      <Flavors />
      <section className="bg-white pt-24">
        <Reveal className="mx-auto max-w-7xl px-5 md:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-flare-deep">What's inside</p>
          <h2 className="mt-3 max-w-3xl font-display text-5xl leading-none tracking-tight md:text-7xl">Four reasons it feels different.</h2>
        </Reveal>
        <StackCards
          cards={[
            { title: 'Slow release caffeine', body: '150mg from green coffee and L theanine. Smooth lift, no jitters, no 4pm wall.', stat: '6h', statLabel: 'steady focus' },
            { title: 'Zero sugar. Really.', body: 'Sweetened with monk fruit and stevia. Nothing artificial, nothing to burn off later.', stat: '0g', statLabel: 'sugar per can' },
            { title: 'Real fruit flavor', body: 'Cold pressed fruit extracts instead of syrups. You can taste the difference in the first sip.', stat: '4', statLabel: 'launch flavors' },
            { title: 'Infinitely recyclable', body: 'Aluminium cans and plastic free packs. The can you finish today can be back on a shelf in 60 days.', stat: '100%', statLabel: 'recyclable pack' },
          ]}
        />
      </section>
      <FinalCta v={v} />
    </>
  )
}

function Hero({ v }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 28 })
  const canRotate = useTransform(p, [0, 1], [-10, 28])
  const canY = useTransform(p, [0, 1], [0, 260])
  const canScale = useTransform(p, [0, 1], [1, 1.25])
  const textY = useTransform(p, [0, 1], [0, -160])
  const textOpacity = useTransform(p, [0, 0.7], [1, 0])
  const bigWordX = useTransform(p, [0, 1], ['0%', '-30%'])

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden bg-white pt-24">
      {/* giant outline word that drifts sideways on scroll */}
      <motion.p style={{ x: bigWordX }} aria-hidden="true" className="text-outline-flare pointer-events-none absolute bottom-6 left-0 whitespace-nowrap font-display text-[28vw] leading-none opacity-40">
        FLARE FLARE
      </motion.p>

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 md:grid-cols-2 md:px-8">
        <motion.div style={{ y: textY, opacity: textOpacity }}>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 rounded-full bg-flare-soft px-4 py-2 text-sm font-bold text-flare-deep">
            <span className="anim-pulse h-2 w-2 rounded-full bg-flare" /> {v.kicker}
          </motion.p>
          <SplitHeading
            words={v.headline}
            delay={0.15}
            className="mt-6 font-display text-6xl leading-[0.92] tracking-tight md:text-8xl"
            wordClass={(i) => (i === v.headline.length - 1 ? 'text-flare' : 'text-ink')}
          />
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="mt-6 max-w-md text-lg text-ink-soft">
            Sparkling energy with real fruit, zero sugar and slow release caffeine. Launching across Pune this month.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }} className="mt-8 flex flex-wrap gap-4">
            <Button to="/waitlist" event={`hero_${v.cta}`}>{v.cta}</Button>
            <Button to="/offer" variant="ghost" event="hero_offer">See launch offer</Button>
          </motion.div>
        </motion.div>

        <div className="relative flex h-[70vh] items-center justify-center">
          <motion.div initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', bounce: 0.35, duration: 1.2, delay: 0.3 }} className="absolute h-[52vh] w-[52vh] max-h-[460px] max-w-[460px] rounded-full bg-flare" />
          <Sparks />
          <motion.div style={{ rotate: canRotate, y: canY, scale: canScale }} className="relative">
            <motion.div animate={{ y: [0, -16, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
              <Can className="h-[58vh] max-h-[520px] w-auto" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div style={{ opacity: textOpacity }} className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-ink-soft md:flex">
        Scroll
        <span className="relative h-10 w-6 rounded-full border-2 border-ink">
          <motion.span animate={{ y: [4, 18, 4] }} transition={{ duration: 1.6, repeat: Infinity }} className="absolute left-1/2 h-2 w-1 -translate-x-1/2 rounded-full bg-flare" />
        </span>
      </motion.div>
    </section>
  )
}

function Sparks() {
  const dots = [[-180, -140, 14], [170, -170, 10], [200, 90, 16], [-200, 120, 10], [-90, 220, 8], [120, 230, 12]]
  return dots.map(([x, y, s], i) => (
    <motion.span
      key={i}
      className={`absolute rounded-full ${i % 2 ? 'bg-ink' : 'bg-flare'}`}
      style={{ width: s, height: s }}
      initial={{ x: 0, y: 0, opacity: 0 }}
      animate={{ x, y: [y, y - 18, y], opacity: 1 }}
      transition={{ x: { duration: 1, delay: 0.6 + i * 0.05 }, opacity: { delay: 0.6 }, y: { duration: 3 + i * 0.3, repeat: Infinity, ease: 'easeInOut' } }}
    />
  ))
}

function Stats() {
  const items = [
    { to: 150, suffix: 'mg', label: 'slow release caffeine' },
    { to: 0, suffix: 'g', label: 'sugar, always' },
    { to: 12000, suffix: '+', label: 'people on the waitlist' },
    { to: 10, suffix: ' kcal', label: 'per 330ml can' },
  ]
  return (
    <section className="bg-mist py-24">
      <div className="mx-auto grid max-w-7xl gap-px overflow-hidden rounded-3xl bg-ink/10 px-0 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1} className="bg-white p-10">
            <p className="font-display text-6xl text-ink"><Counter to={s.to} suffix={s.suffix} /></p>
            <p className="mt-3 font-semibold text-ink-soft">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Flavors() {
  return (
    <div className="bg-ink">
      <HorizontalScroll heightVh={340}>
        {(progress) => (
          <>
            <div className="flex w-[80vw] shrink-0 flex-col justify-center text-white md:w-[34vw]">
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-flare">The lineup</p>
              <h2 className="mt-4 font-display text-6xl leading-none md:text-8xl">Pick your fire.</h2>
              <p className="mt-6 max-w-sm text-white/70">Four launch flavors. Keep scrolling to meet them all.</p>
            </div>
            {FLAVORS.map((f, i) => <FlavorCard key={f.name} f={f} i={i} progress={progress} />)}
          </>
        )}
      </HorizontalScroll>
    </div>
  )
}

function FlavorCard({ f, i, progress }) {
  const rotate = useTransform(progress, [0, 1], [i % 2 ? 14 : -14, i % 2 ? -14 : 14])
  const cardBg = ['bg-flare', 'bg-white', 'bg-flare-soft', 'bg-white'][i]
  return (
    <article className={`relative flex h-[72vh] w-[80vw] shrink-0 flex-col justify-between overflow-hidden rounded-[2rem] p-8 md:w-[30vw] ${cardBg}`}>
      <div className="flex items-start justify-between">
        <p className="font-display text-sm tracking-[0.3em] text-ink/60">0{i + 1}</p>
        <span className="rounded-full bg-ink px-3 py-1 text-xs font-bold text-white">330 ml</span>
      </div>
      <motion.div style={{ rotate }} className="mx-auto">
        <Can {...f} className="h-[38vh] w-auto" />
      </motion.div>
      <div>
        <h3 className="font-display text-3xl text-ink">{f.name}</h3>
        <p className="mt-1 text-ink-soft">{f.note}</p>
      </div>
    </article>
  )
}

function FinalCta({ v }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const radius = useTransform(scrollYProgress, [0, 1], ['50%', '0%'])
  const scale = useTransform(scrollYProgress, [0, 1], [0.7, 1])
  return (
    <section ref={ref} className="bg-white px-5 pb-0 pt-24">
      <motion.div style={{ borderTopLeftRadius: radius, borderTopRightRadius: radius, scale }} className="mx-auto flex min-h-[80vh] origin-bottom flex-col items-center justify-center bg-flare px-6 py-24 text-center">
        <Reveal>
          <h2 className="font-display text-6xl leading-[0.95] text-ink md:text-9xl">Light it up.</h2>
          <p className="mx-auto mt-6 max-w-lg text-lg font-medium text-ink">Join the waitlist and we will send 3 cans free when FLARE lands in your city.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button to="/waitlist" variant="dark" event={`final_${v.cta}`}>{v.cta}</Button>
            <Button to="/offer" variant="light" event="final_offer">Shop launch packs</Button>
          </div>
        </Reveal>
      </motion.div>
    </section>
  )
}
