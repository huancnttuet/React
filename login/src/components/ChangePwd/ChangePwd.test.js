import React from "react";
import { shallow, mount } from "enzyme";
import App from "../App";
import ChangePwd from "./ChangePwd";
import { authServices } from "services";

let wrapper;
beforeEach(() => {
  wrapper = mount(<App />);
});

afterEach(() => {
  wrapper.unmount();
});

describe("ChangePwd", () => {
  it("click button ", () => {
    const loginMock = jest.spyOn(authServices, "changepwd");
    const wrapper1 = mount(<ChangePwd />);
    expect(wrapper1.debug()).toMatchSnapshot();
    wrapper1.find("#formBasicChangePwd").simulate("change", {
      target: {
        value: "12"
      }
    });
    wrapper1.find("#formBasicPassword1").simulate("change", {
      target: {
        value: "1"
      }
    });
    wrapper1.find("#formBasicPassword2").simulate("change", {
      target: {
        value: "1"
      }
    });
    wrapper1
      .find("#cp-btn")
      .at(0)
      .simulate("click");
    wrapper1
      .find("#cp-btn")
      .at(1)
      .simulate("click");
    expect(loginMock).toHaveBeenCalled();
  });

  test("test API change pwd ", () => {
    const data = {
      id: "4",
      pwd: "12",
      pwdNew: "1"
    };
    return authServices.changepwd(data).then(data => {
      expect(data.data).toMatchObject({ code: "SAIPASS" });
    });
  });
});
