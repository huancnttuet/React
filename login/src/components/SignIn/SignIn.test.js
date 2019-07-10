import React from "react";
import { shallow, mount } from "enzyme";
import App from "../App";
import SignIn from "./SignIn";
import { authServices } from "services";

import renderer from "react-test-renderer";

// let wrapper;
// beforeEach(() => {
//   wrapper = mount(<App />);
// });

// afterEach(() => {
//   wrapper.unmount();
// });

describe("SignIn", () => {
  it("click button login", () => {
    const loginMock = jest.spyOn(authServices, "login");
    const wrapper1 = mount(<SignIn />);
    const login = renderer.create(<SignIn />).toJSON();
    expect(login).toMatchSnapshot();
    wrapper1.find("#username-signin").simulate("change", {
      target: {
        value: "huanhuan"
      }
    });
    wrapper1.find("#password-signin").simulate("change", {
      target: {
        value: "12"
      }
    });
    wrapper1
      .find("#login-btn")
      .at(0)
      .simulate("click");
    wrapper1
      .find("#login-btn")
      .at(1)
      .simulate("click");
    expect(loginMock).toHaveBeenCalled();
  });
});
