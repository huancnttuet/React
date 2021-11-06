import { driver } from '../extensions/selenium'
const { By, until } = require('selenium-webdriver')
jest.setTimeout(30000)
describe('Login page testing', () => {
	it('Login success', async () => {
		await driver.get('http://localhost:3000/signin')
		const usernameElement = driver.findElement(By.id('formBasicUsername'))
		const pwdElement = driver.findElement(By.id('formBasicPassword'))
		const submitBtn = driver.findElement(By.id('submitBtn'))
		await usernameElement.sendKeys('admin')
		await pwdElement.sendKeys('123456')
		await submitBtn.click()
		let text = driver.wait(until.elementLocated(By.id('main')), 5000)
		let h1 = await text.getText()
		expect(h1).toEqual('WELCOME')
	})

	it('Login fail', async () => {
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
			let h1 = await text.getText()
			driver.quit()
			expect(h1).toEqual('Login failed')
		} catch (error) {
			console.error(error)
		}
	})
})
