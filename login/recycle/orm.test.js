// var data = require('../../data/data.js')
//
// test('test orm', async () => {
//   var p = await data.checkSignIn(`huanhuan`, `12`)
//   expect(p).toMatchObject({id:15})
// })

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

// import React from 'react';
// import { shallow, mount } from 'enzyme';
// import App from '../components/App';
// import SignIn from '../components/SignIn';
// import SignUp from '../components/SignUp';
// import TopPage from '../components/TopPage'
// import Home from '../components/Home'
//
// let wrapper
// beforeEach(() => {
//     wrapper = mount(<App />);
// });
//
// afterEach(() => {
//   wrapper.unmount();
// })
//
// describe('<MyComponent />', () => {
//   it('renders <TopPage /> components', () => {
//     expect(wrapper.debug()).toMatchSnapshot();
//   });
//   it('renders <SignIn /> components', () => {
//     const wrapper1 = mount(<SignIn />);
//     wrapper1.find('#form-basic-username').simulate('change', {target: {
//       value: 'huanhuan'
//     }})
//     wrapper1.find('#formBasicPassword').simulate('change', {target: {
//       value: '12'
//     }})
//     wrapper1.find('#login-btn').at(0).simulate('click')
//     wrapper1.find('#login-btn').at(1).simulate('click')
//      expect(wrapper1.debug()).toMatchSnapshot();
//   });
// });
