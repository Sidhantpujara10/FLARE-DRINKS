import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react'
import Can, { FLAVORS } from '../components/Can'
import Button from '../components/Button'
import Reveal, { SplitHeading } from '../components/Reveal'
import VelocityMarquee from '../components/VelocityMarquee'
import { safeGet, safeSet, track } from '../lib/track'
import { getLenis } from '../lib/useLenis'

export default function Offer() {
  return (
    <>
      <OfferHero />
      <ZoomCan />
      <VelocityMarquee dark items={['Buy 2 get 1', 'Free delivery', 'Launch week only', 'Pune first']} baseVelocity={3} />
      <Bundles />
      <Faq />
    </>
  )
}

function useCountdown() {
  const [end] = useState(() => {
    const saved = Number(safeGet('flare_offer_end'))
    if (saved > Date.now()) return saved
    const e = Date.now() + 48 * 3600 * 1000
    safeSet('flare_offer_end', String(e))
    return e
  })
  const [now, setNow] = useState(Date.now())
  useEffect(() => { const id = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(id) }, [])
  const s = Math.max(0, Math.floor((end - now) / 1000))
  return [Math.floor(s / 3600), Math.floor((s % 3600) / 60), s % 60]
}

function OfferHero() {
  const [h, m, s] = useCountdown()
  return (
    <section className="bg-white px-5 pb-16 pt-32 md:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm font-bold uppercase tracking-[0.3em] text-flare-deep">Launch week drop</motion.p>
        <SplitHeading words={['Buy 2 packs.', 'Get 1 free.']} className="mt-4 font-display text-6xl leading-[0.92] tracking-tight md:text-9xl" wordClass={(i) => (i ? 'text-flare' : 'text-ink')} />
        <div className="mt-10 flex flex-wrap items-end gap-8">
          <div role="timer" aria-label="Offer ends in" className="flex gap-3">
            {[['Hours', h], ['Mins', m], ['Secs', s]].map(([label, val]) => (
              <div key={label} className="w-24 rounded-2xl bg-ink p-4 text-center text-white">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.p key={val} initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} className="font-display text-4xl tabular-nums">
                    {String(val).padStart(2, '0')}
                  </motion.p>
                </AnimatePresence>
                <p className="mt-1 text-xs font-bold uppercase tracking-widest text-flare">{label}</p>
              </div>
            ))}
          </div>
          <Button onClick={() => { track('cta_click', { cta: 'offer_hero' }); const el = document.getElementById('bundles'); const l = getLenis(); l ? l.scrollTo(el, { offset: -80 }) : el.scrollIntoView({ behavior: 'smooth' }) }}>Pick a pack ↓</Button>
        </div>
      </div>
    </section>
  )
}

// Pinned section: the cans fan out and the headline zooms in as you scroll.
function ZoomCan() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const scale = useTransform(scrollYProgress, [0, 0.6], [0.55, 1])
  const leftX = useTransform(scrollYProgress, [0.1, 0.6], [0, -220])
  const rightX = useTransform(scrollYProgress, [0.1, 0.6], [0, 220])
  const sideRotateL = useTransform(scrollYProgress, [0.1, 0.6], [0, -18])
  const sideRotateR = useTransform(scrollYProgress, [0.1, 0.6], [0, 18])
  const textScale = useTransform(scrollYProgress, [0.5, 1], [0.8, 1])
  const textOpacity = useTransform(scrollYProgress, [0.5, 0.75], [0, 1])
  const bg = useTransform(scrollYProgress, [0, 0.5], ['#F5F6F8', '#FF5A1F'])

  return (
    <section ref={ref} className="relative h-[260vh]">
      <motion.div style={{ backgroundColor: bg }} className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden">
        <motion.div style={{ scale }} className="relative flex items-end">
          <motion.div style={{ x: leftX, rotate: sideRotateL }} className="absolute left-1/2 -translate-x-1/2"><Can {...FLAVORS[1]} className="h-[48vh] w-auto" /></motion.div>
          <motion.div style={{ x: rightX, rotate: sideRotateR }} className="absolute left-1/2 -translate-x-1/2"><Can {...FLAVORS[2]} className="h-[48vh] w-auto" /></motion.div>
          <div className="relative"><Can {...FLAVORS[0]} body="#FFFFFF" band="#0B1F3A" ink="#FFFFFF" className="h-[54vh] w-auto" /></div>
        </motion.div>
        <motion.p style={{ scale: textScale, opacity: textOpacity }} className="mt-8 px-5 text-center font-display text-4xl text-ink md:text-6xl">
          The third pack is on us.
        </motion.p>
      </motion.div>
    </section>
  )
}

const PACKS = [
  { name: 'Starter', cans: 6, price: 449, was: 539, perks: ['Pick any 1 flavor', 'Free delivery in Pune'] },
  { name: 'Fuel', cans: 12, price: 849, was: 1079, perks: ['Mix up to 3 flavors', 'Free delivery', 'FLARE bottle opener'], hot: true },
  { name: 'Squad', cans: 24, price: 1599, was: 2159, perks: ['All 4 flavors', 'Free express delivery', 'Limited launch tote'] },
]

function Bundles() {
  return (
    <section id="bundles" className="scroll-mt-20 bg-white px-5 py-28 md:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <h2 className="font-display text-5xl leading-none tracking-tight md:text-7xl">Choose your pack.</h2>
          <p className="mt-4 max-w-lg text-lg text-ink-soft">Buy any two packs and the cheaper one is free. Applied at checkout.</p>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {PACKS.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.12} y={60}>
              <motion.article whileHover={{ y: -10 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} className={`relative flex h-full flex-col rounded-[2rem] p-8 ${p.hot ? 'bg-ink text-white' : 'border-2 border-ink/10 bg-white text-ink'}`}>
                {p.hot && <span className="absolute -top-4 left-8 rounded-full bg-flare px-4 py-1.5 text-sm font-bold text-ink">Most popular</span>}
                <p className="font-display text-3xl">{p.name}</p>
                <p className={`mt-1 ${p.hot ? 'text-white/70' : 'text-ink-soft'}`}>{p.cans} cans</p>
                <p className="mt-8 font-display text-6xl">₹{p.price.toLocaleString('en-IN')}</p>
                <p className={`mt-1 line-through ${p.hot ? 'text-white/50' : 'text-ink-soft'}`}>₹{p.was.toLocaleString('en-IN')}</p>
                <ul className="mt-8 flex-1 space-y-3">
                  {p.perks.map((perk) => (
                    <li key={perk} className="flex items-center gap-3">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-flare text-ink">
                        <svg viewBox="0 0 20 20" className="h-3.5 w-3.5"><path d="m5 10 3 3 7-7" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" /></svg>
                      </span>
                      {perk}
                    </li>
                  ))}
                </ul>
                <Button to="/waitlist" variant={p.hot ? 'primary' : 'dark'} event={`pack_${p.name}`} className="mt-10 justify-center">Reserve {p.name}</Button>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

const FAQS = [
  ['When will my order ship?', 'Launch orders ship from our Pune warehouse within 48 hours. Most deliveries in the city arrive next day.'],
  ['How does buy 2 get 1 work?', 'Add any two packs to your cart. The lower priced pack becomes free automatically at checkout.'],
  ['How much caffeine is in a can?', '150mg per 330ml can, about the same as a strong cup of coffee, released slowly with L theanine.'],
  ['Is FLARE suitable for everyone?', 'FLARE is not recommended for children, pregnant women or people sensitive to caffeine.'],
]

function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section className="bg-mist px-5 py-28 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1fr_1.5fr]">
        <Reveal><h2 className="font-display text-5xl leading-none tracking-tight md:text-6xl">Questions, answered.</h2></Reveal>
        <div className="divide-y-2 divide-ink/10 border-y-2 border-ink/10">
          {FAQS.map(([q, a], i) => (
            <div key={q}>
              <button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i} className="flex w-full items-center justify-between gap-6 py-6 text-left">
                <span className="text-xl font-bold">{q}</span>
                <motion.span animate={{ rotate: open === i ? 45 : 0 }} className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-flare font-display text-2xl text-ink">+</motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pb-6 text-lg text-ink-soft">
                    {a}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
