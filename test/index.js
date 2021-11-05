const chrome = require('selenium-webdriver/chrome')
const { Builder, By, until } = require('selenium-webdriver')
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

login()
