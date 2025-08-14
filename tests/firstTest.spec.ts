import {test} from '@playwright/test'

test.beforeEach(async ({page}) => {
  await page.goto('http://localhost:4200')
  await page.getByText('Forms').click()
  await page.getByText('Form Layout').click()
})

test('Locator syntax rules', async ({page}) => {
  // By Tag name
  page.locator('input')

  // By ID
  await page.locator('#inputEmail1').click()

  // By Class value
  page.locator('.shape-rectangle')
  
  // By Attribute
  page.locator('[placeholder="Email"]')
  
  // By Class value (full)
  page.locator('.input-full-width size-medium status-basic shape-rectangle nb-transition')

  // Combine different selectors
  page.locator('input[placeholder="Email][nbinput]')

  // by XPath (But not recommended)
  page.locator('//*[@id="inputEmail1"]')

  // By Partial text match
  page.locator(':text("Using")')

  // By Exact text match
  page.locator(':text("Using the Grid")')
})

test('User facing locators', async ({page}) => {
  await page.getByRole('textbox', {name: "Email"}).first().click()
  await page.getByRole('button', {name: "Sign in"}).first().click()
  
  await page.getByLabel('Email').first().click()
  
  await page.getByPlaceholder('Jane Doe').click()
  
  await page.getByText('Using the Grid').click()

  await page.getByTestId('Signin').click()
  
  await page.getByTitle('IoT Dashboard').click()

})