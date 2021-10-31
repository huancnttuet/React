import { driver } from './selenium'
const { By, until } = require('selenium-webdriver')
jest.setTimeout(30000)
describe('UI Test Exmaple', () => {
	it('Login page testing', async () => {
		await driver.get('http://localhost:3000/signin')
		const username = driver.findElement(By.id('formBasicUsername'))
		const pwd = driver.findElement(By.id('formBasicPassword'))
		const submitBtn = driver.findElement(By.id('submitBtn'))

		expect(await driver.findElement(By.id('test'))).toMatchObject(
			'CHÀO MỪNG BẠN'
		)
		await username.sendKeys('test1234')
		await pwd.sendKeys('123456')
		await submitBtn.click()
		const elm = driver.findElement(By.id('test'))
		elm.getText().then(function (text) {
			expect(text).toMatch('text')
		})
		let root = driver
			.wait(until.elementLocated(By.id('main')), 5000)
			.then(async (result) => {
				let h1 = await result.getTagName('h1').getText()
				expect(h1).toMatch('CHÀO MỪNG BẠN')
			})
	})
})
