import { Outlet, Link } from '@tanstack/react-router'

export function RootLayout() {
  return (
    <div>
      <Outlet />
      <nav style={{ position: 'fixed', bottom: 0, left: 0, right: 0, padding: '12px', borderTop: '1px solid #eee', background: 'white', display: 'flex', gap: '12px', justifyContent: 'space-around' }}>
        <Link to="/log">Log</Link>
        <Link to="/library">Library</Link>
        <Link to="/history">History</Link>
        <Link to="/progress/stats">Progress</Link>
        <Link to="/settings">Settings</Link>
      </nav>
    </div>
  )
}