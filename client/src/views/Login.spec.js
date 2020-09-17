import Vue from "vue";
import Vuelidate from "vuelidate";

import Login from "@/views/Login";

import flushPromises from "flush-promises";
Vue.use(Vuelidate);

describe("@/views/Login", () => {
  it("has a username field", () => {
    const wrapper = mountWithStore();
    expect(wrapper.find("#username").exists()).toBe(true);
  });
  it("has a password field", () => {
    const wrapper = mountWithStore();
    expect(wrapper.find("#password").exists()).toBe(true);
  });
  it("requires both username and password for login", () => {
    const wrapper = mountWithStore();
    wrapper.vm.$v.$touch();

    const username = wrapper.find("#username");
    const password = wrapper.find("#password");

    username.element.value = "";
    password.element.value = "";

    username.trigger("input");
    password.trigger("input");

    wrapper.vm.$nextTick();

    expect(wrapper.vm.$v.username.$error).toBe(true);
    expect(wrapper.vm.$v.password.$error).toBe(true);
  });
  it("requires username in email format", () => {
    const wrapper = mountWithStore();
    wrapper.vm.$v.$touch();

    const username = wrapper.find("#username");

    expect(wrapper.vm.$v.username.$error).toBe(true);

    username.element.value = "invalid_username_type";
    username.trigger("input");

    wrapper.vm.$nextTick();

    expect(wrapper.vm.$v.username.$error).toBe(true);

    username.element.value = "valid_format@mail.com";
    username.trigger("input");

    wrapper.vm.$nextTick();

    expect(wrapper.vm.$v.username.$error).toBe(false);
  });
  it("redirects to posts on successful login", async () => {
    const wrapper = mountWithStore();

    const spyDispatch = spyOn(wrapper.vm.$store, "dispatch");
    wrapper.vm.$v.$touch();

    const username = wrapper.find("#username");
    const password = wrapper.find("#password");

    username.element.value = "joedoe@email.com";
    password.element.value = "passwordz";

    username.trigger("input");
    password.trigger("input");

    await wrapper.find("#submitBtn").trigger("click.prevent");

    await wrapper.vm.$nextTick();

    await flushPromises();

    await expect(spyDispatch).toHaveBeenCalled();

    // @TODO add expect for redirect as well
  });

  // @TODO add test for failing login
  // @TODO add test for failing login
});

function mountWithStore() {
  const actions = {
    login: jest.fn(),
    logout: jest.fn()
  };

  return mount(Login, {
    ...createComponentMocks({
      store: {
        auth: {
          namespaced: true,
          actions
        }
      }
    })
  });
}
