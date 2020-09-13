import { shallowMount, mount } from "@vue/test-utils";

import Home from "@/views/Home.vue";
import router from "@/router";

describe("Home.vue", () => {
  it("has welcome text as h1", () => {
    const wrapper = shallowMount(Home, { stubs: ["router-link"] });

    expect(wrapper.find("h1").text()).toMatch("Welcome!");
  });

  it("includes a login link", async () => {
    const wrapper = mount(Home, { router });

    const loginBtn = wrapper.find("#loginBtn");

    expect(loginBtn.text()).toEqual("Login");

    await loginBtn.trigger("click");

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$route.name).toBe("Login");
  });

  it("includes a register link", async () => {
    const wrapper = mount(Home, { router });

    const registerBtn = wrapper.find("#registerBtn");

    expect(registerBtn.text()).toEqual("Register");

    await registerBtn.trigger("click");

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$route.name).toBe("Register");
  });
});
