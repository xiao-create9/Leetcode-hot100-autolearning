import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: '首页', icon: '⌂' },
  { to: '/practice', label: '刷题', icon: '⌨' },
  { to: '/problems', label: '题库', icon: '≡' },
  { to: '/records', label: '记录', icon: '◎' },
  { to: '/settings', label: '设置', icon: '⚙' },
]

export default function Navbar() {
  return (
    <>
      {/* Desktop top nav */}
      <nav className="hidden sm:flex items-center justify-between px-8 py-4 border-b border-border dark:border-white/[0.06] bg-surface/80 dark:bg-[#0f1429]/80 backdrop-blur-xl sticky top-0 z-50">
        <NavLink to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
            <span className="text-white font-bold text-sm font-mono">LC</span>
          </div>
          <span className="text-lg font-bold text-text-primary dark:text-white tracking-tight">
            Hot <span className="text-accent">100</span>
          </span>
        </NavLink>
        <div className="flex gap-0.5 bg-surface-overlay dark:bg-white/[0.04] rounded-xl p-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-surface dark:bg-white/[0.08] text-accent shadow-xs'
                    : 'text-text-secondary dark:text-gray-400 hover:text-text-primary dark:hover:text-white hover:bg-surface/60 dark:hover:bg-white/[0.04]'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Mobile bottom tab */}
      <nav className="sm:hidden fixed bottom-0 inset-x-0 bg-surface/90 dark:bg-[#0f1429]/90 backdrop-blur-xl border-t border-border dark:border-white/[0.06] flex justify-around py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] z-50">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.to === '/'}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'text-accent'
                  : 'text-text-tertiary dark:text-gray-500 active:scale-95'
              }`
            }
          >
            <span className="text-base leading-none">{l.icon}</span>
            <span className="text-[10px] font-medium tracking-wide">{l.label}</span>
          </NavLink>
        ))}
      </nav>
    </>
  )
}
