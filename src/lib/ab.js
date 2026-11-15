import { safeGet, safeSet } from './track'

// A/B test for the launch page headline and button.
// Force a version with #/?v=a or #/?v=b, otherwise each visitor is randomly assigned once.
export const VARIANTS = {
  a: { kicker: 'New. Sparkling. Unreasonably good.', headline: ['Energy', 'that burns', 'clean.'], cta: 'Get 3 cans free' },
  b: { kicker: 'Built for long days and late nights.', headline: ['Zero crash.', 'All', 'fire.'], cta: 'Claim my free cans' },
}

export function getVariant(params) {
  const forced = params.get('v')
  if (forced === 'a' || forced === 'b') { safeSet('flare_ab', forced); return forced }
  const saved = safeGet('flare_ab')
  if (saved === 'a' || saved === 'b') return saved
  const pick = Math.random() < 0.5 ? 'a' : 'b'
  safeSet('flare_ab', pick)
  return pick
}
