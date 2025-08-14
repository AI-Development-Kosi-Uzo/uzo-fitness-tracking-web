import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TabBar } from './TabBar'

vi.mock('@tanstack/react-router', () => ({
	Link: (props: { to: string; children: React.ReactNode }) => <a href={props.to}>{props.children}</a>,
}))

describe('TabBar', () => {
	it('renders 5 nav links', () => {
		render(<TabBar />)
		expect(screen.getByText('Log')).toBeInTheDocument()
		expect(screen.getByText('Library')).toBeInTheDocument()
		expect(screen.getByText('History')).toBeInTheDocument()
		expect(screen.getByText('Progress')).toBeInTheDocument()
		expect(screen.getByText('Settings')).toBeInTheDocument()
	})
})