import Link from 'next/link'

export default function SuccessPage() {
  return (
    <div className="max-w-md mx-auto text-center px-6 py-24">
      <div className="text-6xl mb-6">📦</div>
      <h1 className="font-serif text-4xl mb-4">Order Confirmed!</h1>
      <p className="text-bark leading-relaxed mb-8">
        Thank you for your order. You'll receive a confirmation email shortly.
        Your items will be carefully packed and dispatched within 2–3 business days.
      </p>
      <Link href="/" className="inline-block bg-char text-cream px-8 py-3 text-sm tracking-widest uppercase hover:bg-rust transition-colors font-medium">
        Continue Shopping
      </Link>
    </div>
  )
}
