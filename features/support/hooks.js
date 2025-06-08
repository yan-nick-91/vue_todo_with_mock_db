import { After, AfterAll, Before, BeforeAll, setDefaultTimeout, Status } from '@cucumber/cucumber'
import { chromium, firefox, webkit } from '@playwright/test'
import { pageFixture } from './pageFixture.js'

console.log('Hooks file is loaded')

const config = {
  headless: false,
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

let browserInstance = null

setDefaultTimeout(60 * 1000) // 1 min

BeforeAll(async function () {
  console.info('Starting the hook process')
  // createMockDBForTesting()
})

const initializeBrowserSetup = async (selectedBrowser) => {
  const launchBrowser = browsers[selectedBrowser]

  if (!launchBrowser) {
    throw new Error(
      `Selected Browser is invalid. Please choose on of the three options: chromium, firefox, webkit`,
    )
  }

  return await launchBrowser.launch({ headless: config.headless })
}

Before(async function () {
  try {
    browserInstance = await initializeBrowserSetup(config.browser)
    console.log(`Browser setup initialized for: ${config.browser}`)

    const context = await browserInstance.newContext({
      viewport: { width: parseInt(config.width), height: parseInt(config.height) },
    })

    const page = await context.newPage()
    pageFixture.page = page
  } catch (error) {
    console.error('Something went wrong during the initialization process:', error)
  }
})

After(async function ({ pickle, result }) {
  if (result?.status === Status.FAILED) {
    if (pageFixture.page) {
      const screenshotPath = `./reports/screenshots/${pickle.name}-${Date.now()}.png`
      const image = await pageFixture.page.screenshot({
        path: screenshotPath,
        type: 'png',
      })
      await this.attach(image, 'image/png')
    } else {
      console.error('pageFixture.page is undefined')
    }
  }

  if (browserInstance) {
    await pageFixture.page?.close()
    await browserInstance.close()
  }
})

AfterAll(async function () {
  console.info('Completing hook process for testing')
  // removeMockDBIfExists()
  console.info('Hook process completed')
})
