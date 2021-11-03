import { driver } from '../extensions/selenium'
const { By, until } = require('selenium-webdriver')
jest.setTimeout(30000)
describe('UI Test Exmaple', () => {
	it('Login page testing', async () => {
		await driver.get('http://localhost:3000/signin')
		const username = driver.findElement(By.id('formBasicUsername'))
		const pwd = driver.findElement(By.id('formBasicPassword'))
		const submitBtn = driver.findElement(By.id('submitBtn'))
		await username.sendKeys('admin')
		await pwd.sendKeys('123456')
		await submitBtn.click()

		driver
			.wait(until.elementLocated(By.id('main')), 5000)
			.then(async (result) => {
				let h1 = await result.getText()
				expect(h1).toMatch('CHÀO MỪNG BẠN')
				driver.close()
			})
	})
})
