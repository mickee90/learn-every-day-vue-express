import Nav from "@/components/Layout/Nav.vue";
import { shallowMount } from "@vue/test-utils";

describe("@/components/Layout/Nav.vue", () => {
  let wrapper;
  let state;
  let username = "johndoe@mail.com";

  beforeEach(() => {
    state = {
      user: { username: "" },
      isLoggedIn: false
    };
    wrapper = mountWithStore(state);
  });

  it("shows login if not logged in", () => {
    expect(wrapper.text()).toContain("Login");
  });
  it("does not show login if logged in ", async () => {
    state.isLoggedIn = true;

    await wrapper.vm.$nextTick();

    expect(wrapper.text()).not.toContain("Login");
  });
  it("shows logout if logged in", async () => {
    state.isLoggedIn = true;

    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain("Logout");
  });
  it("does not show logout if logged out", () => {
    expect(wrapper.text()).not.toContain("Logout");
  });
  it("does not show username if logged out", () => {
    expect(wrapper.text()).not.toContain(username);
  });
  it("does show username if logged in", async () => {
    state.isLoggedIn = true;
    state.user.username = username;

    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain(username);
  });
});

function mountWithStore(state) {
  const actions = {
    logout: jest.fn()
  };

  return shallowMount(Nav, {
    ...createComponentMocks({
      store: {
        auth: {
          namespaced: true,
          state,
          actions
        }
      },
      router: true
    })
  });
}
