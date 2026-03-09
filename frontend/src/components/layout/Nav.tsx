'use client'
import { useCart } from '@/lib/CartContext'

export default function Nav({ onCartOpen }: { onCartOpen: () => void }) {
  const { count } = useCart()
  return (
    <nav className="sticky top-0 z-50 bg-char text-cream px-6 h-16 flex items-center justify-between border-b border-white/10">
      <a href="/" className="font-serif text-2xl tracking-wide text-white">
        Shop<span className="text-gold italic">Flow</span>
      </a>
      <div className="flex items-center gap-6">
        <button className="text-xs tracking-widest uppercase text-stone hover:text-white transition-colors">Collections</button>
        <button className="text-xs tracking-widest uppercase text-stone hover:text-white transition-colors">About</button>
        <button
          onClick={onCartOpen}
          className="flex items-center gap-2 bg-rust text-white px-4 py-2 text-sm font-medium tracking-wide hover:bg-earth transition-colors"
        >
          🛒 Cart
          {count > 0 && (
            <span className="bg-gold text-char rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
              {count}
            </span>
          )}
        </button>
      </div>
    </nav>
  )
}
