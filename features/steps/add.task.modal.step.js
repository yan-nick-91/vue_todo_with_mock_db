import { Given, When } from '@cucumber/cucumber'
import { pageFixture } from '../support/pageFixture.js'
import dotenv from 'dotenv'

dotenv.config()

const baseUrl = String(process.env.PLAYWRIGHT_BASE_URL)

console.log(baseUrl)

Given('I am on the Home page', async () => {
  await pageFixture.page.goto(baseUrl)
})

When('I click on the {string} button', async (createTaskButton) => {
  const button = await pageFixture.page.getByRole('button', { name: createTaskButton })
  button.click()
})
