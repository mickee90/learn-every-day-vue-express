import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";

import ProfileEdit from "@/views/Profile/ProfileEdit";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("ProfileEdit.vue", () => {
  let state;
  let store;

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

  beforeEach(() => {
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

  it("has a first name field", () => {
    const wrapper = shallowMount(ProfileEdit, { store, localVue });

    expect(wrapper.find("#firstNameInput").element.value).toBe(state.user.first_name);
  });

  it("has a last name field", () => {
    const wrapper = shallowMount(ProfileEdit, { store, localVue });

    expect(wrapper.find("#lastNameInput").element.value).toBe(state.user.last_name);
  });

  it("has a email field", () => {
    const wrapper = shallowMount(ProfileEdit, { store, localVue });

    expect(wrapper.find("#emailInput").element.value).toBe(state.user.email);
  });

  it("has a city field", () => {
    const wrapper = shallowMount(ProfileEdit, { store, localVue });

    expect(wrapper.find("#cityInput").element.value).toBe(state.user.city);
  });

  it("has a address field", () => {
    const wrapper = shallowMount(ProfileEdit, { store, localVue });

    expect(wrapper.find("#addressInput").element.value).toBe(state.user.address);
  });

  it("has a zip code field", () => {
    const wrapper = shallowMount(ProfileEdit, { store, localVue });

    expect(wrapper.find("#zipCodeInput").element.value).toBe(state.user.zip_code);
  });

  it("has a phone field", () => {
    const wrapper = shallowMount(ProfileEdit, { store, localVue });

    expect(wrapper.find("#phoneInput").element.value).toBe(state.user.phone);
  });
});
