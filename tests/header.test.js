const puppeteer = require('puppeteer')
const tokenFactory = require('./factories/tokenFactory')
const userFactory = require('./factories/userFactory')
let browser

jest.setTimeout(15000)
beforeEach(async () => {
  browser = await puppeteer.launch({
    headless: false
  })
})

afterEach(async () => {
  await browser.close()
})

test('Launch a browser', async done => {
  const page = await browser.newPage()
  await page.goto('http://localhost:3000')
  const headerText = await page.$eval('a.navbar-brand', el => el.innerText)
  expect(headerText).toEqual('CLOUDSHOP')
  done()
})

test('sign in', async done => {
  const adminId = '5fd7b67459fde50f57e1904b'
  const token = tokenFactory(adminId)
  const userInfo = userFactory(token)

  const page = await browser.newPage()
  await page.goto('http://localhost:3000')
  await page.evaluate(userInfo => {
    localStorage.setItem('userInfo', JSON.stringify(userInfo))
  }, userInfo)
  await page.reload()
  await page.waitForSelector('nav a#adminmenu')
  const adminMenuText = await page.$eval('nav a#adminmenu', el => el.innerText)
  expect(adminMenuText).toEqual('Admin')
  done()
})
