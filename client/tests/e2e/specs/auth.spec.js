describe("Authentication", () => {
  it("login form shows an error on failure", () => {
    cy.visit("/login");

    // Enter bad login info
    cy.get('input[id="username"]').type("badUsername");
    cy.get('input[id="password"]').type("badPassword");

    // Submit the login form
    cy.contains("button", "Login").click();

    // Ensure that an error displays
    cy.contains("Enter your username.");
    cy.location("pathname").should("equal", "/login");
  });

  it("successful login works redirects to the home page and logging out works", () => {
    cy.server();
    cy.route({
      method: "POST",
      url: "/api/v1/login",
      response: {
        user: {
          username: "username"
        }
      }
    }).as("login");
    cy.visit("/login");

    cy.get('input[id="username"]').type("admin@test.com");
    cy.get('input[id="password"]').type("password");

    cy.contains("button", "Login").click();

    cy.wait("@login");

    cy.location("pathname").should("equal", "/posts");
  });

  it("logout link logs the user out when logged in", () => {
    cy.login();
    cy.server();
    cy.route({
      method: "POST",
      url: "/api/v1/logout",
      response: {
        user: {
          username: "username"
        }
      }
    }).as("logout");

    cy.location("pathname").should("equal", "/posts");

    cy.get('button[id="menu-btn"]').click();
    cy.get('nav[id="nav-container"]').should("be.visible");
    cy.contains("button", "Logout").click();

    cy.wait("@logout");

    cy.location("pathname").should("equal", "/login");
    cy.contains("button", "Login");
  });
});
