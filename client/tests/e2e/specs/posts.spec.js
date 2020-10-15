import { mockThreePosts, mockSinglePost, mockSinglePosts } from "../mock_data/posts";

describe("List Posts", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.resetPostStore();
  });

  it("starts on posts page", () => {
    cy.login();

    cy.location("pathname").should("equal", "/posts");
  });

  it("shows all three posts", () => {
    cy.server();
    cy.route({
      method: "GET",
      url: "/api/v1/posts",
      response: mockThreePosts
    }).as("posts");

    cy.login();

    cy.wait("@posts");

    cy.get(".post-item").should("have.length", 3);
  });

  it("shows description loader before posts shows", () => {
    cy.server();
    cy.route({
      method: "GET",
      url: "/api/v1/posts",
      response: {
        posts: []
      }
    }).as("posts");

    cy.login();

    cy.get(".loading-spinner").should("exist");

    cy.wait("@posts");

    cy.contains("You have not created any posts yet.");

    cy.get(".post-item").should("have.length", 0);
  });

  it("shows description loader before posts shows", () => {
    cy.server();
    cy.route({
      method: "GET",
      url: "/api/v1/posts",
      response: mockThreePosts
    }).as("posts");

    cy.login();

    cy.get(".loading-spinner").should("exist");

    cy.wait("@posts");

    cy.get(".post-item").should("have.length", 3);
  });
});

describe("Create Post", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.resetPostStore();
  });

  it("redirects back and shows the newly created Post", () => {
    cy.server();
    cy.route({
      method: "GET",
      url: "/api/v1/posts",
      response: {
        posts: []
      }
    }).as("posts");

    cy.route({
      method: "GET",
      url: "/api/v1/posts/1",
      response: mockSinglePost
    }).as("getPost");

    cy.route({
      method: "POST",
      url: "/api/v1/posts",
      body: mockSinglePost,
      response: mockSinglePost
    }).as("createPost");

    cy.login();
    cy.wait("@posts");

    cy.contains("a", "New").click();
    cy.location("pathname").should("equal", "/posts/create");

    cy.get('input[id="title"]').type("New Post!");
    cy.get('textarea[id="content"]').type("New Post Yolo");

    cy.contains("button", "Save").click();
    cy.wait("@createPost");
    cy.wait("@getPost");

    cy.location("pathname").should("equal", "/posts/1/show");
  });
});
