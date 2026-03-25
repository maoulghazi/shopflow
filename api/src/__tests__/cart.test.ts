import request from 'supertest'
import app from '../index'

describe('Cart API', () => {
  it('GET /api/cart/:sessionId should return 200 and an array', async () => {
    const res = await request(app).get('/api/cart/test-session-123')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  it('POST /api/cart/add should return 200', async () => {
    const { PrismaClient } = require('@prisma/client')
    const prisma = new PrismaClient()
    prisma.cartItem.upsert.mockResolvedValueOnce({
      id: 1,
      sessionId: 'test-session-123',
      productId: 1,
      quantity: 1,
      product: { id: 1, name: 'Obsidian Desk Lamp', price: 129 },
    })

    const res = await request(app)
      .post('/api/cart/add')
      .send({ sessionId: 'test-session-123', productId: 1, quantity: 1 })

    expect(res.status).toBe(200)
  })

  it('DELETE /api/cart/remove should return 200', async () => {
    const res = await request(app)
      .delete('/api/cart/remove')
      .send({ sessionId: 'test-session-123', productId: 1 })
    expect(res.status).toBe(200)
  })
})