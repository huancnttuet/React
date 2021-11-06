import { driver } from '../extensions/selenium'
const { By, until } = require('selenium-webdriver')
jest.setTimeout(300000)

const makeUsername = (length) => {
	var result = ''
	var characters =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	var charactersLength = characters.length
	for (var i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength))
	}
	return result
}

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
		let usernameSignUp = ''
		setTimeout(async () => {
			let text = await driver.findElement(By.id(':2l')).getText()
			let array = text.split('\n')[1].split(' ')
			usernameSignUp = array[1]
		}, 15000)

		return usernameSignUp
	} catch (error) {}
}

describe('Sign up page testing', () => {
	it('Sign up success', async () => {
		driver.get('http://localhost:3000/signup')
		const mail = driver.findElement(By.id('emailSignUp'))
		const username = driver.findElement(By.id('usernameSignUp'))
		const submitBtn = driver.findElement(By.id('submitBtn'))
		const user = makeUsername(6)
		await mail.sendKeys('huantest65@gmail.com')
		await username.sendKeys(user)
		await submitBtn.click()

		let userSignup = await gmailProcess()

		expect(userSignup).toEqual(user)
	})
})
