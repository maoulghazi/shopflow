import request from 'supertest'
import app from '../index'

describe('Products API', () => {
  it('GET /api/products should return 200 and an array', async () => {
    const res = await request(app).get('/api/products')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  it('GET /api/products/:id should return 404 for non-existent product', async () => {
    const res = await request(app).get('/api/products/99999')
    expect(res.status).toBe(404)
    expect(res.body.error).toBe('Product not found')
  })

  it('GET /api/products/:id should return 200 for existing product', async () => {
    (global as any).mockPrismaClient.product.findUnique.mockResolvedValueOnce({
      id: 1,
      name: 'Obsidian Desk Lamp',
      category: 'Lighting',
      price: 129,
      badge: 'New',
      emoji: '🪔',
      description: 'A lamp',
      stock: 100,
    })

    const res = await request(app).get('/api/products/1')
    expect(res.status).toBe(200)
    expect(res.body.name).toBe('Obsidian Desk Lamp')
  })
})