import { render, screen, waitFor } from '@testing-library/react'
import { TemplateEditor } from './TemplateEditor'

// Uses MemoryWorkoutTemplatesRepository seed data where wt-1 exists

test('renders template name and days', async () => {
  render(<TemplateEditor templateId="wt-1" />)

  await waitFor(() => expect(screen.getByText('Push/Pull/Legs')).toBeInTheDocument())
  expect(screen.getByText('monday')).toBeInTheDocument()
  expect(screen.getByText('wednesday')).toBeInTheDocument()
  expect(screen.getByText('friday')).toBeInTheDocument()
})