import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AppRouter } from '../../router'

describe('Library forms', () => {
  it('can open and validate Create Template dialog', async () => {
    window.history.pushState({}, '', '/library')
    render(<AppRouter />)

    await screen.findByRole('heading', { name: 'Library' })
    await userEvent.click(screen.getByRole('button', { name: 'Create Template' }))
    await screen.findByRole('heading', { name: 'Create Template' })

    const createBtn = screen.getByRole('button', { name: 'Create' })
    expect(createBtn).toBeDisabled()

    await userEvent.type(screen.getByLabelText('Name', { selector: 'input' }), 'My Plan')
    await userEvent.type(screen.getByLabelText('Summary', { selector: 'input' }), 'Desc')
    expect(createBtn).not.toBeDisabled()
  })
})


