import { Link } from '@tanstack/react-router'

export function TabBar() {
	return (
		<nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200/80 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70">
			<ul className="mx-auto max-w-[560px] grid grid-cols-5 gap-1 px-2 py-2 text-sm">
				<li className="text-center"><Link to="/log">Log</Link></li>
				<li className="text-center"><Link to="/library">Library</Link></li>
				<li className="text-center"><Link to="/history">History</Link></li>
				<li className="text-center"><Link to="/progress/stats">Progress</Link></li>
				<li className="text-center"><Link to="/settings">Settings</Link></li>
			</ul>
		</nav>
	)
}