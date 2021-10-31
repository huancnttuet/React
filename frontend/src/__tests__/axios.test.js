// test('null', () => {
//   const n = null;
//   expect(n).toBeNull();
//   expect(n).toBeDefined();
//   expect(n).not.toBeUndefined();
//   expect(n).not.toBeTruthy();
//   expect(n).toBeFalsy();
// });
//
// test('zero', () => {
//   const z = 0;
//   expect(z).not.toBeNull();
//   expect(z).toBeDefined();
//   expect(z).not.toBeUndefined();
//   expect(z).not.toBeTruthy();
//   expect(z).toBeFalsy();
// });
//
//
// const shoppingList = [
//   'diapers',
//   'kleenex',
//   'trash bags',
//   'paper towels',
//   'beer',
// ];
//
// test('the shopping list has beer on it', () => {
//   expect(shoppingList).toContain('beer');
//   expect(new Set(shoppingList)).toContain('beer');
// });

import axios from 'axios'


test('the data is peanut butter', () => {
	const data = {
		usernameSignIn: 'test1234',
		pwdSignIn: '123456'
	}
	return axios
		.post('http://localhost:8080/users/signin', { data })
		.then((data) => {
			expect(data.data).toMatchObject({ status: 'Success' })
		})
})
