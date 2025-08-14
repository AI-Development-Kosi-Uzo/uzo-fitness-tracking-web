import { Outlet } from '@tanstack/react-router'
import { Page } from '@components/layout/Page'
import { TabBar } from '@components/layout/TabBar'

export function RootLayout() {
	return (
		<Page>
			<div className="pb-16">
				<Outlet />
			</div>
			<TabBar />
		</Page>
	)
}