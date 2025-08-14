export type UiStore = {
  isSessionModalOpen: boolean
  openSessionModal: () => void
  closeSessionModal: () => void
  selectedProgressTab: 'stats' | 'photos'
  setProgressTab: (tab: 'stats' | 'photos') => void
}

export function createUiStore(): UiStore {
  const state: UiStore = {
    isSessionModalOpen: false,
    openSessionModal() {
      state.isSessionModalOpen = true
    },
    closeSessionModal() {
      state.isSessionModalOpen = false
    },
    selectedProgressTab: 'stats',
    setProgressTab(tab) {
      state.selectedProgressTab = tab
    },
  }
  return state
}