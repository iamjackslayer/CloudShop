const puppeteer = require('puppeteer')
const tokenFactory = require('../factories/tokenFactory')
const userFactory = require('../factories/userFactory')
class CustomPage {
  constructor(page, browser) {
    this.browser = browser
    this.page = page
  }

  static async build() {
    let browser = await puppeteer.launch({
      headless: false
    })
    let page = await browser.newPage()
    await page.setBypassCSP(true)
    await page.goto('http://localhost:3000')
    let customPage = new CustomPage(page, browser)

    return new Proxy(customPage, {
      get: function (target, property) {
        return customPage[property] || page[property]
      }
    })
  }

  async closeBrowser() {
    await this.browser.close()
  }

  async login() {
    let adminId = '5fd7b67459fde50f57e1904b'
    let token = tokenFactory(adminId)
    let userInfo = userFactory(adminId, token)
    await this.page.setBypassCSP(true)
    await this.page.goto('http://localhost:3000')
    await this.page.evaluate(userInfo => {
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
    }, userInfo)
    await this.page.reload()
  }

  get(path) {
    return this.page.evaluate(_path => {
      const config = {
        method: 'get'
      }
      return fetch(_path, config).then(res => res.json())
    }, path)
  }

  post(path, body) {
    return this.page.evaluate(
      (_path, _body) => {
        return fetch(_path, {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(_body)
        }).then(res => res.json())
      },
      path,
      body
    )
  }
}
module.exports = CustomPage
