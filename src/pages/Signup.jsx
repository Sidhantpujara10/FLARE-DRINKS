import { useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react'
import Can, { FLAVORS } from '../components/Can'
import Button from '../components/Button'
import Reveal, { SplitHeading } from '../components/Reveal'
import { track, safeSet } from '../lib/track'

const PERKS = [
  ['3 cans free', 'Delivered the day FLARE launches in your city.'],
  ['Early access', 'Order 48 hours before everyone else.'],
  ['Flavor votes', 'Help pick the next flavor we make.'],
]
const CITIES = ['Pune', 'Mumbai', 'Bengaluru', 'Delhi NCR', 'Hyderabad', 'Other']

export default function Signup() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const canY = useTransform(scrollYProgress, [0, 1], [0, -220])
  const canRotate = useTransform(scrollYProgress, [0, 1], [12, -20])
  const canY2 = useTransform(scrollYProgress, [0, 1], [0, -380])

  return (
    <section ref={ref} className="relative overflow-hidden bg-white px-5 pb-28 pt-32 md:px-8">
      {/* parallax cans in the background */}
      <motion.div style={{ y: canY, rotate: canRotate }} className="pointer-events-none absolute -right-10 top-40 hidden opacity-90 lg:block" aria-hidden="true">
        <Can {...FLAVORS[1]} className="h-80 w-auto" />
      </motion.div>
      <motion.div style={{ y: canY2, rotate: -12 }} className="pointer-events-none absolute -left-12 top-[70%] hidden lg:block" aria-hidden="true">
        <Can {...FLAVORS[3]} className="h-64 w-auto" />
      </motion.div>

      <div className="relative mx-auto grid max-w-6xl gap-14 lg:grid-cols-[1fr_1.05fr]">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-flare-deep">Waitlist</p>
          <SplitHeading words={['Be first', 'to feel', 'the fire.']} className="mt-4 font-display text-6xl leading-[0.92] tracking-tight md:text-8xl" wordClass={(i) => (i === 2 ? 'text-flare' : 'text-ink')} />
          <ul className="mt-10 space-y-6">
            {PERKS.map(([t, d], i) => (
              <Reveal key={t} delay={0.4 + i * 0.12} x={-30} y={0}>
                <li className="flex gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-ink font-display text-lg text-flare">0{i + 1}</span>
                  <div><p className="text-xl font-bold">{t}</p><p className="text-ink-soft">{d}</p></div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
        <Reveal delay={0.3} y={60}><Form /></Reveal>
      </div>
    </section>
  )
}

function Form() {
  const [data, setData] = useState({ name: '', email: '', city: 'Pune', flavor: FLAVORS[0].name, consent: false })
  const [errors, setErrors] = useState({})
  const [done, setDone] = useState(false)
  const set = (k) => (e) => setData((d) => ({ ...d, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    const err = {}
    if (data.name.trim().length < 2) err.name = 'Please enter your name.'
    if (!/^\S+@\S+\.\S+$/.test(data.email)) err.email = 'Please enter a valid email.'
    if (!data.consent) err.consent = 'Please agree so we can email you.'
    setErrors(err)
    if (Object.keys(err).length) { track('signup_error', { fields: Object.keys(err) }); return }
    safeSet('flare_signup', JSON.stringify({ ...data, at: Date.now() }))
    track('signup', { city: data.city, flavor: data.flavor })
    setDone(true)
  }

  const field = 'mt-2 w-full rounded-xl border-2 border-ink/15 bg-white px-4 py-3.5 text-lg outline-none transition-colors focus:border-flare'

  return (
    <div className="relative rounded-[2rem] border-2 border-ink bg-white p-8 shadow-[12px_12px_0_0_#0B1F3A] md:p-10">
      <AnimatePresence mode="wait">
        {done ? (
          <motion.div key="done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-12 text-center">
            <motion.svg viewBox="0 0 80 80" className="mx-auto h-24 w-24">
              <motion.circle cx="40" cy="40" r="36" fill="#FF5A1F" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', bounce: 0.5 }} />
              <motion.path d="M24 41l11 11 21-23" fill="none" stroke="#0B1F3A" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.3, duration: 0.5 }} />
            </motion.svg>
            <h2 className="mt-6 font-display text-4xl">You're in, {data.name.split(' ')[0]}.</h2>
            <p className="mx-auto mt-3 max-w-sm text-lg text-ink-soft">We'll email {data.email} the day FLARE lands in {data.city}. Your 3 free cans of {data.flavor} are reserved.</p>
            <div className="mt-8"><Button to="/offer" event="signup_done_offer">See the launch offer</Button></div>
          </motion.div>
        ) : (
          <motion.form key="form" exit={{ opacity: 0, y: -20 }} onSubmit={submit} noValidate className="space-y-6">
            <h2 className="font-display text-3xl">Join the waitlist</h2>
            <label className="block font-semibold">Full name
              <input className={field} value={data.name} onChange={set('name')} autoComplete="name" aria-invalid={!!errors.name} placeholder="Aarav Sharma" />
              <Err msg={errors.name} />
            </label>
            <label className="block font-semibold">Email
              <input type="email" className={field} value={data.email} onChange={set('email')} autoComplete="email" aria-invalid={!!errors.email} placeholder="you@example.com" />
              <Err msg={errors.email} />
            </label>
            <label className="block font-semibold">City
              <select className={field} value={data.city} onChange={set('city')}>{CITIES.map((c) => <option key={c}>{c}</option>)}</select>
            </label>
            <fieldset>
              <legend className="font-semibold">Free cans flavor</legend>
              <div className="mt-2 grid grid-cols-2 gap-3">
                {FLAVORS.map((f) => {
                  const on = data.flavor === f.name
                  return (
                    <label key={f.name} className={`relative cursor-pointer rounded-xl border-2 px-4 py-3 text-sm font-bold transition-colors ${on ? 'border-ink text-white' : 'border-ink/15 hover:border-ink/40'}`}>
                      <input type="radio" name="flavor" value={f.name} checked={on} onChange={set('flavor')} className="sr-only" />
                      {on && <motion.span layoutId="flavor-pick" className="absolute inset-0 -z-0 rounded-[10px] bg-ink" transition={{ type: 'spring', bounce: 0.2, duration: 0.45 }} />}
                      <span className="relative flex items-center gap-2"><span className="h-3 w-3 rounded-full border border-ink/30" style={{ background: f.body }} />{f.name}</span>
                    </label>
                  )
                })}
              </div>
            </fieldset>
            <label className="flex items-start gap-3 text-ink-soft">
              <input type="checkbox" checked={data.consent} onChange={set('consent')} className="mt-1 h-5 w-5 accent-[#FF5A1F]" />
              <span>I agree to receive launch emails from FLARE. No spam, unsubscribe anytime.</span>
            </label>
            <Err msg={errors.consent} />
            <Button type="submit" className="w-full justify-center">Reserve my free cans</Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}

function Err({ msg }) {
  return (
    <AnimatePresence>
      {msg && <motion.span initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: [0, -6, 6, -3, 0] }} exit={{ opacity: 0 }} className="mt-2 block text-sm font-semibold text-flare-deep" role="alert">{msg}</motion.span>}
    </AnimatePresence>
  )
}
