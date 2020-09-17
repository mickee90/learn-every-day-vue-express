import BaseButton from "@/components/Globals/_base-button.vue";
import { shallowMount } from "@vue/test-utils";

describe("@/components/Globals/_base-button.vue", () => {
  it("render it's content", () => {
    const slotContent = "JoeDoe";
    const { element } = shallowMount(BaseButton, { slots: { default: slotContent } });

    expect(element.innerHTML).toContain(slotContent);
  });
});
