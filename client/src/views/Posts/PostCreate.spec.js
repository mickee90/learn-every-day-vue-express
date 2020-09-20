import Vue from "vue";
import Vuelidate from "vuelidate";

import PostCreate from "@/views/Posts/PostCreate.vue";
import BaseButton from "@/components/Globals/_base-button.vue";
import BaseLabel from "@/components/Globals/_base-label.vue";
import BaseInput from "@/components/Globals/_base-input.vue";

import { fullDate } from "@/helpers/DateTimes.js";

import flushPromises from "flush-promises";

Vue.use(Vuelidate);

describe("@/views/Posts/PostCreate.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mountWithStore();
    wrapper.vm.$v.$touch();
  });

  it("Populate the published_date field to todays date on init", () => {
    const { element } = wrapper.find("#published_date");
    const today = fullDate(new Date());

    expect(element.value).toEqual(today);
  });
  it("Requires all field", async () => {
    const title = wrapper.find("#title");
    const published_date = wrapper.find("#published_date");
    const content = wrapper.find("#content");

    title.element.value = "";
    published_date.element.value = "";
    content.element.value = "";

    title.trigger("input");
    published_date.trigger("change");
    content.trigger("input");

    await wrapper.find("#saveBtn").trigger("click.prevent");

    await wrapper.vm.$nextTick();

    await flushPromises();

    expect(wrapper.vm.$v.post.title.$error).toBe(true);
    expect(wrapper.vm.$v.post.published_date.$error).toBe(true);
    expect(wrapper.vm.$v.post.content.$error).toBe(true);
  });

  it("Dispatch vuex createPost on save", async () => {
    const spyDispatch = spyOn(wrapper.vm.$store, "dispatch");
    const title = wrapper.find("#title");
    const published_date = wrapper.find("#published_date");
    const content = wrapper.find("#content");

    title.element.value = "Some title";
    published_date.element.value = "2020-12-19";
    content.element.value = "Some content";

    title.trigger("input");
    published_date.trigger("change");
    content.trigger("input");

    await wrapper.find("#saveBtn").trigger("click.prevent");

    await wrapper.vm.$nextTick();

    await flushPromises();

    await expect(spyDispatch).toHaveBeenCalled();
    await expect(spyDispatch).toHaveBeenCalledWith("posts/createPost", wrapper.vm.post);
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

function mountWithStore() {
  const actions = {
    createPost: jest.fn()
  };

  return shallowMount(PostCreate, {
    ...createComponentMocks({
      store: {
        posts: {
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
