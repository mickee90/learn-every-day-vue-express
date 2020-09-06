import { shallowMount } from "@vue/test-utils";

import Home from "@/views/Home.vue";

describe("Home.vue", () => {
  it("has welcome text as h1", () => {
    const wrapper = shallowMount(Home, { stubs: ["router-link"] });

    expect(wrapper.find("h1").text()).toMatch("Welcome!");
  });

  it("includes a login link", async () => {
    const wrapper = shallowMount(Home, { stubs: ["router-link"] });

    const loginBtn = wrapper.find("#loginBtn");

    expect(loginBtn.attributes("to")).toEqual("[object Object]");
    expect(loginBtn.text()).toEqual("Login");
  });

  it("includes a register link", async () => {
    const wrapper = shallowMount(Home, { stubs: ["router-link"] });

    const loginBtn = wrapper.find("#registerBtn");

    expect(loginBtn.attributes("to")).toEqual("[object Object]");
    expect(loginBtn.text()).toEqual("Register");
  });
});
