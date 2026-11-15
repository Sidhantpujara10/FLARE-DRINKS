import { Link, useLocation, useSearchParams } from '../lib/router'
import { getVariant } from '../lib/ab'
import Flame from './Flame'

export default function Footer() {
  useLocation()
  const [params] = useSearchParams()
  const v = getVariant(params)
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-4 md:px-8">
        <div className="md:col-span-2">
          <p className="flex items-center gap-2 font-display text-3xl"><Flame className="h-7 w-7 text-flare" /> FLARE</p>
          <p className="mt-4 max-w-sm text-white/70">Sparkling energy with zero sugar and no crash. A fictional brand built as a portfolio project.</p>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-flare">Pages</p>
          <ul className="mt-4 space-y-2 text-white/80">
            <li><Link className="hover:text-flare" to="/">Launch</Link></li>
            <li><Link className="hover:text-flare" to="/offer">Launch offer</Link></li>
            <li><Link className="hover:text-flare" to="/waitlist">Waitlist</Link></li>
            <li><Link className="hover:text-flare" to="/banners">Ad banners</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-flare">A/B test</p>
          <p className="mt-4 text-white/80">You are seeing version <strong className="text-white">{v.toUpperCase()}</strong> of the launch page.</p>
          <p className="mt-2 space-x-4 text-white/80">
            <Link className="underline hover:text-flare" to="/?v=a">View A</Link>
            <Link className="underline hover:text-flare" to="/?v=b">View B</Link>
          </p>
        </div>
      </div>
      <p className="border-t border-white/10 py-6 text-center text-sm text-white/50">© {new Date().getFullYear()} FLARE. Demo project by Sidhant Pujara.</p>
    </footer>
  )
}
