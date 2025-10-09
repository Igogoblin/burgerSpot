/* eslint-disable @typescript-eslint/consistent-type-definitions */
import '@4tw/cypress-drag-drop';
import 'cypress-real-events';

/// <reference types="cypress" />
/// <reference types="cypress-real-events" />

// ***********************************************
// Пример файла для кастомных команд Cypress
// ***********************************************

// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })

// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })

// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })

// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>;

      drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>;
      dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>;
      dragAndDrop(target: string): Chainable<Element>;
      visit(
        originalFn: Cypress.CommandOriginalFn<'visit'>,
        url: string,
        options: Partial<Cypress.VisitOptions>
      ): Chainable<Element>;
      // cypress-real-events
      // realClick(options?: unknown): Chainable<JQuery<HTMLElement>>;
      // realType(text: string, options?: unknown): Chainable<JQuery<HTMLElement>>;
      // realPress(
      //   keys: string | string[],
      //   options?: unknown
      // ): Chainable<JQuery<HTMLElement>>;
      // realHover(options?: unknown): Chainable<JQuery<HTMLElement>>;
      // realDrag(
      //   target: string | HTMLElement,
      //   options?: unknown
      // ): Chainable<JQuery<HTMLElement>>;
    }
  }
}

export {};
