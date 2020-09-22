import Vue from "vue";
import Vuelidate from "vuelidate";

import Login from "@/views/Login";
import BaseButton from "@/components/Globals/_base-button.vue";
import BaseInput from "@/components/Globals/_base-input.vue";
import BaseLabel from "@/components/Globals/_base-label.vue";

import flushPromises from "flush-promises";

import store from "@/store";
import { shallowMount } from "@vue/test-utils";

import axios from "@/axios";
import MockAdapter from "axios-mock-adapter";

import router from "@/router";

Vue.use(Vuelidate);

describe("@/views/Login", () => {
  let wrapper;
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios);
    wrapper = mountWithStore();
    wrapper.vm.$v.$touch();
  });

  afterEach(() => {
    wrapper.destroy();
    wrapper = null;
    mock.reset();
  });

  it("has a username field", () => {
    expect(wrapper.find("#username").exists()).toBe(true);
  });
  it("has a password field", () => {
    expect(wrapper.find("#password").exists()).toBe(true);
  });
  it("requires both username and password for login", () => {
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
    mock.onPost("/login").reply(200, { data: { user: { username: "johndoe@mail.com" } } });

    const spyDispatch = jest.spyOn(wrapper.vm.$store, "dispatch");

    const username = wrapper.find("#username");
    const password = wrapper.find("#password");

    username.element.value = "johndoe@mail.com";
    password.element.value = "password";

    username.trigger("input");
    password.trigger("input");

    await wrapper.find("#submitBtn").trigger("click.prevent");

    await wrapper.vm.$nextTick();

    await flushPromises();

    await expect(spyDispatch).toHaveBeenCalledWith("auth/login", {
      username: username.element.value,
      password: password.element.value
    });

    await flushPromises();

    expect(wrapper.vm.$route.name).toBe("Posts");
  });

  // @TODO Add to see error message
  it("Does not redirect on failing login", async () => {
    const startPathName = wrapper.vm.$route.name;

    mock.onPost("/login").reply(404);

    const spyDispatch = jest.spyOn(wrapper.vm.$store, "dispatch");

    const username = wrapper.find("#username");
    const password = wrapper.find("#password");

    username.element.value = "johndoe@mail.com";
    password.element.value = "wrong_password";

    username.trigger("input");
    password.trigger("input");

    await wrapper.find("#submitBtn").trigger("click.prevent");

    await wrapper.vm.$nextTick();

    await flushPromises();

    await expect(spyDispatch).toHaveBeenCalledWith("auth/login", {
      username: username.element.value,
      password: password.element.value
    });

    await flushPromises();

    // No redirection
    expect(wrapper.vm.$route.name).toBe(startPathName);
  });
});

function mountWithStore() {
  return shallowMount(Login, { store, router, stubs: { BaseInput, BaseButton, BaseLabel } });
}
