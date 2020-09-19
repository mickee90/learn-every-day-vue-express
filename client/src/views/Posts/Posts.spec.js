import Posts from "@/views/Posts/Posts.vue";
import PostItem from "@/views/Posts/PostItem.vue";
import { shallowMount } from "@vue/test-utils";

describe("@/views/Posts/Posts.vue", () => {
  let wrapper;
  let authState;
  let postState;

  beforeEach(() => {
    authState = {
      user: {
        id: 1,
        username: "johndoe@gmail.com"
      },
      isLoggedIn: true
    };
  });
  it("Lists correct number of posts", async () => {
    postState = {
      posts: [
        { id: 1, user_id: 1, title: "First post" },
        { id: 2, user_id: 1, title: "Second post" },
        { id: 3, user_id: 1, title: "Third post" }
      ]
    };
    wrapper = mountWithStore(authState, postState);
    expect(wrapper.findAll(".post-item").length).toBe(3);
  });
  // @TODO
  // it("Only lists the posts made by the user", async () => {});

  // @TODO: Create a global loader
  // @TODO: Check if the loader disappears after the fetch is done
  it("It shows a loader before the posts is fetched", async () => {
    postState = { posts: null };
    wrapper = mountWithStore(authState, postState);

    expect(wrapper.text()).toContain("Loader");
  });
  it("Shows text to explain if the user does not have any posts", async () => {
    postState = { posts: [] };
    wrapper = mountWithStore(authState, postState);

    expect(wrapper.text()).toContain("You have not created any posts yet.");
  });
  it("Includes a 'create new post'-button", async () => {
    wrapper = mountWithStore(authState, postState);

    const createPostBtn = wrapper.find("#create_post_btn");

    expect(createPostBtn.text()).toContain("New");
  });
});

function mountWithStore(authState, postState) {
  const postActions = {
    init: jest.fn()
  };

  return shallowMount(Posts, {
    ...createComponentMocks({
      store: {
        auth: {
          namespaced: true,
          state: authState
        },
        posts: {
          namespaced: true,
          state: { ...postState },
          actions: { ...postActions }
        }
      },
      stubs: {
        PostItem
      },
      router: true
    })
  });
}
