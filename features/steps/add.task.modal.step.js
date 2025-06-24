import { Given, When, Then } from '@cucumber/cucumber'
import { pageFixture } from '../support/pageFixture.js'
import dotenv from 'dotenv'
import { expect } from 'playwright/test'

dotenv.config()

const baseUrl = String(process.env.PLAYWRIGHT_BASE_URL)

console.log(baseUrl)

Given('I am on the Home page', async () => {
  await pageFixture.page.goto(baseUrl)
})

When('I click on the {string} button to open the create form modal', async (createTaskButton) => {
  const button = await pageFixture.page.getByRole('button', { name: createTaskButton })
  await button.click()
})

When('I should see a modal appearing with a form', async () => {
  const formModal = await pageFixture.page.locator('section[data-id="createFormModal"]')
  expect(formModal).toBeVisible()
})

When(
  'I fill in the value {string} within the task input field with the placeholder {string}',
  async (taskValue, placeholder) => {
    const placeholderValue = await pageFixture.page.locator(
      `#taskInput[placeholder^="${placeholder}"]`,
    )
    await placeholderValue.fill(taskValue)
  },
)

When(
  'I fill in a date in the start date input input field under the label {string}',
  async (dateLabel) => {
    const dateInput = await pageFixture.page.locator(
      `label:has-text("${dateLabel}") ~ input[type="date"]`,
    )

    const startDate = new Date()
    const formattedDate = startDate.toISOString().split('T')[0]
    await dateInput.fill(formattedDate)
  },
)

When('I fill in a date in the end date input field under the label {string}', async (dateLabel) => {
  const dateInput = await pageFixture.page.locator(
    `label:has-text("${dateLabel}") ~ input[type="date"]`,
  )

  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)

  const formattedDate = tomorrow.toISOString().split('T')[0] // "YYYY-MM-DD"

  await dateInput.fill(formattedDate)
})

When('I leave the task input field with the placeholder {string} empty', async (placeholder) => {
  const taskInputField = await pageFixture.page.locator(`
  #taskInput[placeholder^="${placeholder}"]`)
  await taskInputField.fill('')
})

When('I click on the {string} button in order to add the task to the list', async (buttonText) => {
  const button = await pageFixture.page.locator(`button:has-text("${buttonText}")`)
  await expect(button).toBeVisible()
  await button.click()
})

When(
  'I fill in a {string} within in the bullet input field with the placeholder {string}',
  async (item, placeholder) => {
    const bulletItemInputField = await pageFixture.page.locator(
      `#bulletItemInput[placeholder^="${placeholder}"]`,
    )
    await bulletItemInputField.fill(item)
  },
)

When('I leave the bullet input field with the placeholder {string} empty', async (placeholder) => {
  const bulletItemInputField = await pageFixture.page.locator(
    `#bulletItemInput[placeholder^="${placeholder}"]`,
  )
  await bulletItemInputField.fill('')
})

When(
  'I click on the {string} button to add {string} to the bullet list',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (buttonText, _) => {
    const button = await pageFixture.page.locator(`button:has-text("${buttonText}")`)
    await expect(button).toBeVisible()
    await button.click()
  },
)

Then('I should see the {string} added to the todo list', async (task) => {
  const taskItems = await pageFixture.page.locator('a > div')
  const count = await taskItems.count()
  expect(count).toBeGreaterThan(0)

  const lastAddedTaskItem = taskItems.nth(count - 1)
  await expect(lastAddedTaskItem).toContainText(task)
})

Then('I should see a error message {string}', async (errorMessage) => {
  const errorText = await pageFixture.page.locator(`p:has-text("${errorMessage}")`)
  await expect(errorText).toBeVisible()
})

Then('I should see {string} added in the bullet items list', async (item) => {
  const bulletItem = await pageFixture.page.locator(
    `section[data-id="bulletList"] > div > ul > li:has-text("${item}")`,
  )
  await expect(bulletItem).toBeVisible()
})

Then('I should see a error message {string} under the bullet input field', async (errorText) => {
  const errorMessage = await pageFixture.page.locator(
    `div[data-id="bulletInputError"] > p:has-text("${errorText}") `,
  )
  await expect(errorMessage).toBeVisible()
})
