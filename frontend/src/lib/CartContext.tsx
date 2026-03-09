'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { v4 as uuidv4 } from 'uuid'

interface CartItem {
  id: number
  name: string
  price: number
  emoji: string
  qty: number
}

interface CartContextType {
  items: CartItem[]
  sessionId: string
  add: (product: Omit<CartItem, 'qty'>) => void
  remove: (id: number) => void
  update: (id: number, qty: number) => void
  clear: () => void
  total: number
  count: number
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [sessionId] = useState(() => {
    if (typeof window === 'undefined') return uuidv4()
    const stored = localStorage.getItem('shopflow_session')
    if (stored) return stored
    const id = uuidv4()
    localStorage.setItem('shopflow_session', id)
    return id
  })

  const add = (product: Omit<CartItem, 'qty'>) => {
    setItems(prev => {
      const found = prev.find(i => i.id === product.id)
      if (found) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...product, qty: 1 }]
    })
  }

  const remove = (id: number) => setItems(prev => prev.filter(i => i.id !== id))

  const update = (id: number, qty: number) => {
    if (qty <= 0) return remove(id)
    setItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i))
  }

  const clear = () => setItems([])

  const total = items.reduce((s, i) => s + i.price * i.qty, 0)
  const count = items.reduce((s, i) => s + i.qty, 0)

  return (
    <CartContext.Provider value={{ items, sessionId, add, remove, update, clear, total, count }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
