import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
  headers: { 'Content-Type': 'application/json' },
})

export default api

// Products
export const getProducts = () => api.get('/api/products')
export const getProduct = (id: string) => api.get(`/api/products/${id}`)

// Cart
export const getCart = (sessionId: string) => api.get(`/api/cart/${sessionId}`)
export const addToCart = (sessionId: string, productId: number, quantity: number) =>
  api.post('/api/cart/add', { sessionId, productId, quantity })
export const updateCartItem = (sessionId: string, productId: number, quantity: number) =>
  api.put('/api/cart/update', { sessionId, productId, quantity })
export const removeCartItem = (sessionId: string, productId: number) =>
  api.delete('/api/cart/remove', { data: { sessionId, productId } })

// Orders
export const createOrder = (data: {
  sessionId: string
  email: string
  name: string
  address: string
  city: string
  zip: string
}) => api.post('/api/orders', data)

export const getOrder = (id: string) => api.get(`/api/orders/${id}`)
