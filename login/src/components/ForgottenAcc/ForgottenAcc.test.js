import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../App';
import ForgottenAcc from './ForgottenAcc';
import { authServices } from 'services'
import axios from 'axios'

let wrapper
beforeEach(() => {
    wrapper = mount(<App />);
});

afterEach(() => {
  wrapper.unmount();
})

describe('ForgottenAcc', () => {
  it('click button ', () => {
    const loginMock = jest.spyOn(authServices, 'forgottenacc')
    const wrapper1 = mount(<ForgottenAcc />);
    expect(wrapper1.debug()).toMatchSnapshot();
    wrapper1.find('#emailFA').simulate('change', {target: {
      value: 'arsenal'
    }})

    wrapper1.find('#fa-btn').at(0).simulate('click')
    wrapper1.find('#fa-btn').at(1).simulate('click')
   expect(loginMock).toHaveBeenCalled();
  });
  test('test API', () => {
    const data = {
      emailFA: `arsenal`,
    }
    return authServices.forgottenacc(data).then(data => {
      expect(data.data).toMatchObject({code: 'NOTFOUND'});
    });
  });

});
