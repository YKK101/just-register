/// <reference types="Cypress" />

describe('Test register', () => {
  beforeEach(() => {
    cy.visit('/register')
  })

  describe('Success', () => {
    beforeEach(() => {
      cy.mockRequest('POST', '/register', 'fixture:users/withCompleteData/registerResponse.json')
        .as('registerRequest')
    })
  
    it('should redirect to success landing and show welcome message correctly', () => {
      cy.fixture('users/withCompleteData/formData.json')
        .then((user) => {
          cy.get('input[name=firstName]')
            .type(user.firstName)
          cy.get('input[name=lastName]')
            .type(user.lastName)
          cy.get('[data-testid=radio-female]')
            .click()
          cy.get('input[name=dateOfBirth]')
            .type(user.dateOfBirth)
          cy.get('input[name=tel]')
            .type(user.tel)
          cy.get('input[name=email]')
            .type(user.email)
          cy.get('button[type=submit]')
            .click()
          
          cy.wait('@registerRequest')
            .then(({ request }) => {
              expect(request.body).to.deep.equals(user)
              cy.url().should('equals', `${Cypress.config().baseUrl}/success`)
              cy.contains('Welcome Vicki Taylor')
            })
        })
    })
  })

  describe('Error', () => {
    beforeEach(() => {
      cy.mockRequestWithOption('/register', {
        method: 'POST',
        status: 500,
        response: { status: 500 },
      }).as('registerRequest')
    })
  
    it('should redirect to error landing', () => {
      cy.fixture('users/withCompleteData/formData.json')
        .then((user) => {
          cy.get('input[name=firstName]')
            .type(user.firstName)
          cy.get('input[name=lastName]')
            .type(user.lastName)
          cy.get('[data-testid=radio-female]')
            .click()
          cy.get('input[name=dateOfBirth]')
            .type(user.dateOfBirth)
          cy.get('input[name=tel]')
            .type(user.tel)
          cy.get('input[name=email]')
            .type(user.email)
          cy.get('button[type=submit]')
            .click()
          
          cy.wait('@registerRequest')
            .then(() => {
              cy.url().should('equals', `${Cypress.config().baseUrl}/error`)
            })
        })
    })
  })
})