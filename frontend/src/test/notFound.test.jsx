import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { describe, it, expect } from 'vitest'
import App from '../App'
import { NOT_FOUND } from '../routeMeta'

const renderAt = (path) =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>
    </HelmetProvider>,
  )

describe('NotFound', () => {
  it.each(['/no-such-page', '/banks/no-such-bank', '/blog/no-such-post'])('renders for %s', async (path) => {
    renderAt(path)
    expect(await screen.findByRole('heading', { level: 1, name: NOT_FOUND.h1 })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'All Calculators' })).toHaveAttribute('href', '/')
  })

  it('does not render for a real bank page', async () => {
    renderAt('/banks/sbi')
    expect(await screen.findByRole('heading', { level: 1, name: /SBI/ })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: NOT_FOUND.h1 })).not.toBeInTheDocument()
  })
})
