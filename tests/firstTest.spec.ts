import {test} from '@playwright/test'

test.beforeEach(async ({page}) => {
  await page.goto('http://localhost:4200')
})


test.describe('suite1', () =>{
  test.beforeEach(async ({page}) => {
    await page.getByText('Forms').click()
    })
  
  test('navigate to form layouts', async ({page}) => {
    await page.getByText('Form Layout').click()
  })
  
  test('navigate to the datepicker page', async ({page}) => {
    await page.getByText('Datepicker').click()
  })
})

test.describe('suite2', () =>{

  test('navigate to charts layouts', async ({page}) => {
    await page.getByRole('link',{ name: 'Charts', exact: true}).click()
    await page.getByRole('link',{ name: 'Echarts', exact: true}).click()
  })
  
})