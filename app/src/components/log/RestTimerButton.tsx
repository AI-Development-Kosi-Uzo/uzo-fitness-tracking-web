import { useTimersStore } from '../../state/timers.store'

export function RestTimerButton() {
	const { rest, startRest, pauseRest } = useTimersStore()
	return (
		<button onClick={() => (rest.isRunning ? pauseRest() : startRest())}>
			{rest.isRunning ? `Pause (${Math.ceil(rest.remainingMs / 1000)}s)` : 'Start Rest'}
		</button>
	)
}