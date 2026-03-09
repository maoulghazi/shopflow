import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()

// GET /api/cart/:sessionId
router.get('/:sessionId', async (req, res) => {
  try {
    const items = await prisma.cartItem.findMany({
      where: { sessionId: req.params.sessionId },
      include: { product: true },
    })
    res.json(items)
  } catch {
    res.status(500).json({ error: 'Failed to fetch cart' })
  }
})

// POST /api/cart/add
router.post('/add', async (req, res) => {
  const { sessionId, productId, quantity = 1 } = req.body
  try {
    const item = await prisma.cartItem.upsert({
      where: { sessionId_productId: { sessionId, productId } },
      update: { quantity: { increment: quantity } },
      create: { sessionId, productId, quantity },
      include: { product: true },
    })
    res.json(item)
  } catch {
    res.status(500).json({ error: 'Failed to add to cart' })
  }
})

// PUT /api/cart/update
router.put('/update', async (req, res) => {
  const { sessionId, productId, quantity } = req.body
  try {
    if (quantity <= 0) {
      await prisma.cartItem.delete({ where: { sessionId_productId: { sessionId, productId } } })
      return res.json({ deleted: true })
    }
    const item = await prisma.cartItem.update({
      where: { sessionId_productId: { sessionId, productId } },
      data: { quantity },
      include: { product: true },
    })
    res.json(item)
  } catch {
    res.status(500).json({ error: 'Failed to update cart' })
  }
})

// DELETE /api/cart/remove
router.delete('/remove', async (req, res) => {
  const { sessionId, productId } = req.body
  try {
    await prisma.cartItem.delete({ where: { sessionId_productId: { sessionId, productId } } })
    res.json({ deleted: true })
  } catch {
    res.status(500).json({ error: 'Failed to remove from cart' })
  }
})

export default router
