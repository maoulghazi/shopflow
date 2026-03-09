'use client'
import { useState } from 'react'
import { useCart } from '@/lib/CartContext'
import { Product } from '@/app/page'

export default function ProductModal({ product, onClose }: { product: Product, onClose: () => void }) {
  const { add } = useCart()
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const price = product.badge === 'Sale' ? Math.round(product.price * 0.8) : product.price

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) add({ ...product, price })
    setAdded(true)
    setTimeout(() => { setAdded(false); onClose() }, 800)
  }

  return (
    <div className="fixed inset-0 bg-char/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white max-w-2xl w-full grid grid-cols-2 max-h-[90vh] overflow-hidden border border-parchment" onClick={e => e.stopPropagation()}>
        <div className="bg-parchment flex items-center justify-center text-8xl min-h-72">{product.emoji}</div>
        <div className="p-8 flex flex-col gap-4 overflow-y-auto">
          <p className="text-xs tracking-widest uppercase text-bark">{product.category}</p>
          <h2 className="font-serif text-2xl leading-tight">{product.name}</h2>
          <p className="text-2xl font-medium text-earth">
            ${price}
            {product.badge === 'Sale' && <span className="line-through text-stone text-base ml-2">${product.price}</span>}
          </p>
          <p className="text-sm text-bark leading-relaxed">{product.description}</p>
          <div className="mt-auto flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="text-xs tracking-widest uppercase text-bark">Qty</span>
              <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-8 h-8 border border-stone flex items-center justify-center hover:bg-char hover:text-cream hover:border-char transition-all">−</button>
              <span className="w-6 text-center font-medium">{qty}</span>
              <button onClick={() => setQty(q => q + 1)} className="w-8 h-8 border border-stone flex items-center justify-center hover:bg-char hover:text-cream hover:border-char transition-all">+</button>
            </div>
            <button onClick={handleAdd} className="w-full py-3 bg-char text-cream text-sm tracking-widest uppercase hover:bg-rust transition-colors font-medium">
              {added ? '✓ Added to Cart' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
      <button onClick={onClose} className="absolute top-4 right-4 bg-char text-cream w-8 h-8 rounded-full flex items-center justify-center hover:bg-rust transition-colors">✕</button>
    </div>
  )
}
