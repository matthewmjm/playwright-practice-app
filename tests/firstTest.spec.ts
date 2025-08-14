import {test, expect} from '@playwright/test'

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

test('Finding child elements', async ({page}) => {
  await page.locator('nb-card nb-radio :text-is("Option 1")').click()
  await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()
  
  await page.locator('nb-card').getByRole('button', {name: "Sign in"}).first().click()

  await page.locator('nb-card').nth(3).getByRole('button').click()
  

})

test('Finding parent elements', async ({page}) => {
  // Approach One
  await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"}).click()
  await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('textbox', {name: "Email"}).click()
  
  // filter and locator method
  await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox', {name: "Email"}).click()
  await page.locator('nb-card', {has: page.locator('.status-danger')}).getByRole('textbox', {name: "Password"}).click()

  // filters allow for chaining
  await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: "Sign in"}).getByRole('textbox', {name: "Email"}).click()

  // Approach Two - not recommended : goes one level up
  await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', {name: "Email"}).click()

})


test('Resuing the locators', async ({page})=> {
  await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox', {name: "Email"}).fill('test@test.com')
  await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox', {name: "Password"}).fill('Welcome123')
  await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('button').click()


  // Refactor
  const basicForm = page.locator('nb-card').filter({hasText: "Basic Form"})
  await basicForm.getByRole('textbox', {name: "Email"}).fill('test@test.com')
  await basicForm.getByRole('textbox', {name: "Password"}).fill('Welcome123')
  await basicForm.getByRole('button').click()
  
  // Further Refactor
  const emailField = basicForm.getByRole('textbox', {name: "Email"})
  const passwordField = basicForm.getByRole('textbox', {name: "Password"})
  await emailField.fill('test@test.com')
  await passwordField.fill('Welcome123')
  await basicForm.getByRole('button').click()

  // Assertion
  await expect(emailField).toHaveValue('test@test.com')

})