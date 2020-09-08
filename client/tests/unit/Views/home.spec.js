import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import VueRouter from "vue-router";

import Home from "@/views/Home.vue";
import router from "@/router";

const localVue = createLocalVue();
localVue.use(VueRouter);

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
