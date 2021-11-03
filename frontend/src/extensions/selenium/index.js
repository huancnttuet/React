const chrome = require('selenium-webdriver/chrome')
const { Builder } = require('selenium-webdriver')
const base = process.env.PWD
const serviceBuilder = new chrome.ServiceBuilder(
	// __dirname + '\\chromedriver.exe'
	__dirname + '/chromedriver'
)
exports.driver = new Builder()
	.forBrowser('chrome')
	.setChromeService(serviceBuilder)
	.build()
