var data = require('../../data/data.js')

test('test orm', async () => {
  var p = await data.checkSignIn(`huanhuan`, `12`)
  expect(p).toMatchObject({id:15})
})


import React from 'react';

import { shallow } from 'enzyme';


import MyComponent from './MyComponent';
import Foo from './Foo';

describe('<MyComponent />', () => {
  it('renders three <Foo /> components', () => {
    const wrapper = shallow(<MyComponent />);
    expect(wrapper.find(Foo)).to.have.lengthOf(3);
  });

});
