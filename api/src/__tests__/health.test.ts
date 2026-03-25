import request from 'supertest'
import app from '../index'
import { Server } from 'http'

let server: Server

beforeAll(() => {
  server = app.listen(0)
})

afterAll((done) => {
  server.close(done)
})

describe('Health Check', () => {
  it('GET /api/health should return 200 and status ok', async () => {
    const res = await request(app).get('/api/health')
    expect(res.status).toBe(200)
    expect(res.body.status).toBe('ok')
  })
})