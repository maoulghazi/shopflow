import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()

// POST /api/orders
router.post('/', async (req, res) => {
  const { sessionId, email, name, address, city, zip } = req.body
  try {
    // Get cart items
    const cartItems = await prisma.cartItem.findMany({
      where: { sessionId },
      include: { product: true },
    })

    if (cartItems.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' })
    }

    const subtotal = cartItems.reduce((sum: number, i: typeof cartItems[0]) => sum + i.product.price * i.quantity, 0)
    const shipping = subtotal > 100 ? 0 : 9.99
    const tax = subtotal * 0.08
    const total = subtotal + shipping + tax

    // Create order with items
    const order = await prisma.order.create({
      data: {
        email, name, address, city, zip, total,
        items: {
          create: cartItems.map((i: typeof cartItems[0]) => ({
            productId: i.productId,
            quantity: i.quantity,
            price: i.product.price,
          })),
        },
      },
      include: { items: { include: { product: true } } },
    })

    // Clear cart
    await prisma.cartItem.deleteMany({ where: { sessionId } })

    res.status(201).json(order)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to create order' })
  }
})

// GET /api/orders/:id
router.get('/:id', async (req, res) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: Number(req.params.id) },
      include: { items: { include: { product: true } } },
    })
    if (!order) return res.status(404).json({ error: 'Order not found' })
    res.json(order)
  } catch {
    res.status(500).json({ error: 'Failed to fetch order' })
  }
})

export default router
