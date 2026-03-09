import { Product } from '@/app/page'

export default function ProductGrid({ products, onSelect }: { products: Product[], onSelect: (p: Product) => void }) {
  return (
    <div id="shop" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map(product => {
        const price = product.badge === 'Sale' ? (product.price * 0.8).toFixed(0) : product.price
        return (
          <div
            key={product.id}
            onClick={() => onSelect(product)}
            className="bg-white border border-parchment cursor-pointer hover:-translate-y-1 hover:shadow-xl transition-all duration-200"
          >
            <div className="aspect-[4/3] bg-parchment flex items-center justify-center text-6xl relative">
              {product.badge && (
                <span className={`absolute top-3 left-3 text-xs tracking-widest uppercase px-2 py-0.5 font-medium
                  ${product.badge === 'Bestseller' ? 'bg-gold text-char' : product.badge === 'Sale' ? 'bg-earth text-cream' : 'bg-rust text-white'}`}>
                  {product.badge}
                </span>
              )}
              {product.emoji}
            </div>
            <div className="p-5">
              <p className="text-xs tracking-widest uppercase text-bark mb-1">{product.category}</p>
              <p className="font-serif text-lg mb-2">{product.name}</p>
              <p className="font-medium text-earth">
                ${price}
                {product.badge === 'Sale' && (
                  <span className="line-through text-stone text-sm ml-2">${product.price}</span>
                )}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
