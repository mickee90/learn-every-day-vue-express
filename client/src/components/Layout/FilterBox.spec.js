import FilterBox from "@/components/Layout/FilterBox";
import { shallowMount } from "@vue/test-utils";

describe("@/components/Layout/FilterBox.vue", () => {
  let wrapper;
  let posts;

  beforeEach(() => {
    posts = [
      { id: 3, title: "Post 3", published_date: "2020-03-01", content: "Post 3" },
      { id: 2, title: "Post 2", published_date: "2020-02-01", content: "Post 2" },
      { id: 1, title: "Post 1", published_date: "2020-01-01", content: "Post 1" }
    ];

    wrapper = shallowMount(FilterBox, {
      propsData: { posts },
      data: function() {
        return {
          currentSort: 1,
          sortItems: [
            { id: 1, title: "Date - Desc", sortProp: "published_date", sortType: "desc" },
            { id: 2, title: "Date - Asc", sortProp: "published_date", sortType: "asc" },
            { id: 3, title: "Title - Desc", sortProp: "title", sortType: "desc" },
            { id: 4, title: "Title - Asc", sortProp: "title", sortType: "asc" },
            { id: 5, title: "Dummy - Dummy", sortProp: "Dummy", sortType: "Dummy" }
          ]
        };
      }
    });
  });

  it("has filter options", () => {
    wrapper.vm.$nextTick();

    expect(wrapper.find("#FilterBoxSelect").exists()).toBe(true);

    expect(wrapper.findAll("select#FilterBoxSelect > option").length).toBe(5);
  });

  it("lists the posts in the correct order by date", async () => {
    expect(posts[0].id).toBe(3);
    expect(posts[1].id).toBe(2);
    expect(posts[2].id).toBe(1);

    wrapper.findAll("select#FilterBoxSelect > option").at(1).element.selected = true;
    wrapper.find("select#FilterBoxSelect").trigger("change");

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted("postListSorted")).toBeTruthy();

    // We emit postListSorted on component create, therefor we start checking from index 1
    expect(wrapper.emitted("postListSorted")[1][0][0].id).toEqual(1);
    expect(wrapper.emitted("postListSorted")[1][0][1].id).toEqual(2);
    expect(wrapper.emitted("postListSorted")[1][0][2].id).toEqual(3);

    wrapper.findAll("select#FilterBoxSelect > option").at(0).element.selected = true;
    wrapper.find("select#FilterBoxSelect").trigger("change");

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted("postListSorted")).toBeTruthy();

    expect(wrapper.emitted("postListSorted")[2][0][0].id).toEqual(3);
    expect(wrapper.emitted("postListSorted")[2][0][1].id).toEqual(2);
    expect(wrapper.emitted("postListSorted")[2][0][2].id).toEqual(1);
  });
});
