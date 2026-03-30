import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Nav from '@/components/layout/Nav'
import { CartProvider } from '@/lib/CartContext'

describe('Nav Component', () => {
  it('renders the logo', () => {
    render(<CartProvider><Nav onCartOpen={() => {}} /></CartProvider>)
    expect(screen.getByText(/shop/i)).toBeInTheDocument()
  })

  it('renders the cart button', () => {
    render(<CartProvider><Nav onCartOpen={() => {}} /></CartProvider>)
    expect(screen.getByText(/cart/i)).toBeInTheDocument()
  })
})