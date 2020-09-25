import Vue from "vue";
import Vuelidate from "vuelidate";

import ContactUs from "@/views/ContactUs.vue";
import BaseButton from "@/components/Globals/_base-button.vue";
import { shallowMount } from "@vue/test-utils";
import flushPromises from "flush-promises";

Vue.use(Vuelidate);

describe("@/views/ContactUs.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(ContactUs, { stubs: { BaseButton } });
    wrapper.vm.$v.$touch();
  });

  // @todo add test and functionality for sending emails
  it("calls onSendForm when all inputs are filled and submit button clicked", async () => {
    const spyOnSendForm = jest.spyOn(wrapper.vm, "onSendForm");

    wrapper.vm.email = "validemail@mail.com";
    wrapper.vm.first_name = "john";
    wrapper.vm.last_name = "doe";
    wrapper.vm.message = "My name is not john";

    await wrapper.find("#sendBtn").trigger("click.prevent");

    await wrapper.vm.$nextTick();

    await flushPromises();

    await expect(spyOnSendForm).toHaveBeenCalled();
  });

  it("has only required fields", async () => {
    wrapper.vm.email = "";
    wrapper.vm.first_name = "";
    wrapper.vm.last_name = "";
    wrapper.vm.message = "";

    await wrapper.find("#sendBtn").trigger("click.prevent");

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$v.email.$error).toBe(true);
    expect(wrapper.vm.$v.first_name.$error).toBe(true);
    expect(wrapper.vm.$v.last_name.$error).toBe(true);
    expect(wrapper.vm.$v.message.$error).toBe(true);
  });

  it("requires the email field to have a valid email format", async () => {
    wrapper.vm.email = "";
    await wrapper.find("#sendBtn").trigger("click.prevent");
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$v.email.$error).toBe(true);

    wrapper.vm.email = "not_valid";
    await wrapper.find("#sendBtn").trigger("click.prevent");
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$v.email.$error).toBe(true);

    wrapper.vm.email = "valid@mail.com";
    await wrapper.find("#sendBtn").trigger("click.prevent");
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$v.email.$error).toBe(false);
  });
  it("has a email field", () => {
    expect(wrapper.find("#email").exists()).toBe(true);
  });
  it("has a first name field", () => {
    expect(wrapper.find("#first_name").exists()).toBe(true);
  });
  it("has a last name field", () => {
    expect(wrapper.find("#last_name").exists()).toBe(true);
  });
  it("has a passwmessageord field", () => {
    expect(wrapper.find("#message").exists()).toBe(true);
  });
});
