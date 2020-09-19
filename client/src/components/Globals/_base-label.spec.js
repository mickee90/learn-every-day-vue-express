import BaseLabel from "@/components/Globals/_base-label.vue";
import { shallowMount } from "@vue/test-utils";

describe("@/components/Globals/_base-label.vue", () => {
  it("render it's content", () => {
    const slotContent = "JohnDoe";

    const { element } = shallowMount(BaseLabel, { slots: { default: slotContent } });

    expect(element.innerHTML).toContain(slotContent);
  });

  it("shows astrics if it's required", async () => {
    const slotContent = "JohnDoe";
    const { element } = await shallowMount(BaseLabel, {
      slots: { default: slotContent },
      propsData: { required: true }
    });

    expect(element.innerHTML).toContain(`${slotContent} <span class=\"required\">*</span>`);
  });
});
