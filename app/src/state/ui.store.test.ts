import { describe, expect, it } from 'vitest'
import { createUiStore } from './ui.store'

describe('createUiStore', () => {
  it('opens and closes session modal', () => {
    const store = createUiStore()
    expect(store.isSessionModalOpen).toBe(false)
    store.openSessionModal()
    expect(store.isSessionModalOpen).toBe(true)
    store.closeSessionModal()
    expect(store.isSessionModalOpen).toBe(false)
  })

  it('sets progress tab', () => {
    const store = createUiStore()
    expect(store.selectedProgressTab).toBe('stats')
    store.setProgressTab('photos')
    expect(store.selectedProgressTab).toBe('photos')
  })
})