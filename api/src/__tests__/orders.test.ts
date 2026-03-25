import request from 'supertest'
import app from '../index'

describe('Orders API', () => {
  it('POST /api/orders should return 400 if cart is empty', async () => {
    const res = await request(app)
      .post('/api/orders')
      .send({
        sessionId: 'empty-session',
        email: 'test@test.com',
        name: 'Test User',
        address: '123 Main St',
        city: 'New York',
        zip: '10001',
      })
    expect(res.status).toBe(400)
    expect(res.body.error).toBe('Cart is empty')
  })

  it('GET /api/orders/:id should return 404 for non-existent order', async () => {
    const res = await request(app).get('/api/orders/99999')
    expect(res.status).toBe(404)
    expect(res.body.error).toBe('Order not found')
  })
})