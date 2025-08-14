import { describe, it, expect } from 'vitest'
import { createTimersStore } from '../../state/timers.store'

describe('timers.store', () => {
	it('counts down rest and pauses at zero', () => {
		const store = createTimersStore()
		store.startRest(3000)
		expect(store.rest.isRunning).toBe(true)
		store.tick(1000)
		expect(store.rest.remainingMs).toBe(2000)
		store.tick(2000)
		expect(store.rest.remainingMs).toBe(0)
		expect(store.rest.isRunning).toBe(false)
	})
})