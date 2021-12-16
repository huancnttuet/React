const chrome = require('selenium-webdriver/chrome')
const { Builder, By, Key, until } = require('selenium-webdriver')
const serviceBuilder = new chrome.ServiceBuilder(
	// './chromedriver_win32/chromedriver.exe'
	__dirname + '/chromedriver_win32/chromedriver'
)
var driver = new Builder()
	.forBrowser('chrome')
	.setChromeService(serviceBuilder)
	.build()

jest.setTimeout(30000)
test('send mail test', async () => {
	try {
		driver.get('https://mail.google.com/mail/u/0/#inbox')
		const email = driver.findElement(By.id('identifierId'))
		const next = driver.findElement(By.id('identifierNext'))

		await email.sendKeys('huantest65@gmail.com')
		await next.click()
		setTimeout(async () => {
			await driver
				.findElement(By.css("input[type='password"))
				.sendKeys('123!@#qwe')

			await driver.findElement(By.id('passwordNext')).click()
		}, 5000)

		setTimeout(async () => {
			let sendMailBtn = await driver
				.findElement(By.className('T-I T-I-KE L3'))
				.click()
			let receiver = await driver
				.findElement(By.className('vO'))
				.sendKeys('huancnttuet@gmail.com')
			let aoT = await driver
				.findElement(By.className('aoT'))
				.sendKeys('Kiểm thử và đảm bảo chất lượng phần mềm')
			let content = await driver.findElement(
				By.className('Am Al editable LW-avf tS-tW')
			)
			await content.sendKeys('Hello World')
			await content.sendKeys(Key.CONTROL, Key.ENTER)
			setTimeout(async () => {
				let text = await driver.findElement(By.className('bAq')).getText()
				expect(text).toBe('Đã gửi tin nhắn')
			}, 10000)
		}, 10000)
	} catch (error) {}
})

