import { useState } from 'react'
import { useTimersStore } from '../../state/timers.store'

export function RestTimerPicker() {
	const { restDurationMs, setRestDuration } = useTimersStore()
	const [value, setValue] = useState(restDurationMs / 1000)
	return (
		<div style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
			<label>Rest (s)</label>
			<input type="number" min={10} step={5} value={value} onChange={(e) => setValue(Number(e.target.value))} />
			<button onClick={() => setRestDuration(value * 1000)}>Set</button>
		</div>
	)
}