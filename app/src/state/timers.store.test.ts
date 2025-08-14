import { describe, expect, it } from 'vitest'
import { createTimersStore } from './timers.store'

describe('createTimersStore', () => {
  it('starts rest with given ms', () => {
    const store = createTimersStore()
    store.startRest(30000)
    expect(store.rest.isRunning).toBe(true)
    expect(store.rest.remainingMs).toBe(30000)
  })

  it('ticks down when running and stops at zero', () => {
    const store = createTimersStore()
    store.startRest(1000)
    store.tick(400)
    expect(store.rest.remainingMs).toBe(600)
    expect(store.rest.isRunning).toBe(true)

    store.tick(600)
    expect(store.rest.remainingMs).toBe(0)
    expect(store.rest.isRunning).toBe(false)
  })

  it('does not tick when paused', () => {
    const store = createTimersStore()
    store.startRest(1000)
    store.pauseRest()
    store.tick(500)
    expect(store.rest.remainingMs).toBe(1000)
    expect(store.rest.isRunning).toBe(false)
  })
})