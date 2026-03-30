import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Hero from '@/components/ui/Hero'

describe('Hero Component', () => {
  it('renders the heading', () => {
    render(<Hero />)
    expect(screen.getByText(/made with/i)).toBeInTheDocument()
  })

  it('renders the CTA button', () => {
    render(<Hero />)
    expect(screen.getByText(/shop the collection/i)).toBeInTheDocument()
  })

  it('renders the subheading', () => {
    render(<Hero />)
    expect(screen.getByText(/curated objects/i)).toBeInTheDocument()
  })
})