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

test('reset password test', async () => {
	var mail1 = 'huantest66@gmail.com'
	var mail2 = 'huantest65@gmail.com'
	try {
		driver.get('https://mail.google.com/mail/u/0/#inbox')
		const email = driver.findElement(By.id('identifierId'))
		const next = driver.findElement(By.id('identifierNext'))

		await email.sendKeys(mail1)
		await next.click()
		setTimeout(async () => {
			let btn = await driver.findElements(By.css("span[jsname='V67aGc']"))
			await btn[1].click()
			setTimeout(async () => {
				let btn = await driver.findElements(By.css("span[jsname='V67aGc']"))
				await btn[1].click()
				setTimeout(async () => {
					let btn = await driver.findElements(By.css("span[jsname='V67aGc']"))
					await btn[2].click()

					setTimeout(async () => {
						await driver
							.findElement(By.css("input[type='email"))
							.sendKeys(mail2)

						await driver.findElement(By.css("span[jsname='V67aGc']")).click()
						await driver.executeScript(
							"window.open('https://accounts.google.com/signin/v2/identifier?continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&service=mail&sacu=1&rip=1&flowName=GlifWebSignIn&flowEntry=ServiceLogin', '_blank');"
						)
						setTimeout(async () => {
							let tabs = await driver.getAllWindowHandles()
							await driver.switchTo().window(tabs[1])
							await driver
								.findElement(By.css("input[type='email"))
								.sendKeys(mail2)

							let nextBtn = await driver.findElements(
								By.css("span[jsname='V67aGc']")
							)
							nextBtn[0].click()
							setTimeout(async () => {
								await driver
									.findElement(By.css("input[type='password"))
									.sendKeys('123!@#qwe')
								let btnNext = await driver.findElements(
									By.css("span[jsname='V67aGc']")
								)
								btnNext[0].click()
								setTimeout(async () => {
									let numberEle = await driver.findElements(
										By.xpath(
											"//*[contains(text(), 'Mã xác minh bạn cần dùng để truy cập')]"
										)
									)
									let text = await numberEle[0].getText()
									let numb = text.match(/\d/g)
									numb = numb.join('')
									let number = numb.substring(numb.length - 6, numb.length)
									let tabs = await driver.getAllWindowHandles()
									await driver.switchTo().window(tabs[0])
									setTimeout(async () => {
										await driver
											.findElement(By.css("input[type='tel"))
											.sendKeys(number)

										let btnNext1 = await driver.findElements(
											By.css("span[jsname='V67aGc']")
										)
										btnNext1[0].click()
									}, 5000)
								}, 10000)
							}, 5000)
						}, 5000)

						// let tabs = await driver.getAllWindowHandles()
						// await driver.switchTo().window(tabs[0])
						// setTimeout(async () => {
						// 	let texts = await driver.findElement(
						// 		By.css("div[jsname='B34EJ']")
						// 	)
						// 	expect(texts.getText()).toBe(
						// 		'Mật khẩu không chính xác. Hãy thử lại hoặc nhấp vào "Bạn quên mật khẩu" để đặt lại mật khẩu.'
						// 	)
						// }, 10000)
					}, 5000)
				}, 5000)
			}, 5000)
		}, 5000)

		// setTimeout(async () => {
		// 	await driver
		// 		.findElement(By.css("input[type='password"))
		// 		.sendKeys('123!@#qwe1')

		// 	await driver.findElement(By.id('passwordNext')).click()
		// 	setTimeout(async () => {
		// 		let texts = await driver.findElement(By.css("div[jsname='B34EJ']"))

		// 		expect(texts.getText()).toBe(
		// 			'Mật khẩu không chính xác. Hãy thử lại hoặc nhấp vào "Bạn quên mật khẩu" để đặt lại mật khẩu.'
		// 		)
		// 	}, 10000)
		// }, 5000)
	} catch (error) {}
})
