import Vue from "vue";
import Vuelidate from "vuelidate";
import FlashMessage from "@smartweb/vue-flash-message";

// This makes sure any active promises are resolved before continuing execution
import flushPromises from "flush-promises";

import ProfileEdit from "@/views/Profile/ProfileEdit";
import BaseButton from "@/components/Globals/_base-button.vue";
import BaseInput from "@/components/Globals/_base-input.vue";
import BaseLabel from "@/components/Globals/_base-label.vue";

import store from "@/store";
import { shallowMount } from "@vue/test-utils";

import axios from "@/axios";
import MockAdapter from "axios-mock-adapter";

import router from "@/router";

Vue.use(Vuelidate);
Vue.use(FlashMessage);

const defaultUser = {
  username: "johndoe@mail.com",
  first_name: "JohnDoe",
  last_name: "Doe",
  email: "johndoe@mail.com",
  address: "",
  zip_code: "",
  city: "",
  phone: "",
  disabled: false,
  banned: false
};

describe("@/views/Profile/ProfileEdit.vue", () => {
  let wrapper;
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios);
    store.commit("auth/setUser", defaultUser);
    wrapper = mountWithStore();
    wrapper.vm.$v.$touch();
  });

  afterEach(() => {
    wrapper.destroy();
    wrapper = null;
    mock.reset();
  });

  it("has a username field", () => {
    expect(wrapper.find("#username").element.value).toBe(
      wrapper.vm.$store.getters["auth/getUser"].username
    );
  });

  it("the username field is required", async () => {
    const username = wrapper.find("#username");
    const form = wrapper.find("#ProfileEditForm");

    username.element.value = "";
    username.trigger("input");
    form.trigger("submit.prevent");

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$v.formData.username.$error).toBe(true);
  });

  it("the username field requires an email format", async () => {
    const username = wrapper.find("#username");
    const form = wrapper.find("#ProfileEditForm");

    username.element.value = "";
    username.trigger("input");
    form.trigger("submit.prevent");

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$v.formData.username.$error).toBe(true);

    username.element.value = "Non valid username";
    username.trigger("input");
    form.trigger("submit.prevent");

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$v.formData.username.$error).toBe(true);

    username.element.value = "johndoe@mail.com";
    username.trigger("input");
    form.trigger("submit.prevent");

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$v.formData.username.$error).toBe(false);
  });

  it("has a first name field", () => {
    expect(wrapper.find("#first_name").element.value).toBe(
      wrapper.vm.$store.getters["auth/getUser"].first_name
    );
  });

  it("the first name field is required", async () => {
    const first_name = wrapper.find("#first_name");
    const form = wrapper.find("#ProfileEditForm");

    first_name.element.value = "";
    first_name.trigger("input");
    form.trigger("submit.prevent");

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$v.formData.first_name.$error).toBe(true);
  });

  it("has a last name field", async () => {
    expect(wrapper.find("#last_name").element.value).toBe(
      wrapper.vm.$store.getters["auth/getUser"].last_name
    );
  });

  it("the last name field is required", async () => {
    const last_name = wrapper.find("#last_name");
    const form = wrapper.find("#ProfileEditForm");

    last_name.element.value = "";
    last_name.trigger("input");
    form.trigger("submit.prevent");

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$v.formData.last_name.$error).toBe(true);
  });

  it("has a email field", () => {
    expect(wrapper.find("#email").element.value).toBe(
      wrapper.vm.$store.getters["auth/getUser"].email
    );
  });

  it("the email field is required", async () => {
    const email = wrapper.find("#email");
    const form = wrapper.find("#ProfileEditForm");

    email.element.value = "";
    email.trigger("input");
    form.trigger("submit.prevent");

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$v.formData.email.$error).toBe(true);
  });

  it("has a city field", () => {
    expect(wrapper.find("#city").element.value).toBe(
      wrapper.vm.$store.getters["auth/getUser"].city
    );
  });

  it("the city field is not required", async () => {
    const city = wrapper.find("#city");
    const form = wrapper.find("#ProfileEditForm");

    city.element.value = "";
    city.trigger("input");
    form.trigger("submit.prevent");

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$v.formData.$error).toBe(false);
  });

  it("has a address field", () => {
    expect(wrapper.find("#address").element.value).toBe(
      wrapper.vm.$store.getters["auth/getUser"].address
    );
  });

  it("the address field is not required", async () => {
    const address = wrapper.find("#address");
    const form = wrapper.find("#ProfileEditForm");

    address.element.value = "";
    address.trigger("input");
    form.trigger("submit.prevent");

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$v.formData.$error).toBe(false);
  });

  it("has a zip code field", () => {
    expect(wrapper.find("#zip_code").element.value).toBe(
      wrapper.vm.$store.getters["auth/getUser"].zip_code
    );
  });

  it("the zip code field is not required", async () => {
    const zip_code = wrapper.find("#zip_code");
    const form = wrapper.find("#ProfileEditForm");

    zip_code.element.value = "";
    zip_code.trigger("input");
    form.trigger("submit.prevent");

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$v.formData.$error).toBe(false);
  });

  it("has a phone field", () => {
    expect(wrapper.find("#phone").element.value).toBe(
      wrapper.vm.$store.getters["auth/getUser"].phone
    );
  });

  it("the phone field is not required", async () => {
    const phone = wrapper.find("#phone");
    const form = wrapper.find("#ProfileEditForm");

    phone.element.value = "";
    phone.trigger("input");
    form.trigger("submit.prevent");

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$v.formData.$error).toBe(false);
  });

  it("updates the users profile in case of correct inputs", async () => {
    const mockData = {
      user: {
        username: "email@mail.com",
        first_name: "first_name",
        last_name: "last_name",
        email: "email@mail.com",
        address: "address",
        city: "city",
        zip_code: "zip_code",
        phone: "phone"
      }
    };
    mock.onPut("/users").reply(200, { ...mockData });

    const spyOnSubmit = jest.spyOn(wrapper.vm, "onSubmit");
    const spyDispatch = jest.spyOn(wrapper.vm.$store, "dispatch");

    const form = wrapper.find("#ProfileEditForm");

    const username = wrapper.find("#username");
    username.element.value = mockData.user.username;
    username.trigger("input");

    const first_name = wrapper.find("#first_name");
    first_name.element.value = mockData.user.first_name;
    first_name.trigger("input");

    const last_name = wrapper.find("#last_name");
    last_name.element.value = mockData.user.last_name;
    last_name.trigger("input");

    const email = wrapper.find("#email");
    email.element.value = mockData.user.email;
    email.trigger("input");

    const address = wrapper.find("#address");
    address.element.value = mockData.user.address;
    address.trigger("input");

    const city = wrapper.find("#city");
    city.element.value = mockData.user.city;
    city.trigger("input");

    const zip_code = wrapper.find("#zip_code");
    zip_code.element.value = mockData.user.zip_code;
    zip_code.trigger("input");

    const phone = wrapper.find("#phone");
    phone.element.value = mockData.user.phone;
    phone.trigger("input");

    await form.trigger("submit.prevent");

    await wrapper.vm.$nextTick();

    await flushPromises();

    expect(wrapper.vm.$v.formData.$error).toBe(false);
    expect(spyOnSubmit).toHaveBeenCalled();

    expect(spyDispatch).toHaveBeenCalledWith("auth/updateUser", { ...wrapper.vm.formData });

    expect(wrapper.vm.$store.getters["auth/getUser"].username).toBe("email@mail.com");
    expect(wrapper.vm.$store.getters["auth/getUser"].first_name).toBe("first_name");
    expect(wrapper.vm.$store.getters["auth/getUser"].last_name).toBe("last_name");
    expect(wrapper.vm.$store.getters["auth/getUser"].email).toBe("email@mail.com");
    expect(wrapper.vm.$store.getters["auth/getUser"].address).toBe("address");
    expect(wrapper.vm.$store.getters["auth/getUser"].city).toBe("city");
    expect(wrapper.vm.$store.getters["auth/getUser"].zip_code).toBe("zip_code");
    expect(wrapper.vm.$store.getters["auth/getUser"].phone).toBe("phone");
  });

  // @todo how to test the flash message?
  // it("shows success message when updating the profile successfully", async () => {

  //   const mockData = {
  //     user: {
  //       username: "email@mail.com",
  //       first_name: "first_name",
  //       last_name: "last_name",
  //       email: "email@mail.com",
  //       address: "address",
  //       city: "city",
  //       zip_code: "zip_code",
  //       phone: "phone"
  //     }
  //   };
  //   mock.onPut("/users").reply(200, { ...mockData });

  //   const spyOnSubmit = jest.spyOn(wrapper.vm, "onSubmit");
  //   const spyDispatch = jest.spyOn(wrapper.vm.$store, "dispatch");

  //   const form = wrapper.find("#ProfileEditForm");

  //   const username = wrapper.find("#username");
  //   username.element.value = mockData.user.username;
  //   username.trigger("input");

  //   const first_name = wrapper.find("#first_name");
  //   first_name.element.value = mockData.user.first_name;
  //   first_name.trigger("input");

  //   const last_name = wrapper.find("#last_name");
  //   last_name.element.value = mockData.user.last_name;
  //   last_name.trigger("input");

  //   const email = wrapper.find("#email");
  //   email.element.value = mockData.user.email;
  //   email.trigger("input");

  //   const address = wrapper.find("#address");
  //   address.element.value = mockData.user.address;
  //   address.trigger("input");

  //   const city = wrapper.find("#city");
  //   city.element.value = mockData.user.city;
  //   city.trigger("input");

  //   const zip_code = wrapper.find("#zip_code");
  //   zip_code.element.value = mockData.user.zip_code;
  //   zip_code.trigger("input");

  //   const phone = wrapper.find("#phone");
  //   phone.element.value = mockData.user.phone;
  //   phone.trigger("input");

  //   await form.trigger("submit.prevent");

  //   await wrapper.vm.$nextTick();

  //   await flushPromises();

  //   expect(wrapper.vm.$v.formData.$error).toBe(false);
  //   expect(spyOnSubmit).toHaveBeenCalled();

  //   expect(spyDispatch).toHaveBeenCalledWith("auth/updateUser", { ...wrapper.vm.formData });

  //   await wrapper.vm.$nextTick();
  //   expect(wrapper.text()).toContain("Successfully updated");
  // });
});

function mountWithStore() {
  return shallowMount(ProfileEdit, { store, router, stubs: { BaseInput, BaseButton, BaseLabel } });
}
