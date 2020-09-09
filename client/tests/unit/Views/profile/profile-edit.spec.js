import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Vuelidate from "vuelidate";

import ProfileEdit from "@/views/Profile/ProfileEdit";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Vuelidate);

describe("ProfileEdit.vue", () => {
  let state;
  let getters;
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

    getters = {
      getUser: () => defaultUser
    };

    store = new Vuex.Store({
      modules: {
        auth: {
          namespaced: true,
          state,
          getters
        }
      }
    });
  });

  it("has a username field", () => {
    const wrapper = shallowMount(ProfileEdit, { store, localVue });

    expect(wrapper.find("#username").element.value).toBe(state.user.username);
  });

  it("the username field is required", async () => {
    const wrapper = shallowMount(ProfileEdit, { store, localVue });
    wrapper.vm.$v.$touch();

    const username = wrapper.find("#username");
    const form = wrapper.find("#ProfileEditForm");

    username.element.value = "";
    username.trigger("input");
    form.trigger("submit.prevent");

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$v.formData.username.$error).toBe(true);
  });

  it("has a first name field", () => {
    const wrapper = shallowMount(ProfileEdit, { store, localVue });

    expect(wrapper.find("#first_name").element.value).toBe(state.user.first_name);
  });

  it("the first name field is required", async () => {
    const wrapper = shallowMount(ProfileEdit, { store, localVue });
    wrapper.vm.$v.$touch();

    const first_name = wrapper.find("#first_name");
    const form = wrapper.find("#ProfileEditForm");

    first_name.element.value = "";
    first_name.trigger("input");
    form.trigger("submit.prevent");

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$v.formData.first_name.$error).toBe(true);
  });

  it("has a last name field", async () => {
    const wrapper = shallowMount(ProfileEdit, { store, localVue });

    await wrapper.vm.$nextTick();

    expect(wrapper.find("#last_name").element.value).toBe(state.user.last_name);
  });

  it("the last name field is required", async () => {
    const wrapper = shallowMount(ProfileEdit, { store, localVue });
    wrapper.vm.$v.$touch();

    const last_name = wrapper.find("#last_name");
    const form = wrapper.find("#ProfileEditForm");

    last_name.element.value = "";
    last_name.trigger("input");
    form.trigger("submit.prevent");

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$v.formData.last_name.$error).toBe(true);
  });

  it("has a email field", () => {
    const wrapper = shallowMount(ProfileEdit, { store, localVue });

    expect(wrapper.find("#email").element.value).toBe(state.user.email);
  });

  it("the email field is required", async () => {
    const wrapper = shallowMount(ProfileEdit, { store, localVue });
    wrapper.vm.$v.$touch();

    const email = wrapper.find("#email");
    const form = wrapper.find("#ProfileEditForm");

    email.element.value = "";
    email.trigger("input");
    form.trigger("submit.prevent");

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$v.formData.email.$error).toBe(true);
  });

  it("has a city field", () => {
    const wrapper = shallowMount(ProfileEdit, { store, localVue });

    expect(wrapper.find("#city").element.value).toBe(state.user.city);
  });

  it("the city field is not required", async () => {
    const wrapper = shallowMount(ProfileEdit, { store, localVue });
    wrapper.vm.$v.$touch();

    const city = wrapper.find("#city");
    const form = wrapper.find("#ProfileEditForm");

    city.element.value = "";
    city.trigger("input");
    form.trigger("submit.prevent");

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$v.formData.$error).toBe(false);
  });

  it("has a address field", () => {
    const wrapper = shallowMount(ProfileEdit, { store, localVue });

    expect(wrapper.find("#address").element.value).toBe(state.user.address);
  });

  it("the address field is not required", async () => {
    const wrapper = shallowMount(ProfileEdit, { store, localVue });
    wrapper.vm.$v.$touch();

    const address = wrapper.find("#address");
    const form = wrapper.find("#ProfileEditForm");

    address.element.value = "";
    address.trigger("input");
    form.trigger("submit.prevent");

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$v.formData.$error).toBe(false);
  });

  it("has a zip code field", () => {
    const wrapper = shallowMount(ProfileEdit, { store, localVue });

    expect(wrapper.find("#zip_code").element.value).toBe(state.user.zip_code);
  });

  it("the zip code field is not required", async () => {
    const wrapper = shallowMount(ProfileEdit, { store, localVue });
    wrapper.vm.$v.$touch();

    const zip_code = wrapper.find("#zip_code");
    const form = wrapper.find("#ProfileEditForm");

    zip_code.element.value = "";
    zip_code.trigger("input");
    form.trigger("submit.prevent");

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$v.formData.$error).toBe(false);
  });

  it("has a phone field", () => {
    const wrapper = shallowMount(ProfileEdit, { store, localVue });

    expect(wrapper.find("#phone").element.value).toBe(state.user.phone);
  });

  it("the phone field is not required", async () => {
    const wrapper = shallowMount(ProfileEdit, { store, localVue });
    wrapper.vm.$v.$touch();

    const phone = wrapper.find("#phone");
    const form = wrapper.find("#ProfileEditForm");

    phone.element.value = "";
    phone.trigger("input");
    form.trigger("submit.prevent");

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$v.formData.$error).toBe(false);
  });

  it("updates the users profile in case of correct inputs", async () => {
    const wrapper = shallowMount(ProfileEdit, { store, localVue });
    wrapper.vm.$v.$touch();

    const form = wrapper.find("#ProfileEditForm");

    const username = wrapper.find("#username");
    username.element.value = "email@mail.com";
    username.trigger("input");

    const first_name = wrapper.find("#first_name");
    first_name.element.value = "first_name";
    first_name.trigger("input");

    const last_name = wrapper.find("#last_name");
    last_name.element.value = "last_name";
    last_name.trigger("input");

    const email = wrapper.find("#email");
    email.element.value = "email@mail.com";
    email.trigger("input");

    const address = wrapper.find("#address");
    address.element.value = "address";
    address.trigger("input");

    const city = wrapper.find("#city");
    city.element.value = "city";
    city.trigger("input");

    const zip_code = wrapper.find("#zip_code");
    zip_code.element.value = "zip_code";
    zip_code.trigger("input");

    const phone = wrapper.find("#phone");
    phone.element.value = "phone";
    phone.trigger("input");

    form.trigger("submit.prevent");

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$v.formData.$error).toBe(false);
    expect(state.user.username).toBe("email@mail.com");
    expect(state.user.first_name).toBe("first_name");
    expect(state.user.last_name).toBe("last_name");
    expect(state.user.email).toBe("email@mail.com");
    expect(state.user.address).toBe("address");
    expect(state.user.city).toBe("city");
    expect(state.user.zip_code).toBe("zip_code");
    expect(state.user.phone).toBe("phone");
  });
});
