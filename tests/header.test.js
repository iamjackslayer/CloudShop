const CustomPage = require('./helpers/CustomPage')
let page

jest.setTimeout(15000)
beforeEach(async () => {
  page = await CustomPage.build()
})

afterEach(async () => {
  await page.closeBrowser()
})

test.skip('Launch a browser', async done => {
  await page.waitForSelector('a.navbar-brand')
  const headerText = await page.$eval('a.navbar-brand', el => el.innerText)
  expect(headerText).toEqual('CLOUDSHOP')
  done()
})
