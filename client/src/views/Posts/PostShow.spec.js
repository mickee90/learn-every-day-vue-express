import PostShow from "@/views/Posts/PostShow.vue";
import BaseButton from "@/components/Globals/_base-button.vue";
import { shallowMount } from "@vue/test-utils";

describe("@/views/Posts/PostShow.vue", () => {
  let wrapper;
  const post = {
    id: 1,
    title: "One post",
    published_date: "2020-08-20 20:20:20",
    content: "Lorem etc"
  };
  const display_date_format = "2020-08-20 20:20";

  beforeEach(() => {
    wrapper = mountWithStore(post);
  });

  it("Shows correct title, date and content", async () => {
    expect(wrapper.text()).toContain(post.title);
    expect(wrapper.text()).toContain(display_date_format);
    expect(wrapper.text()).toContain(post.content);
  });

  it("Has an edit button", async () => {
    expect(wrapper.find("#editPostBtn").text()).toContain("Edit");
  });

  it("Has a delete button", async () => {
    expect(wrapper.find("#deletePostBtn").text()).toContain("Delete");
  });
});

function mountWithStore(post) {
  const actions = {
    fetchPost: jest.fn(),
    deletePost: jest.fn()
  };

  return shallowMount(PostShow, {
    ...createComponentMocks({
      store: {
        posts: {
          state: {
            post
          },
          actions
        }
      },
      stubs: {
        BaseButton
      },
      router: true
    })
  });
}
