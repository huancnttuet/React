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

// import axios from 'axios'
//
// test('test /signin', () => {
//   const data = {
//       usernameSignIn: `huanhuan`,
//       pwdSignIn: `'12' AND username='huanhuan'`
//     }
//   return axios.post('http://localhost:8000/signin', {data}).then(data => {
//     expect(data.data).toMatchObject({login:true});
//   });
// })
//
// test('test /signup', () => {
//   const data = {
//     usernameSignUp: `dasddasa`,
//     emailSignUp: `sadasdasd`
//   }
//   return axios.post('http://localhost:8000/signup', {data}).then(data => {
//     expect(data.data).toMatchObject({message:'create new user success '})
//   })
// })
