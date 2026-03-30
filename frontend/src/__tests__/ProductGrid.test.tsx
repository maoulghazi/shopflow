import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ProductGrid from '@/components/ui/ProductGrid'

const mockProducts = [
  { id: 1, name: 'Obsidian Desk Lamp', category: 'Lighting', price: 129, badge: 'New', emoji: '🪔', description: 'A lamp' },
  { id: 2, name: 'Linen Throw Blanket', category: 'Textiles', price: 89, badge: null, emoji: '🧣', description: 'A blanket' },
]

describe('ProductGrid Component', () => {
  it('renders all products', () => {
    render(<ProductGrid products={mockProducts} onSelect={() => {}} />)
    expect(screen.getByText('Obsidian Desk Lamp')).toBeInTheDocument()
    expect(screen.getByText('Linen Throw Blanket')).toBeInTheDocument()
  })

  it('renders correct number of products', () => {
    render(<ProductGrid products={mockProducts} onSelect={() => {}} />)
    expect(screen.getAllByText(/\$/)).toHaveLength(2)
  })

  it('renders product categories', () => {
    render(<ProductGrid products={mockProducts} onSelect={() => {}} />)
    expect(screen.getByText('Lighting')).toBeInTheDocument()
    expect(screen.getByText('Textiles')).toBeInTheDocument()
  })

  it('renders badge when present', () => {
    render(<ProductGrid products={mockProducts} onSelect={() => {}} />)
    expect(screen.getByText('New')).toBeInTheDocument()
  })
})