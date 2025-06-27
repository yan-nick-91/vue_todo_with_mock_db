import { pageFixture } from './pageFixture.js'
import dotenv from 'dotenv'
import { chromium, firefox, webkit } from 'playwright'


dotenv.config()

const baseUrl = String(process.env.PLAYWRIGHT_BASE_URL)

const config = {
  headless: true,
  browser: 'chromium',
  width: 1440,
  height: 1080,
}

console.log(config)

const browsers = {
  chromium: chromium,
  firefox: firefox,
  webkit: webkit,
}

export const clearList = async () => {
  const launchBrowser = browsers[config.browser]
  const browserInstance = await launchBrowser.launch({ headless: config.headless })

  const context = await browserInstance.newContext({
    viewport: { width: parseInt(config.width), height: parseInt(config.height) },
  })

  const page = await context.newPage()
  pageFixture.page = page

  await pageFixture.page.goto(baseUrl)

  const list = await pageFixture.page.locator('ul[aria-label="To-Do List"]')
  const inputCheckboxInList = await list.locator('li > div > div > input[type="checkbox"]')
  const inputCheckboxCount = await inputCheckboxInList.count()
  if (inputCheckboxCount > 0) {
    for (let i = 0; i < inputCheckboxCount; i++) {
      const checkbox = inputCheckboxInList.nth(i)
      await checkbox.click()
    }
  }

  const deleteButton = await pageFixture.page.getByRole('button', { name: 'Remove selected items' })
  if (await deleteButton.isVisible()) {
    await deleteButton.click()
  }

  const confimationDialog = pageFixture.page.locator('h2:has-text("Are you sure?")')

  if (await confimationDialog.isVisible()) {
    const confirmButton = pageFixture.page.getByRole('button', { name: 'Yes, remove' })
    await confirmButton.click()
  }
}
