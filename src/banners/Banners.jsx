import { useNavigate } from '../lib/router'
import Can from '../components/Can'
import { track } from '../lib/track'

// Standard IAB display sizes. Animations are CSS keyframes from index.css,
// so each banner can be exported as a single static HTML file for ad platforms.

function useBannerClick(size) {
  const nav = useNavigate()
  return () => { track('banner_click', { size }); nav('/offer') }
}

// key prop on wrapper lets the page "replay" the intro animation
export function MediumRectangle() {
  const click = useBannerClick('300x250')
  return (
    <button onClick={click} aria-label="FLARE ad: Buy 2 get 1 free" className="relative block h-[250px] w-[300px] overflow-hidden rounded-md border border-ink/10 bg-white text-left">
      <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-flare anim-pop" />
      <div className="absolute right-4 top-6 anim-wobble"><Can className="h-36 w-auto" /></div>
      <div className="absolute left-5 top-6 w-40">
        <p className="overflow-hidden"><span className="block anim-slide-up font-display text-[30px] leading-[0.95] text-ink">Zero crash.</span></p>
        <p className="overflow-hidden"><span className="block anim-slide-up font-display text-[30px] leading-[0.95] text-flare" style={{ animationDelay: '.15s' }}>All fire.</span></p>
        <p className="mt-2 text-xs font-semibold text-ink-soft anim-pop" style={{ animationDelay: '.4s' }}>Sparkling energy. 0g sugar.</p>
      </div>
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-ink px-5 py-3">
        <span className="text-sm font-bold text-white">Buy 2, get 1 <span className="text-flare">free</span></span>
        <span className="anim-pulse rounded-full bg-flare px-3 py-1.5 text-xs font-bold text-ink">Shop now</span>
      </div>
    </button>
  )
}

export function Leaderboard() {
  const click = useBannerClick('728x90')
  return (
    <button onClick={click} aria-label="FLARE ad: Launch week, buy 2 get 1 free" className="relative flex h-[90px] w-[728px] items-center overflow-hidden rounded-md bg-flare text-left">
      <div className="flex h-full w-[150px] shrink-0 items-center justify-center bg-ink">
        <span className="font-display text-3xl text-white anim-pop">FLARE</span>
      </div>
      <div className="relative ml-3 h-full w-20 shrink-0"><Can className="absolute -bottom-6 left-1 h-28 w-auto anim-wobble" /></div>
      <div className="ml-3 flex-1 overflow-hidden">
        <p className="anim-slide-up font-display text-[26px] leading-none text-ink">Energy that burns clean.</p>
        <div className="mt-1.5 overflow-hidden whitespace-nowrap">
          <div className="anim-ticker inline-flex gap-6 text-xs font-bold uppercase tracking-widest text-ink">
            {Array.from({ length: 2 }).flatMap((_, k) => ['0g sugar', '150mg caffeine', 'Real fruit', 'Launch week only'].map((t) => <span key={k + t}>● {t}</span>))}
          </div>
        </div>
      </div>
      <span className="anim-pulse mr-5 shrink-0 rounded-full bg-ink px-5 py-3 text-sm font-bold text-white">Buy 2 get 1 free</span>
    </button>
  )
}

export function Skyscraper() {
  const click = useBannerClick('160x600')
  return (
    <button onClick={click} aria-label="FLARE ad: Join the waitlist for 3 free cans" className="relative flex h-[600px] w-[160px] flex-col items-center overflow-hidden rounded-md bg-ink text-center">
      <p className="mt-6 font-display text-2xl text-white anim-pop">FLARE</p>
      <div className="mt-6 px-3">
        <p className="overflow-hidden"><span className="block anim-slide-up font-display text-[28px] leading-[0.95] text-white" style={{ animationDelay: '.1s' }}>3 cans</span></p>
        <p className="overflow-hidden"><span className="block anim-slide-up font-display text-[28px] leading-[0.95] text-flare" style={{ animationDelay: '.25s' }}>free.</span></p>
      </div>
      <div className="relative mt-8 flex flex-1 items-start justify-center">
        <div className="absolute top-8 h-32 w-32 rounded-full bg-flare anim-pop" style={{ animationDelay: '.3s' }} />
        <Can className="relative h-56 w-auto anim-wobble" />
      </div>
      <p className="px-4 text-xs font-semibold text-white/70">Zero sugar sparkling energy. Launching in Pune.</p>
      <span className="anim-pulse my-6 rounded-full bg-flare px-4 py-3 text-sm font-bold text-ink">Join waitlist</span>
    </button>
  )
}
