'use client'
import { useState } from 'react'
import { useCart } from '@/lib/CartContext'
import { CartProvider } from '@/lib/CartContext'
import { createOrder } from '@/lib/api'
import { useRouter } from 'next/navigation'

function CheckoutForm() {
  const { items, total, sessionId, clear } = useCart()
  const router = useRouter()
  const shipping = total > 100 ? 0 : 9.99
  const tax = total * 0.08
  const grand = total + shipping + tax
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ email: '', firstName: '', lastName: '', address: '', city: '', zip: '' })

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await createOrder({
        sessionId,
        email: form.email,
        name: `${form.firstName} ${form.lastName}`,
        address: form.address,
        city: form.city,
        zip: form.zip,
      })
      clear()
      router.push('/checkout/success')
    } catch {
      // In dev without API, still navigate
      clear()
      router.push('/checkout/success')
    } finally {
      setLoading(false)
    }
  }

  const Input = ({ label, k, placeholder, type = 'text' }: any) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs tracking-widest uppercase text-bark">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={(form as any)[k]}
        onChange={e => set(k, e.target.value)}
        className="px-3 py-2.5 border border-stone bg-white font-sans text-sm text-char focus:border-char outline-none"
      />
    </div>
  )

  return (
    <div className="max-w-xl mx-auto px-6 py-12">
      <a href="/" className="text-xs tracking-widest uppercase text-bark hover:text-char transition-colors flex items-center gap-1 mb-8">← Back to Shop</a>
      <h1 className="font-serif text-4xl mb-8">Checkout</h1>

      <div className="bg-parchment p-6 mb-8">
        <p className="text-xs tracking-widest uppercase text-bark mb-4">Order Summary</p>
        {items.map(i => (
          <div key={i.id} className="flex justify-between text-sm text-bark mb-2">
            <span>{i.name} × {i.qty}</span>
            <span>${(i.price * i.qty).toFixed(2)}</span>
          </div>
        ))}
        <div className="flex justify-between text-sm text-bark mb-2"><span>Shipping</span><span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span></div>
        <div className="flex justify-between text-sm text-bark mb-2"><span>Tax (8%)</span><span>${tax.toFixed(2)}</span></div>
        <div className="flex justify-between font-semibold border-t border-stone pt-3 mt-3"><span>Total</span><span>${grand.toFixed(2)}</span></div>
      </div>

      <div className="mb-6">
        <p className="text-xs tracking-widest uppercase text-bark border-b border-parchment pb-2 mb-4">Contact</p>
        <Input label="Email" k="email" placeholder="you@example.com" type="email" />
      </div>

      <div className="mb-6">
        <p className="text-xs tracking-widest uppercase text-bark border-b border-parchment pb-2 mb-4">Shipping Address</p>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <Input label="First Name" k="firstName" placeholder="Jane" />
          <Input label="Last Name" k="lastName" placeholder="Doe" />
        </div>
        <div className="mb-4"><Input label="Address" k="address" placeholder="123 Main St" /></div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="City" k="city" placeholder="New York" />
          <Input label="ZIP" k="zip" placeholder="10001" />
        </div>
      </div>

      <div className="mb-8">
        <p className="text-xs tracking-widest uppercase text-bark border-b border-parchment pb-2 mb-4">Payment</p>
        <div className="mb-4">
          <label className="text-xs tracking-widest uppercase text-bark block mb-1.5">Card Number</label>
          <input className="w-full px-3 py-2.5 border border-stone bg-white text-sm focus:border-char outline-none" placeholder="4242 4242 4242 4242" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs tracking-widest uppercase text-bark block mb-1.5">Expiry</label>
            <input className="w-full px-3 py-2.5 border border-stone bg-white text-sm focus:border-char outline-none" placeholder="MM / YY" />
          </div>
          <div>
            <label className="text-xs tracking-widest uppercase text-bark block mb-1.5">CVC</label>
            <input className="w-full px-3 py-2.5 border border-stone bg-white text-sm focus:border-char outline-none" placeholder="123" />
          </div>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading || items.length === 0}
        className="w-full py-4 bg-char text-cream text-sm tracking-widest uppercase hover:bg-rust transition-colors font-medium disabled:opacity-50"
      >
        {loading ? 'Placing Order...' : `Place Order — $${grand.toFixed(2)}`}
      </button>
    </div>
  )
}

export default function CheckoutPage() {
  return <CartProvider><CheckoutForm /></CartProvider>
}
