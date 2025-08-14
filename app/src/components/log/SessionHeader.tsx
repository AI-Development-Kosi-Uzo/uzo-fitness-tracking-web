import { RestTimerButton } from './RestTimerButton'
import { RestTimerPicker } from './RestTimerPicker'

export function SessionHeader({ title }: { title: string }) {
	return (
		<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
			<h2>{title}</h2>
			<div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
				<RestTimerPicker />
				<RestTimerButton />
			</div>
		</div>
	)
}