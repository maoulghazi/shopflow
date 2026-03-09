'use client'
import { useRouter } from 'next/navigation'
import { useCart } from '@/lib/CartContext'

export default function CartDrawer({ onClose }: { onClose: () => void }) {
  const { items, remove, update, total } = useCart()
  const router = useRouter()
  const shipping = total > 100 ? 0 : 9.99

  const handleCheckout = () => { onClose(); router.push('/checkout') }

  return (
    <div className="fixed inset-0 bg-char/60 z-50 backdrop-blur-sm" onClick={onClose}>
      <div className="absolute top-0 right-0 bottom-0 w-96 max-w-full bg-white border-l border-parchment flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b border-parchment flex justify-between items-center">
          <h2 className="font-serif text-xl">Your Cart</h2>
          <button onClick={onClose} className="border border-parchment w-8 h-8 flex items-center justify-center hover:bg-char hover:text-cream hover:border-char transition-all">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
          {items.length === 0
            ? <p className="text-center text-stone font-serif italic py-12">Your cart is empty.</p>
            : items.map(item => (
              <div key={item.id} className="grid grid-cols-[48px_1fr_auto] gap-3 items-center">
                <div className="w-12 h-12 bg-parchment flex items-center justify-center text-2xl">{item.emoji}</div>
                <div>
                  <p className="font-medium text-sm">{item.name}</p>
                  <p className="text-xs text-bark">${item.price} each</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <p className="font-semibold text-sm">${(item.price * item.qty).toFixed(0)}</p>
                  <div className="flex items-center gap-1">
                    <button onClick={() => update(item.id, item.qty - 1)} className="w-6 h-6 border border-parchment flex items-center justify-center text-sm hover:bg-char hover:text-cream transition-all">−</button>
                    <span className="text-sm w-5 text-center">{item.qty}</span>
                    <button onClick={() => update(item.id, item.qty + 1)} className="w-6 h-6 border border-parchment flex items-center justify-center text-sm hover:bg-char hover:text-cream transition-all">+</button>
                  </div>
                  <button onClick={() => remove(item.id)} className="text-xs text-stone underline">Remove</button>
                </div>
              </div>
            ))
          }
        </div>

        <div className="p-6 border-t border-parchment flex flex-col gap-4">
          <div className="flex justify-between text-sm text-bark">
            <span>Subtotal</span><span>${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-bark">
            <span>Shipping</span><span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between font-semibold border-t border-parchment pt-3">
            <span>Total</span><span>${(total + shipping).toFixed(2)}</span>
          </div>
          <button
            onClick={handleCheckout}
            disabled={items.length === 0}
            className="w-full py-3 bg-rust text-white text-sm tracking-widest uppercase hover:bg-earth transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            Proceed to Checkout →
          </button>
        </div>
      </div>
    </div>
  )
}
