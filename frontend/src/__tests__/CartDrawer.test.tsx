import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import CartDrawer from '@/components/ui/CartDrawer'
import { CartProvider } from '@/lib/CartContext'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}))

describe('CartDrawer Component', () => {
  it('renders empty cart message', () => {
    render(
      <CartProvider>
        <CartDrawer onClose={() => {}} />
      </CartProvider>
    )
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument()
  })

  it('renders the close button', () => {
    render(
      <CartProvider>
        <CartDrawer onClose={() => {}} />
      </CartProvider>
    )
    expect(screen.getByText('✕')).toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', () => {
    const onClose = jest.fn()
    render(
      <CartProvider>
        <CartDrawer onClose={onClose} />
      </CartProvider>
    )
    fireEvent.click(screen.getByText('✕'))
    expect(onClose).toHaveBeenCalled()
  })
})