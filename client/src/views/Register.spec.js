import Vue from "vue";
import Vuelidate from "vuelidate";

import Register from "@/views/Register";
import BaseButton from "@/components/Globals/_base-button.vue";

import { shallowMount } from "@vue/test-utils";
import flushPromises from "flush-promises";

import axios from "@/axios";
import MockAdapter from "axios-mock-adapter";

import store from "@/store";
import router from "@/router";

Vue.use(Vuelidate);

describe("@/views/Register.vue", () => {
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

  it("dispatch auth/register to be called + redirect to login view", async () => {
    mock.onPost("/register").reply(200);
    const spyDispatch = jest.spyOn(wrapper.vm.$store, "dispatch");

    wrapper.vm.username = "valid_username@mail.com";
    wrapper.vm.first_name = "valid_first_name";
    wrapper.vm.last_name = "valid_last_name";
    wrapper.vm.password = "valid_password";
    wrapper.vm.confirm_password = "valid_password";

    await wrapper.find("#registerBtn").trigger("click.prevent");

    await wrapper.vm.$nextTick();

    await flushPromises();

    const data = {
      username: wrapper.vm.username,
      first_name: wrapper.vm.first_name,
      last_name: wrapper.vm.last_name,
      password: wrapper.vm.password,
      confirm_password: wrapper.vm.confirm_password
    };

    await expect(spyDispatch).toHaveBeenCalledWith("auth/register", data);

    await flushPromises();

    expect(wrapper.vm.$route.name).toBe("Login");
  });

  it("all fields are required", async () => {
    wrapper.vm.username = "";
    wrapper.vm.first_name = "";
    wrapper.vm.last_name = "";
    wrapper.vm.password = "";
    wrapper.vm.confirm_password = "";

    await wrapper.find("#registerBtn").trigger("click.prevent");

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$v.username.$error).toBe(true);
    expect(wrapper.vm.$v.first_name.$error).toBe(true);
    expect(wrapper.vm.$v.last_name.$error).toBe(true);
    expect(wrapper.vm.$v.password.$error).toBe(true);
    expect(wrapper.vm.$v.confirm_password.$error).toBe(true);
  });
  it("the username field requires email", async () => {
    wrapper.vm.username = "";
    await wrapper.find("#registerBtn").trigger("click.prevent");
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$v.username.$error).toBe(true);

    wrapper.vm.username = "invalid_username_format";
    await wrapper.find("#registerBtn").trigger("click.prevent");
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$v.username.$error).toBe(true);

    wrapper.vm.username = "valid_username@mail.com";
    await wrapper.find("#registerBtn").trigger("click.prevent");
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$v.username.$error).toBe(false);
  });
  it("the password field requires 6 chars", async () => {
    wrapper.vm.password = "";
    await wrapper.find("#registerBtn").trigger("click.prevent");
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$v.password.$error).toBe(true);

    wrapper.vm.password = "123";
    await wrapper.find("#registerBtn").trigger("click.prevent");
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$v.password.$error).toBe(true);

    wrapper.vm.password = "123456";
    await wrapper.find("#registerBtn").trigger("click.prevent");
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$v.password.$error).toBe(false);
  });

  it("the password and confirm password field need to match", async () => {
    wrapper.vm.password = "123456";
    wrapper.vm.confirm_password = "";
    await wrapper.find("#registerBtn").trigger("click.prevent");
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$v.confirm_password.$error).toBe(true);

    wrapper.vm.confirm_password = "123";
    await wrapper.find("#registerBtn").trigger("click.prevent");
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$v.confirm_password.$error).toBe(true);

    wrapper.vm.confirm_password = "123456";
    await wrapper.find("#registerBtn").trigger("click.prevent");
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$v.confirm_password.$error).toBe(false);
  });
  it("has a username field", () => {
    expect(wrapper.find("#username").exists()).toBe(true);
  });
  it("has a first name field", () => {
    expect(wrapper.find("#first_name").exists()).toBe(true);
  });
  it("has a last name field", () => {
    expect(wrapper.find("#last_name").exists()).toBe(true);
  });
  it("has a password field", () => {
    expect(wrapper.find("#password").exists()).toBe(true);
  });
  it("has a confirm_password field", () => {
    expect(wrapper.find("#confirm_password").exists()).toBe(true);
  });
});

function mountWithStore() {
  return shallowMount(Register, { router, store, stubs: { BaseButton } });
}
