import Vue from "vue";
import Vuelidate from "vuelidate";
import FlashMessage from "@smartweb/vue-flash-message";

import PostEdit from "@/views/Posts/PostEdit.vue";
import BaseButton from "@/components/Globals/_base-button.vue";
import BaseLabel from "@/components/Globals/_base-label.vue";
import BaseInput from "@/components/Globals/_base-input.vue";

import flushPromises from "flush-promises";

Vue.use(Vuelidate);
Vue.use(FlashMessage);

describe("@/views/Posts/PostEdit.vue", () => {
  let wrapper;
  const post = {
    id: 1,
    title: "One post",
    published_date: "2020-08-20 20:20:20",
    content: "Lorem etc"
  };
  const display_date_format = "2020-08-20";

  beforeEach(() => {
    wrapper = mountWithStore(post);
    wrapper.vm.$v.$touch();
  });

  afterEach(() => {
    wrapper.destroy();
    wrapper = null;
  });

  it("Shows title, date and content", () => {
    expect(wrapper.find("#title").element.value).toEqual(post.title);
    expect(wrapper.find("#published_date").element.value).toEqual(display_date_format);
    expect(wrapper.find("#content").element.value).toEqual(post.content);
  });

  it("Dispatch vuex editPost on save", async () => {
    const spyDispatch = spyOn(wrapper.vm.$store, "dispatch");

    await wrapper.find("#saveBtn").trigger("click.prevent");

    await wrapper.vm.$nextTick();

    await flushPromises();

    await expect(spyDispatch).toHaveBeenCalledWith("posts/editPost", {
      id: wrapper.vm.post.id,
      title: wrapper.vm.post.title,
      published_date: wrapper.vm.post.published_date,
      content: wrapper.vm.post.content
    });
  });

  it("Requires all fields", () => {
    const title = wrapper.find("#title");
    const published_date = wrapper.find("#published_date");
    const content = wrapper.find("#content");

    title.element.value = "";
    published_date.element.value = "";
    content.element.value = "";

    title.trigger("input");
    published_date.trigger("change");
    content.trigger("input");

    wrapper.vm.$nextTick();

    expect(wrapper.vm.$v.post.title.$error).toBe(true);
    expect(wrapper.vm.$v.post.published_date.$error).toBe(true);
    expect(wrapper.vm.$v.post.content.$error).toBe(true);
  });
  it("Has a cancel button", () => {
    expect(wrapper.text()).toContain("Cancel");
  });
  it("Has a save button", () => {
    expect(wrapper.text()).toContain("Save");
  });
  it("Calls onCancel method when clicking the cancel button", () => {
    const buttonSpy = jest.spyOn(wrapper.vm, "onCancel").mockImplementation(() => {});

    wrapper.find("#cancelBtn").trigger("click.default");

    expect(buttonSpy).toHaveBeenCalled();
  });
  it("Calls onSave method when clicking the save button", () => {
    const buttonSpy = jest.spyOn(wrapper.vm, "onSave").mockImplementation(() => {});

    wrapper.find("#saveBtn").trigger("click.default");

    expect(buttonSpy).toHaveBeenCalled();
  });
  // @TODO: check if redirected when clicking cancel
  // @TODO: check if redirected when clicking save
});

function mountWithStore(post) {
  const actions = {
    editPost: jest.fn(),
    fetchPost: jest.fn(),
    deletePost: jest.fn()
  };

  return shallowMount(PostEdit, {
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
        BaseButton,
        BaseLabel,
        BaseInput
      },
      router: true
    })
  });
}
