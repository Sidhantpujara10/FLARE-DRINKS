import { Children, createContext, useContext, useEffect, useState } from 'react'

// Tiny hash router. Replaces react-router-dom so the site also works inside
// sandboxed previews (about:srcdoc, file://) where `new URL()` cannot build a base address.

const parse = (raw) => {
  const h = (raw ?? safeHash()).replace(/^#/, '') || '/'
  const [pathname = '/', search = ''] = h.split('?')
  return { pathname: pathname || '/', search }
}
function safeHash() { try { return window.location.hash } catch { return '' } }

const LocationCtx = createContext(parse('/'))
const NavigateCtx = createContext(() => {})

export function HashRouter({ children }) {
  const [loc, setLoc] = useState(() => parse())
  useEffect(() => {
    const sync = () => setLoc(parse())
    window.addEventListener('hashchange', sync)
    window.addEventListener('popstate', sync)
    return () => { window.removeEventListener('hashchange', sync); window.removeEventListener('popstate', sync) }
  }, [])
  const navigate = (to) => {
    setLoc(parse(to))
    try { history.pushState(null, '', '#' + to) } catch { /* sandboxed: keep in memory only */ }
  }
  return (
    <NavigateCtx.Provider value={navigate}>
      <LocationCtx.Provider value={loc}>{children}</LocationCtx.Provider>
    </NavigateCtx.Provider>
  )
}

export const useLocation = () => useContext(LocationCtx)
export const useNavigate = () => useContext(NavigateCtx)
export const useSearchParams = () => [new URLSearchParams(useLocation().search)]

export function Routes({ children }) {
  const { pathname } = useLocation()
  const routes = Children.toArray(children)
  const match = routes.find((r) => r.props.path === pathname) || routes[0]
  return match.props.element
}
export const Route = () => null

export function Link({ to, onClick, ref, ...rest }) {
  const navigate = useNavigate()
  return (
    <a
      ref={ref}
      href={'#' + to}
      onClick={(e) => {
        onClick?.(e)
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
        e.preventDefault()
        navigate(to)
      }}
      {...rest}
    />
  )
}

export function NavLink({ to, end, className, children, ...rest }) {
  const { pathname } = useLocation()
  const isActive = end ? pathname === to : pathname.startsWith(to)
  return (
    <Link to={to} aria-current={isActive ? 'page' : undefined} className={typeof className === 'function' ? className({ isActive }) : className} {...rest}>
      {typeof children === 'function' ? children({ isActive }) : children}
    </Link>
  )
}
