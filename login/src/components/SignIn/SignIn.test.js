import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../App';
import SignIn from './SignIn';
import { authServices } from 'services'
import axios from 'axios'
import renderer from 'react-test-renderer'

let wrapper
beforeEach(() => {
    wrapper = mount(<App />);
});

afterEach(() => {
  wrapper.unmount();
})

describe('SignIn', () => {
  it('click button login', () => {
    const loginMock = jest.spyOn(authServices, 'login')
    const wrapper1 = shallow(<SignIn />);
    const login = renderer.create(<SignIn />).toJSON();
    expect(login).toMatchSnapshot();
    wrapper1.find('#username').simulate('change', {target: {
      value: 'huanhuan'
    }})
    wrapper1.find('#password').simulate('change', {target: {
      value: '12'
    }})
    wrapper1.find('#login-btn').simulate('click')
    expect(loginMock).toHaveBeenCalled();
  });
  test('test API', () => {
    const data = {
      usernameSignIn: `huanhuan`,
      pwdSignIn: `12`
    }
    return authServices.login(data).then(data => {
      expect(data.data).toMatchObject({code: 'SUCCESS'});
    });
  });

});
