type TimerState = {
  isRunning: boolean
  remainingMs: number
}

export type TimersStore = {
  workout: TimerState
  rest: TimerState
  startRest: (ms: number) => void
  pauseRest: () => void
  tick: (deltaMs: number) => void
}

export function createTimersStore(): TimersStore {
  const state: TimersStore = {
    workout: { isRunning: false, remainingMs: 0 },
    rest: { isRunning: false, remainingMs: 0 },
    startRest(ms) {
      state.rest.isRunning = true
      state.rest.remainingMs = ms
    },
    pauseRest() {
      state.rest.isRunning = false
    },
    tick(deltaMs) {
      if (!state.rest.isRunning) return
      state.rest.remainingMs = Math.max(0, state.rest.remainingMs - deltaMs)
      if (state.rest.remainingMs === 0) state.rest.isRunning = false
    },
  }
  return state
}