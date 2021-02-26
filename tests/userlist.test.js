jest.setTimeout(15000)
const CustomPage = require('./helpers/CustomPage')
let page
describe('When logged in', () => {
  beforeEach(async () => {
    page = await CustomPage.build()
    await page.login()
  })
  afterEach(async () => {
    await page.closeBrowser()
  })
  test('can see admin dropdown menu', async done => {
    await page.waitForSelector('nav a#adminmenu')
    const adminMenuText = await page.$eval(
      'nav a#adminmenu',
      el => el.innerText
    )
    expect(adminMenuText).toEqual('Admin')
    done()
  })

  test.only('add to cart and proceed to checkout takes user to shipping page ', async done => {
    try {
      await page.waitForSelector('.carousel-item')
      await page.click('.carousel-item')
      await page.waitForSelector('.list-group-item button')
      await page.click('.list-group-item button') // add to cart
      await page.waitForSelector('.list-group-item button')
      await page.click('.list-group-item button') // proceed to checkout
      await page.waitForSelector('h1')
      const shippingTitle = await page.$eval('h1', el => el.innerText)
      expect(shippingTitle).toEqual('SHIPPING')
      done()
    } catch (error) {
      done(error)
    }
  })
})

describe('When not logged in', () => {
  beforeEach(async () => {
    page = await CustomPage.build()
  })
  test.only('add to cart and proceed to checkout redirects user to sign in page', async done => {
    try {
      await page.waitForSelector('.carousel-item')
      await page.click('.carousel-item')
      await page.waitForSelector('.list-group-item button')
      await page.click('.list-group-item button') // add to cart
      await page.waitForSelector('.list-group-item button')
      await page.click('.list-group-item button') // proceed to checkout
      await page.waitForSelector('h1')
      const formTitle = await page.$eval('h1', el => el.innerText)
      expect(formTitle).toEqual('SIGN IN')
      done()
    } catch (error) {
      done(error)
    }
  })
  test.only('create order POST request returns unauthorized response message', async done => {
    const order = {
      orderItems: [],
      shippingAddress: {
        address: 'Singapore',
        city: 'Singapore',
        postalCode: '138698',
        country: 'Singapore'
      },
      paymentMethod: 'Stripe',
      taxPrice: 10,
      shippingPrice: 10,
      totalPrice: 100
    }
    const res = await page.post('http://localhost:5000/api/orders', order)
    expect(res).toEqual({ message: 'Not authorized, no token', stack: null })
    done()
  })
  afterEach(async () => {
    await page.closeBrowser()
  })
})
