import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const products = [
  { name: 'Obsidian Desk Lamp', category: 'Lighting', price: 129, badge: 'New', emoji: '🪔', description: 'Matte black architectural lamp with warm Edison glow. Weighted cast-iron base.' },
  { name: 'Linen Throw Blanket', category: 'Textiles', price: 89, badge: 'Bestseller', emoji: '🧣', description: 'Stone-washed linen in natural oat. Generously sized at 160×200cm.' },
  { name: 'Ceramic Pour-Over', category: 'Kitchen', price: 64, badge: null, emoji: '☕', description: 'Hand-thrown stoneware dripper with natural glaze variation. Fits 1–4 cups.' },
  { name: 'Walnut Serving Board', category: 'Kitchen', price: 110, badge: 'Sale', emoji: '🪵', description: 'Live-edge American walnut. Each board is unique. Food-safe oil finish.' },
  { name: 'Beeswax Candle Set', category: 'Home', price: 48, badge: null, emoji: '🕯️', description: 'Set of 3 hand-poured pillar candles. Honey-scented, 40hr burn each.' },
  { name: 'Rattan Floor Basket', category: 'Storage', price: 75, badge: 'New', emoji: '🧺', description: 'Hand-woven natural rattan. Perfect for throws, laundry, or firewood.' },
  { name: 'Lava Stone Coasters', category: 'Home', price: 38, badge: null, emoji: '🪨', description: 'Set of 4. Genuine volcanic basalt, laser-cut to 10cm squares. Absorbs heat.' },
  { name: 'Brass Wall Hook Set', category: 'Storage', price: 52, badge: 'Bestseller', emoji: '🔩', description: 'Set of 5 solid brass hooks. Unlacquered — will patina beautifully with time.' },
]

async function main() {
  console.log('🌱 Seeding database...')
  for (const product of products) {
    await prisma.product.upsert({
      where: { id: products.indexOf(product) + 1 },
      update: {},
      create: product,
    })
  }
  console.log('✅ Seeding complete.')
}

main().catch(console.error).finally(() => prisma.$disconnect())
