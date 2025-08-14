export const SettingsPage = () => {
	return (
		<div className="p-4 pb-16 space-y-4">
			<h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
			<section className="rounded-2xl bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm shadow-[0_1px_3px_rgba(0,0,0,0.08),0_10px_20px_-10px_rgba(0,0,0,0.25)] p-3 space-y-2">
				<div className="flex items-center justify-between">
					<div>
						<div className="text-sm font-medium">Theme</div>
						<div className="text-xs text-gray-600">System</div>
					</div>
					<button className="px-3 py-1 rounded bg-gray-100 text-sm">Change</button>
				</div>
				<div className="flex items-center justify-between">
					<div>
						<div className="text-sm font-medium">Flush Outbox</div>
						<div className="text-xs text-gray-600">Force retry queued mutations</div>
					</div>
					<button
						className="px-3 py-1 rounded bg-blue-600 text-white text-sm"
						onClick={() => {
							navigator.serviceWorker?.controller?.postMessage({ type: 'FLUSH_OUTBOX' })
						}}
					>
						Flush
					</button>
				</div>
			</section>
		</div>
	)
}