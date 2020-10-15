// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

// Create custom Cypress commands and overwrite existing ones.
// https://on.cypress.io/custom-commands

import { getStore } from "./utils";

Cypress.Commands.add("login", ({ username = "tester", password = "password" } = {}) => {
  cy.location("pathname").then(pathname => {
    if (pathname === "/login") {
      cy.visit("/posts");
    }
  });
  getStore().then(store => store.commit("auth/setUser", { id: 1, username, password }));
});

Cypress.Commands.add("logout", () => {
  cy.location("pathname").then(pathname => {
    if (pathname !== "/login") {
      cy.visit("/login");
    }
  });
  getStore().then(store => store.commit("auth/logout"));
});

Cypress.Commands.add("resetPostStore", () => {
  getStore().then(store => store.commit("posts/setPosts", []));
});
