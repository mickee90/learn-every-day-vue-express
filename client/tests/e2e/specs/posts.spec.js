import { getStore } from "../support/utils";

// describe("List Posts", () => {
//   beforeEach(() => {
//     cy.visit("/login");
//     cy.resetDatabase();

//     cy.server({
//       onAnyRequest: function(route, proxy) {
//         proxy.xhr.setRequestHeader("Access-Control-Allow-Credentials", true);
//         proxy.xhr.setRequestHeader("Accepts", "application/json");
//       }
//     });
//   });

//   const addPost = (title, content, user_id = 1) =>
//     cy.request({
//       method: "POST",
//       url: "http://localhost:3333/api/v1/posts",
//       body: {
//         title,
//         content,
//         user_id,
//         published_date: new Date()
//       }
//     });

//   it("starts on posts page", () => {
//     cy.login();

//     cy.location("pathname").should("equal", "/posts");
//   });

//   it("shows all three posts", () => {
//     cy.login();

//     addPost("first", "post");
//     addPost("first2", "post2");
//     addPost("first3", "post3");

//     // "Refresh" the page to show the post items
//     cy.visit("/posts");

//     cy.get(".post-item").should("have.length", 3);
//   });

//   it("shows description loader before posts shows", () => {
//     cy.login();

//     cy.get(".loading-spinner").should("exist");

//     cy.contains("You have not created any posts yet.");

//     cy.get(".post-item").should("have.length", 0);

//     addPost("first", "post");
//     addPost("first2", "post2");
//     addPost("first3", "post3");

//     // "Refresh" the page to show the post items
//     cy.visit("/posts");

//     cy.get(".post-item").should("have.length", 3);
//   });
// });

describe("Create Post", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.resetDatabase();
  });

  it("redirects back and shows the newly created Post", () => {
    cy.login();

    cy.contains("a", "New").click();
    cy.location("pathname").should("equal", "/posts/create");

    cy.get('input[id="title"]').type("New Post!");
    cy.get('textarea[id="content"]').type("New Post Yolo");

    cy.contains("button", "Save").click();

    cy.contains("New Post!");
    cy.contains("New Post Yolo");
    cy.contains("a", "Edit");
    cy.contains("button", "Delete");

    // @todo how to fetch store ids to validate the url?
    // getStore().then(store => {
    //   cy.location("pathname").should("equal", `/posts/${store.getters["posts/getPost"].id}/show`);
    // });
  });
});
