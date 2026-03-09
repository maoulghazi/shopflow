'use client'
import { useEffect, useState } from 'react'
import { CartProvider } from '@/lib/CartContext'
import Nav from '@/components/layout/Nav'
import Hero from '@/components/ui/Hero'
import ProductGrid from '@/components/ui/ProductGrid'
import CartDrawer from '@/components/ui/CartDrawer'
import ProductModal from '@/components/ui/ProductModal'
import { getProducts } from '@/lib/api'

export interface Product {
  id: number
  name: string
  category: string
  price: number
  badge: string | null
  emoji: string
  description: string
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [cartOpen, setCartOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [activeCategory, setActiveCategory] = useState('All')

  useEffect(() => {
    getProducts()
      .then(res => setProducts(res.data))
      .catch(() => {
        // Fallback to mock data if API not running
        setProducts(MOCK_PRODUCTS)
      })
      .finally(() => setLoading(false))
  }, [])

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))]
  const filtered = activeCategory === 'All' ? products : products.filter(p => p.category === activeCategory)

  return (
    <CartProvider>
      <Nav onCartOpen={() => setCartOpen(true)} />
      <Hero />
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-baseline justify-between mb-8 flex-wrap gap-4">
          <h2 className="font-serif text-3xl">The Collection</h2>
          <div className="flex gap-2 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 text-xs tracking-widest uppercase border transition-all ${
                  activeCategory === cat
                    ? 'bg-char text-cream border-char'
                    : 'border-stone text-bark hover:border-char hover:text-char'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        {loading ? (
          <div className="text-center py-20 text-stone font-serif italic">Loading collection...</div>
        ) : (
          <ProductGrid products={filtered} onSelect={setSelectedProduct} />
        )}
      </main>
      <footer className="bg-char text-stone text-center text-xs tracking-widest py-8 mt-auto">
        © 2026 <span className="text-gold">ShopFlow</span> — Handcrafted goods, thoughtfully sourced.
      </footer>
      {cartOpen && <CartDrawer onClose={() => setCartOpen(false)} />}
      {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </CartProvider>
  )
}

const MOCK_PRODUCTS: Product[] = [
  { id: 1, name: 'Obsidian Desk Lamp', category: 'Lighting', price: 129, badge: 'New', emoji: '🪔', description: 'Matte black architectural lamp with warm Edison glow.' },
  { id: 2, name: 'Linen Throw Blanket', category: 'Textiles', price: 89, badge: 'Bestseller', emoji: '🧣', description: 'Stone-washed linen in natural oat. 160×200cm.' },
  { id: 3, name: 'Ceramic Pour-Over', category: 'Kitchen', price: 64, badge: null, emoji: '☕', description: 'Hand-thrown stoneware dripper. Fits 1–4 cups.' },
  { id: 4, name: 'Walnut Serving Board', category: 'Kitchen', price: 110, badge: 'Sale', emoji: '🪵', description: 'Live-edge American walnut. Food-safe oil finish.' },
  { id: 5, name: 'Beeswax Candle Set', category: 'Home', price: 48, badge: null, emoji: '🕯️', description: 'Set of 3 hand-poured pillar candles. 40hr burn each.' },
  { id: 6, name: 'Rattan Floor Basket', category: 'Storage', price: 75, badge: 'New', emoji: '🧺', description: 'Hand-woven natural rattan.' },
]
