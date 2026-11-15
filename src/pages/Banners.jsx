import { useState } from 'react'
import Reveal from '../components/Reveal'
import { MediumRectangle, Leaderboard, Skyscraper } from '../banners/Banners'

export default function Banners() {
  const [run, setRun] = useState(0)
  return (
    <section className="bg-mist px-5 pb-28 pt-32 md:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-flare-deep">Display ads</p>
          <h1 className="mt-3 font-display text-5xl leading-none tracking-tight md:text-7xl">Ad banner set.</h1>
          <p className="mt-4 max-w-xl text-lg text-ink-soft">Three standard sizes for the launch campaign. Every click is tracked with its size and sends the user to the offer page.</p>
          <button onClick={() => setRun((r) => r + 1)} className="mt-6 rounded-full border-2 border-ink px-5 py-2.5 font-bold hover:bg-ink hover:text-white">↻ Replay animations</button>
        </Reveal>

        <div key={run} className="mt-14 grid gap-12 lg:grid-cols-[auto_1fr]">
          <Frame label="Skyscraper · 160 × 600"><Skyscraper /></Frame>
          <div className="space-y-12">
            <Frame label="Medium rectangle · 300 × 250"><MediumRectangle /></Frame>
            <Frame label="Leaderboard · 728 × 90" scroll><Leaderboard /></Frame>
          </div>
        </div>
      </div>
    </section>
  )
}

function Frame({ label, children, scroll }) {
  return (
    <Reveal>
      <p className="mb-3 text-sm font-bold uppercase tracking-widest text-ink-soft">{label}</p>
      <div className={`inline-block rounded-xl border-2 border-dashed border-ink/20 bg-white p-4 ${scroll ? 'max-w-full overflow-x-auto' : ''}`}>{children}</div>
    </Reveal>
  )
}
