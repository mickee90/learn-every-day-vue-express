import Posts from "@/views/Posts/Posts.vue";
import PostItem from "@/views/Posts/PostItem.vue";
import { shallowMount } from "@vue/test-utils";
import BounceLoader from "vue-spinner/src/BounceLoader.vue";

describe("@/views/Posts/Posts.vue", () => {
  let wrapper;
  let authState;
  let state;
  let posts;

  beforeEach(() => {
    posts = [
      { id: 1, user_id: 1, title: "First post" },
      { id: 2, user_id: 1, title: "Second post" },
      { id: 3, user_id: 1, title: "Third post" }
    ];

    authState = {
      user: {
        id: 1,
        username: "johndoe@gmail.com"
      },
      isLoggedIn: true
    };
    state = { posts: null };

    wrapper = mountWithStore(authState, state);
  });

  it("Lists correct number of posts", async () => {
    state.posts = posts;
    await wrapper.vm.$nextTick();

    expect(wrapper.findAll(".post-item").length).toBe(3);
  });
  // @TODO: Requires axios + backend api mock
  // it("Only lists the posts made by the user", async () => {});

  // @TODO: Check if the loader disappears after the fetch is done
  it("It shows a loader before the posts is fetched", async () => {
    expect(wrapper.findComponent(BounceLoader).exists()).toBe(true);

    state.posts = posts;
    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent(BounceLoader).exists()).toBe(false);
  });
  it("Shows text to explain if the user does not have any posts", async () => {
    state.posts = [];
    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain("You have not created any posts yet.");
  });
  it("Includes a 'create new post'-button", async () => {
    expect(wrapper.find("#create_post_btn").text()).toContain("New");
  });
});

function mountWithStore(authState, state) {
  const actions = {
    init: jest.fn()
  };

  return shallowMount(Posts, {
    ...createComponentMocks({
      store: {
        auth: {
          state: authState
        },
        posts: {
          state,
          actions
        }
      },
      stubs: {
        PostItem,
        BounceLoader
      },
      router: true
    })
  });
}
