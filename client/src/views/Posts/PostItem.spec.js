import PostItem from "@/views/Posts/PostItem.vue";
import { shallowMount, RouterLinkStub } from "@vue/test-utils";

describe("@/views/Posts/PostItem.vue", () => {
  let post = {
    id: 1,
    title: "One post",
    published_date: "2020-08-20 20:20:20",
    content: "Lorem etc"
  };
  const display_date_format = "2020-08-20";

  it("Shows title and publish date", () => {
    const wrapper = shallowMount(PostItem, {
      propsData: { post },
      stubs: ["router-link"]
    });

    expect(wrapper.text()).toContain(post.title);
    expect(wrapper.text()).toContain(display_date_format);
  });

  it("Adds correct url", () => {
    const wrapper = shallowMount(PostItem, {
      propsData: { post },
      stubs: { RouterLink: RouterLinkStub }
    });

    expect(wrapper.findComponent(RouterLinkStub).props().to).toEqual({
      name: "PostShow",
      params: { id: post.id }
    });
  });
});
