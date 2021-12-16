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
var login = async () => {
	driver.get('http://localhost:3000/signin')
	const username = driver.findElement(By.id('formBasicUsername'))
	const pwd = driver.findElement(By.id('formBasicPassword'))
	const submitBtn = driver.findElement(By.id('submitBtn'))

	username.sendKeys('admin')
	pwd.sendKeys('12345')
	submitBtn.click()

	let text = driver.wait(
		until.elementLocated(By.id('contained-modal-title-vcenter')),
		30000
	)
	try {
		console.log(await text.getText())
	} catch (error) {
		console.error(error)
	}

	// driver.findElements(By.className("test1")).then(function(elements){
	//   elements.forEach(function (element) {
	//       element.getText().then(function(text){
	//           console.log(text)
	//       }).catch(err => console.log(err))
	//   })
	// }).catch(err => console.log(err))

	// const elm = driver.findElement(By.id('test'))
	// elm.getText().then(function (text) {
	// 	console.log(text)
	// })
}

function makeid(length) {
	var result = ''
	var characters =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	var charactersLength = characters.length
	for (var i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength))
	}
	return result
}

var signup = async () => {
	// driver.get('http://localhost:3003/signup')
	// const mail = driver.findElement(By.id('emailSignUp'))
	// const username = driver.findElement(By.id('usernameSignUp'))
	// const submitBtn = driver.findElement(By.id('submitBtn'))
	// const user = makeid(6)
	// await mail.sendKeys('huantest65@gmail.com')
	// await username.sendKeys(user)
	// await submitBtn.click()
	// await driver.executeScript('window.open("newURL");')

	gmailProcess()
}

// signup()

const gmailProcess = async () => {
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
		var usernameSignUp = ''

		// setTimeout(async () => {
		// 	let text = await driver.findElement(By.id(':2l')).getText()
		// 	let array = text.split('\n')[1].split(' ')
		// 	usernameSignUp = array[1]
		// }, 10000)

		// console.log(usernameSignUp)

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
		}, 10000)

		console.log(usernameSignUp)
	} catch (error) {}
}

signup()
