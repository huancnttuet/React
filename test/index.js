const chrome = require('selenium-webdriver/chrome')
const { Builder, By } = require('selenium-webdriver')
const serviceBuilder = new chrome.ServiceBuilder(
	'./chromedriver_win32/chromedriver.exe'
)
var driver = new Builder()
	.forBrowser('chrome')
	.setChromeService(serviceBuilder)
	.build()
var login = async function () {
	await driver.get('http://localhost:3000/signin')
	const username = driver.findElement(By.id('formBasicUsername'))
	const pwd = driver.findElement(By.id('formBasicPassword'))
	const submitBtn = driver.findElement(By.id('submitBtn'))

	const elm = driver.findElement(By.id('test'))
	elm.getText().then(function (text) {
		console.log(text)
	})
}

login()
