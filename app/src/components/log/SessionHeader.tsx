import { RestTimerButton } from './RestTimerButton'
import { RestTimerPicker } from './RestTimerPicker'

export function SessionHeader({ title }: { title: string }) {
	return (
		<header className="flex items-center justify-between gap-3">
			<h2 className="text-xl font-semibold tracking-tight">{title}</h2>
			<div className="flex items-center gap-2">
				<RestTimerPicker />
				<RestTimerButton />
			</div>
		</header>
	)
}