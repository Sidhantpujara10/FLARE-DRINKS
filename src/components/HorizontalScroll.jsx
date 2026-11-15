import { useLayoutEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'motion/react'

// Vertical scroll drives a horizontal track while the section stays pinned.
export default function HorizontalScroll({ children, className = '', heightVh = 320 }) {
  const section = useRef(null)
  const track = useRef(null)
  const [distance, setDistance] = useState(0)

  useLayoutEffect(() => {
    const measure = () => setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth))
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] })
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30 })
  const x = useTransform(smooth, (v) => -v * distance)

  return (
    <section ref={section} className={`relative ${className}`} style={{ height: `${heightVh}vh` }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div ref={track} style={{ x }} className="flex gap-6 px-5 md:gap-10 md:px-[8vw]">
          {typeof children === 'function' ? children(scrollYProgress) : children}
        </motion.div>
      </div>
    </section>
  )
}
