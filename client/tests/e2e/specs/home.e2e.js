describe("Home Page", () => {
  it("has the correct title and heading", () => {
    cy.visit("/");

    cy.title().should("equal", "Learn Every Day");
    cy.contains("h1", "Welcome!");
  });
  it("has links for login and register", () => {
    cy.visit("/");

    cy.contains("a", "Login").should("have.attr", "href", "/login");
    cy.get('a[id="loginBtn"]').should("have.id", "loginBtn");

    cy.contains("a", "Register").should("have.attr", "href", "/register");
    cy.get('a[id="registerBtn"]').should("have.id", "registerBtn");
  });
  it("forwards you to the login page when clicking the login button", () => {
    cy.visit("/");

    cy.get('a[id="loginBtn"]').click();
    cy.location("pathname").should("equal", "/login");
  });
  it("forwards you to the register page when clicking the register button", () => {
    cy.visit("/");

    cy.get('a[id="registerBtn"]').click();
    cy.location("pathname").should("equal", "/register");
  });
  it("has a menu button and opens the menu on click", () => {
    cy.visit("/");

    cy.get('button[id="menu-btn"]').should("exist");
    cy.get('nav[id="nav-container"]').should("not.be.visible");

    cy.get('button[id="menu-btn"]').click();
    cy.get('nav[id="nav-container"]').should("be.visible");

    cy.get('button[id="menu-btn"]').click();
    cy.get('nav[id="nav-container"]').should("be.not.visible");
  });
});
