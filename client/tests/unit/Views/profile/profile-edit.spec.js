import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Vuelidate from "vuelidate";

import ProfileEdit from "@/views/Profile/ProfileEdit";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Vuelidate);

describe("ProfileEdit.vue", () => {
  let state;
  let store;

  beforeEach(() => {
    const defaultUser = {
      username: "joedoe@mail.com",
      first_name: "Joe",
      last_name: "Doe",
      email: "joedoe@mail.com",
      address: "",
      zip_code: "",
      city: "",
      phone: "",
      disabled: false,
      banned: false
    };

    state = {
      user: defaultUser
    };

    store = new Vuex.Store({
      modules: {
        auth: {
          namespaced: true,
          state
        }
      }
    });
  });

  it("has a username field", () => {
    const wrapper = shallowMount(ProfileEdit, { store, localVue });

    expect(wrapper.find("#usernameInput").element.value).toBe(state.user.username);
  });

  it("the username field is required", async () => {
    const wrapper = shallowMount(ProfileEdit, { store, localVue });
    wrapper.vm.$v.$touch();

    const usernameInput = wrapper.find("#usernameInput");
    const form = wrapper.find("#ProfileEditForm");

    usernameInput.element.value = "";
    usernameInput.trigger("input");
    form.trigger("submit.prevent");

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$v.user.username.$error).toBe(true);
  });

  it("has a first name field", () => {
    const wrapper = shallowMount(ProfileEdit, { store, localVue });

    expect(wrapper.find("#firstNameInput").element.value).toBe(state.user.first_name);
  });

  it("the first name field is required", async () => {
    const wrapper = shallowMount(ProfileEdit, { store, localVue });
    wrapper.vm.$v.$touch();

    const firstNameInput = wrapper.find("#firstNameInput");
    const form = wrapper.find("#ProfileEditForm");

    firstNameInput.element.value = "";
    firstNameInput.trigger("input");
    form.trigger("submit.prevent");

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$v.user.first_name.$error).toBe(true);
  });

  it("has a last name field", () => {
    const wrapper = shallowMount(ProfileEdit, { store, localVue });

    expect(wrapper.find("#lastNameInput").element.value).toBe(state.user.last_name);
  });

  it("the last name field is required", async () => {
    const wrapper = shallowMount(ProfileEdit, { store, localVue });
    wrapper.vm.$v.$touch();

    const lastNameInput = wrapper.find("#lastNameInput");
    const form = wrapper.find("#ProfileEditForm");

    lastNameInput.element.value = "";
    lastNameInput.trigger("input");
    form.trigger("submit.prevent");

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$v.user.last_name.$error).toBe(true);
  });

  it("has a email field", () => {
    const wrapper = shallowMount(ProfileEdit, { store, localVue });

    expect(wrapper.find("#emailInput").element.value).toBe(state.user.email);
  });

  it("the email field is required", async () => {
    const wrapper = shallowMount(ProfileEdit, { store, localVue });
    wrapper.vm.$v.$touch();

    const emailInput = wrapper.find("#emailInput");
    const form = wrapper.find("#ProfileEditForm");

    emailInput.element.value = "";
    emailInput.trigger("input");
    form.trigger("submit.prevent");

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$v.user.email.$error).toBe(true);
  });

  it("has a city field", () => {
    const wrapper = shallowMount(ProfileEdit, { store, localVue });

    expect(wrapper.find("#cityInput").element.value).toBe(state.user.city);
  });

  it("the city field is not required", async () => {
    const wrapper = shallowMount(ProfileEdit, { store, localVue });
    wrapper.vm.$v.$touch();

    const cityInput = wrapper.find("#cityInput");
    const form = wrapper.find("#ProfileEditForm");

    cityInput.element.value = "";
    cityInput.trigger("input");
    form.trigger("submit.prevent");

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$v.user.$error).toBe(false);
  });

  it("has a address field", () => {
    const wrapper = shallowMount(ProfileEdit, { store, localVue });

    expect(wrapper.find("#addressInput").element.value).toBe(state.user.address);
  });

  it("the address field is not required", async () => {
    const wrapper = shallowMount(ProfileEdit, { store, localVue });
    wrapper.vm.$v.$touch();

    const addressInput = wrapper.find("#addressInput");
    const form = wrapper.find("#ProfileEditForm");

    addressInput.element.value = "";
    addressInput.trigger("input");
    form.trigger("submit.prevent");

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$v.user.$error).toBe(false);
  });

  it("has a zip code field", () => {
    const wrapper = shallowMount(ProfileEdit, { store, localVue });

    expect(wrapper.find("#zipCodeInput").element.value).toBe(state.user.zip_code);
  });

  it("the zip code field is not required", async () => {
    const wrapper = shallowMount(ProfileEdit, { store, localVue });
    wrapper.vm.$v.$touch();

    const zipCodeInput = wrapper.find("#zipCodeInput");
    const form = wrapper.find("#ProfileEditForm");

    zipCodeInput.element.value = "";
    zipCodeInput.trigger("input");
    form.trigger("submit.prevent");

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$v.user.$error).toBe(false);
  });

  it("has a phone field", () => {
    const wrapper = shallowMount(ProfileEdit, { store, localVue });

    expect(wrapper.find("#phoneInput").element.value).toBe(state.user.phone);
  });

  it("the phone field is not required", async () => {
    const wrapper = shallowMount(ProfileEdit, { store, localVue });
    wrapper.vm.$v.$touch();

    const phoneInput = wrapper.find("#phoneInput");
    const form = wrapper.find("#ProfileEditForm");

    phoneInput.element.value = "";
    phoneInput.trigger("input");
    form.trigger("submit.prevent");

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$v.user.$error).toBe(false);
  });
});
