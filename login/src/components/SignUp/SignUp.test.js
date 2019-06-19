import React from "react";
import { shallow, mount } from "enzyme";
import App from "../App";
import SignUp from "./SignUp";
import { authServices } from "services";


let wrapper;
beforeEach(() => {
  wrapper = mount(<App />);
});

afterEach(() => {
  wrapper.unmount();
});

describe("SignUp", () => {
  it("click button signup", () => {
    const loginMock = jest.spyOn(authServices, "signup");
    const wrapper1 = mount(<SignUp />);
    expect(wrapper1.debug()).toMatchSnapshot();
    wrapper1.find("#emailSignUp").simulate("change", {
      target: {
        value: "arsenal"
      }
    });
    wrapper1.find("#usernameSignUp").simulate("change", {
      target: {
        value: "chelsea"
      }
    });
    wrapper1
      .find("#signup-btn")
      .at(0)
      .simulate("click");
    wrapper1
      .find("#signup-btn")
      .at(1)
      .simulate("click");
    expect(loginMock).toHaveBeenCalled();
  });
  test("test API", () => {
    const data = {
      usernameSignUp: `arsenal`,
      emailSignUp: `chelsea`
    };
    return authServices.signup(data).then(data => {
      expect(data.data).toMatchObject({ code: "EXIST" });
    });
  });
  //
});
