import { create } from 'zustand'

export type TimerState = {
  isRunning: boolean
  remainingMs: number
}

export type TimersStoreState = {
  workout: TimerState
  rest: TimerState
  restDurationMs: number
  startRest: (ms?: number) => void
  pauseRest: () => void
  resetRest: () => void
  tick: (deltaMs: number) => void
  setRestDuration: (ms: number) => void
}

export const useTimersStore = create<TimersStoreState>((set, get) => ({
  workout: { isRunning: false, remainingMs: 0 },
  rest: { isRunning: false, remainingMs: 0 },
  restDurationMs: 60_000,
  startRest: (ms?: number) => {
    const duration = typeof ms === 'number' ? ms : get().restDurationMs
    set({ rest: { isRunning: true, remainingMs: duration } })
  },
  pauseRest: () => set((state) => ({ rest: { ...state.rest, isRunning: false } })),
  resetRest: () => set({ rest: { isRunning: false, remainingMs: 0 } }),
  tick: (deltaMs: number) => {
    const { rest } = get()
    if (!rest.isRunning) return
    const next = Math.max(0, rest.remainingMs - deltaMs)
    const isRunning = next > 0
    set({ rest: { isRunning, remainingMs: next } })
  },
  setRestDuration: (ms: number) => set({ restDurationMs: ms }),
}))

// Lightweight non-React factory for unit tests
export function createTimersStore() {
  const state = {
    workout: { isRunning: false, remainingMs: 0 } as TimerState,
    rest: { isRunning: false, remainingMs: 0 } as TimerState,
    startRest(ms: number) {
      state.rest.isRunning = true
      state.rest.remainingMs = ms
    },
    pauseRest() {
      state.rest.isRunning = false
    },
    tick(deltaMs: number) {
      if (!state.rest.isRunning) return
      state.rest.remainingMs = Math.max(0, state.rest.remainingMs - deltaMs)
      if (state.rest.remainingMs === 0) state.rest.isRunning = false
    },
  }
  return state
}