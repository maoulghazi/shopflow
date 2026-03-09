import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()

// GET /api/products
router.get('/', async (req, res) => {
  try {
    const { category } = req.query
    const products = await prisma.product.findMany({
      where: category ? { category: String(category) } : undefined,
      orderBy: { id: 'asc' },
    })
    res.json(products)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' })
  }
})

// GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    const product = await prisma.product.findUnique({ where: { id: Number(req.params.id) } })
    if (!product) return res.status(404).json({ error: 'Product not found' })
    res.json(product)
  } catch {
    res.status(500).json({ error: 'Failed to fetch product' })
  }
})

export default router
