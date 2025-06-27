import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import dotenv from 'dotenv'
import axe from 'axe-core'
import path from 'path'

dotenv.config()

const baseUrl = String(process.env.PLAYWRIGHT_BASE_URL)

test.describe('homepage', () => {
  test('should not have any automatically detectable accessibility issues', async ({
    page,
  }, testInfo) => {
    await page.goto(baseUrl)

    const accessibilityScanResults = await new AxeBuilder({ page })
      .exclude('.vue-devtools__anchor-btn')
      .analyze()

    const pageUrl = page.url()
    const testFile = path.basename(testInfo.file || 'unknown')

    logViolationHandler(accessibilityScanResults, pageUrl, testFile)

    expect(accessibilityScanResults.violations).toHaveLength(0)
  })
})

const logViolationHandler = (
  accessibilityScanResults: axe.AxeResults,
  pageUrl: string,
  testFile: string,
) => {
  const { violations } = accessibilityScanResults

  if (violations.length > 0) {
    console.info(`\nViolations found in [${testFile}] at ${pageUrl}`)

    for (const violation of violations) {
      console.info(`\n- Rule: ${violation.id} (${violation.impact})`)
      console.info(`\n- Help: ${violation.help}`)
      console.info(`\n- More info: ${violation.helpUrl}`)

      violation.nodes.forEach((node, index) => {
        console.log(`Node ${index + 1}`)
        console.log(`Target: ${node.target.join(',')}`)
        console.log(`HTML: ${node.html}`)
        console.log(`Summary: ${node.failureSummary}`)
      })
    }
  }
}
