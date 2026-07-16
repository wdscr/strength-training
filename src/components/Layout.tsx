import { Outlet, NavLink, useLocation } from 'react-router-dom'

const NAV_ITEMS = [
  { to: '/', label: '训练', icon: '🏠' },
  { to: '/history', label: '记录', icon: '📋' },
  { to: '/settings', label: '设置', icon: '⚙️' },
]

export default function Layout() {
  const location = useLocation()
  const showNav = !location.pathname.startsWith('/workout/')

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col max-w-md mx-auto">
      <main className="flex-1 px-4 pb-20">
        <Outlet />
      </main>
      {showNav && (
        <nav className="fixed bottom-0 left-0 right-0 bg-slate-800 border-t border-slate-700 safe-area-bottom">
          <div className="max-w-md mx-auto flex justify-around py-3">
            {NAV_ITEMS.map(({ to, label, icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `flex flex-col items-center text-xs gap-1 ${
                    isActive ? 'text-amber-400' : 'text-slate-400'
                  }`
                }
              >
                <span className="text-xl">{icon}</span>
                <span>{label}</span>
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </div>
  )
}
