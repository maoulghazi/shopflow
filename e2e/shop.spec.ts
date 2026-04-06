import { test, expect } from '@playwright/test'

test.describe('ShopFlow E2E', () => {
  test('homepage loads and shows products', async ({ page }) => {
    await page.goto('http://localhost:3001')
    await expect(page).toHaveTitle(/ShopFlow/)
    await expect(page.getByText(/made with/i)).toBeVisible()
    await expect(page.getByText(/shop the collection/i)).toBeVisible()
  })

  test('can open product modal', async ({ page }) => {
    await page.goto('http://localhost:3001')
    await page.waitForSelector('.product-card', { timeout: 10000 }).catch(() => {
      // products load from API, wait for them
    })
    const firstProduct = page.locator('[class*="cursor-pointer"]').first()
    await firstProduct.click()
    await expect(page.getByText(/add to cart/i)).toBeVisible()
  })

  test('can add product to cart', async ({ page }) => {
    await page.goto('http://localhost:3001')
    await page.waitForTimeout(2000)
    const firstProduct = page.locator('[class*="cursor-pointer"]').first()
    await firstProduct.click()
    await page.getByText(/add to cart/i).click()
    await expect(page.getByText(/cart/i).first()).toBeVisible()
  })

  test('checkout page loads', async ({ page }) => {
    await page.goto('http://localhost:3001/checkout')
    await expect(page.getByText(/checkout/i)).toBeVisible()
  })
})