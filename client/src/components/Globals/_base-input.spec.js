import BaseInput from "@/components/Globals/_base-input.vue";
import { mount } from "@vue/test-utils";

describe("@/components/Globals/_base-input.vue", () => {
  it("it works with v-model", () => {
    const wrapper = mount(BaseInput, { propsData: { value: "JohnDoe" } });
    const input = wrapper.find("input");
    const inputEl = input.element;

    expect(inputEl.value).toEqual("JohnDoe");

    inputEl.value = "JaneDoe";
    input.trigger("input");
    // emitted returns an array contain array for each emit
    expect(wrapper.emitted().update).toEqual([["JaneDoe"]]);

    wrapper.setValue("Unknown");
    expect(inputEl.value).toEqual("Unknown");
  });

  it('allows a type of "password"', () => {
    const consoleError = jest.spyOn(console, "error").mockImplementation(() => {});

    mount(BaseInput, { propsData: { value: "JohnDoe", type: "password" } });

    expect(consoleError).not.toBeCalled();
    consoleError.mockRestore();
  });

  it('does NOT allow a type of "date"', () => {
    const consoleError = jest.spyOn(console, "error").mockImplementation(() => {});

    mount(BaseInput, { propsData: { value: "JohnDoe", type: "date" } });

    expect(consoleError.mock.calls[0][0]).toContain(
      'custom validator check failed for prop "type"'
    );
    consoleError.mockRestore();
  });

  it('does NOT allow a type of "radio"', () => {
    const consoleError = jest.spyOn(console, "error").mockImplementation(() => {});

    mount(BaseInput, { propsData: { value: "JohnDoe", type: "radio" } });

    expect(consoleError.mock.calls[0][0]).toContain(
      'custom validator check failed for prop "type"'
    );
    consoleError.mockRestore();
  });

  it('does NOT allow a type of "checkbox"', () => {
    const consoleError = jest.spyOn(console, "error").mockImplementation(() => {});

    mount(BaseInput, { propsData: { value: "JohnDoe", type: "checkbox" } });

    expect(consoleError.mock.calls[0][0]).toContain(
      'custom validator check failed for prop "type"'
    );
    consoleError.mockRestore();
  });
});
