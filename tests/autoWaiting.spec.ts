import {test, expect} from 'playwright/test'

test .beforeEach(async ({page}) => {
  await page.goto('http://uitestingplayground.com/ajax')
  await page.getByText('Button Triggering AJAX Request').click()
})

test('Auto-waiting', async({page}) => {
  const successButton = page.locator('.bg-success')
  
  // await successButton.click()
  
  // const text = await successButton.textContent()
  
  // await successButton.waitFor({state: 'attached'})
  // const text = await successButton.allTextContents()
  
  // expect(text).toEqual("Data loaded with AJAX get request.")
  // expect(text).toContain("Data loaded with AJAX get request.")
  
  
  await expect(successButton).toHaveText('Data loaded with AJAX get request.', {timeout: 20000})
  
})

test('Alternative waiting', async ({page}) => {
  const successButton = page.locator('.bg-success')



  // 1. wait for element
// await page.waitForSelector('.bg-success') 

// 2. wait for a particular response
// await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

// 3. wait for network calls to be completed NOT RECOMMENDED
await page.waitForLoadState('networkidle')

  const text = await successButton.allTextContents()
  expect(text).toContain("Data loaded with AJAX get request.")

})