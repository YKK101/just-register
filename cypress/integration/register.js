/// <reference types="Cypress" />

describe('Test register', () => {
  beforeEach(() => {
    cy.visit('/register')
  })

  describe('Validation', () => {  
    describe('Required Field', () => {
      afterEach(() => {
        cy.get('[data-testid=err-firstName]')
          .should('exist')
          .and('contain', 'Required')
        cy.get('[data-testid=err-lastName]')
          .should('exist')
          .and('contain', 'Required')
        cy.get('[data-testid=err-dateOfBirth]')
          .should('exist')
          .and('contain', 'Required')
        cy.get('[data-testid=err-tel]')
          .should('not.exist')
        cy.get('[data-testid=err-email]')
          .should('not.exist')
      })
    
      it('should show missing required field, on send without any input', () => {
        cy.get('button[type=submit]')
          .click()
      })

      it('should show missing required field, on insert nothing to them', () => {
        cy.get('input[name=firstName]')
          .focus()
          .blur()
        cy.get('input[name=lastName]')
          .focus()
          .blur()
        cy.get('input[name=dateOfBirth]')
          .focus()
          .blur()
        cy.get('input[name=tel]')
          .focus()
          .blur()
        cy.get('input[name=email]')
          .focus()
          .blur()
      })
    })

    describe('Email', () => {
      it('should show invalid email', () => {
        cy.get('input[name=email]')
          .type('abc')
          .blur()
        
        cy.get('[data-testid=err-email]')
          .should('exist')
          .and('contain', 'Invalid Email')
      })
    })
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