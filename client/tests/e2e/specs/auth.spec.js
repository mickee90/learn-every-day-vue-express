import "../support/commands";

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

  // it("successful login works redirects to the home page and logging out works", () => {
  //   cy.visit("/login");

  //   // Enter the user-supplied username and password
  //   cy.get('input[id="username"]').type("admin");
  //   cy.get('input[id="password"]').type("password");

  //   // Submit the login form
  //   cy.contains("button", "Login").click();

  //   // Confirm redirection to the homepage
  //   cy.location("pathname").should("equal", "/posts");

  //   // Confirm a logout link exists
  //   // cy.contains("a", "Log out");
  // });

  // it('login after attempting to visit authenticated route redirects to that route after login', () => {
  //   cy.visit('/profile?someQuery')

  //   // Confirm redirection to the login page
  //   cy.location('pathname').should('equal', '/login')

  //   // Enter the user-supplied username and password
  //   cy.get('input[name="username"]').type('admin')
  //   cy.get('input[name="password"]').type('password')

  //   // Submit the login form
  //   cy.contains('button', 'Log in').click()

  //   // Confirm redirection to the homepage
  //   cy.location('pathname').should('equal', '/profile')
  //   cy.location('search').should('equal', '?someQuery')

  //   // Confirm a logout link exists
  //   cy.contains('a', 'Log out')
  // })

  // @todo Override Vuex Action to be able to logout properly?

  // it("logout link logs the user out when logged in", () => {
  //   cy.login();

  //   cy.location("pathname").should("equal", "/posts");

  //   // cy.get('a[id="create_post_btn"]').click();
  //   // cy.location("pathname").should("equal", "/posts/create");

  //   cy.get('button[id="menu-btn"]').click();
  //   cy.get('nav[id="nav-container"]').should("be.visible");
  //   cy.contains("button", "Logout").click();

  //   cy.location("pathname").should("equal", "/login");
  //   cy.contains("button", "Login");

  // });

  // it('logout from an authenticated route redirects to home', () => {
  //   cy.logIn()
  //   cy.visit('/profile')

  //   // Click the logout link
  //   cy.contains('a', 'Log out').click()

  //   // Confirm we're on the correct page
  //   cy.location('pathname').should('equal', '/')

  //   // Confirm that the user is logged out
  //   cy.contains('a', 'Log in')
  // })
});
