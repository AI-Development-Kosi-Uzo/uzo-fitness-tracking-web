import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/tokens.css'
import './index.css'
import { AppRouter } from './router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { registerSW } from './sw/registerSW'

const queryClient = new QueryClient()

function ensureManifest() {
	const existing = document.querySelector('link[rel="manifest"]')
	if (!existing) {
		const link = document.createElement('link')
		link.rel = 'manifest'
		link.href = '/manifest.webmanifest'
		document.head.appendChild(link)
	}
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppRouter />
    </QueryClientProvider>
  </StrictMode>,
)

ensureManifest()
registerSW()
