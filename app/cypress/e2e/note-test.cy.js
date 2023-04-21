// global cy

describe('Note APP', ()=> {
  beforeEach(()=> {
    cy.visit('http://localhost:3000')

    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Miguel',
      username: '@midudev',
      password: 'intento1'
    }

    cy.request('POST', 'http://localhost:3001/api/users', user)
  })

  it('user can login', ()=> {
    cy.contains('Show Login').click()
    cy.get('[placeholder="Username"]').type('@midudev')
    cy.get('[placeholder="Password"]').type('intento1')
    cy.get('#form-login-button').click()
    cy.contains('Create a new note')
  })

  // it('login form can be open', ()=> {
  //   cy.contains('Show Login')
  // })

  it.only('login fails with worng password',()=> {
    cy.contains('Show Login').click()
    cy.get('[placeholder="Username"]').type('@midudev')
    cy.get('[placeholder="Password"]').type('wrong-password')
    cy.get('#form-login-button').click()
 
    // cy.contains('Wrong credentials')
    cy.get('.error')
      .should('contain','Wrong credentials')
      // .should('have.css', '')
  })

  describe('when logged in', ()=> {
    beforeEach(()=> {
      cy.contains('Show Login').click()
      cy.get('[placeholder="Username"]').type('@midudev')
      cy.get('[placeholder="Password"]').type('intento1')
      cy.get('#form-login-button').click()
      cy.contains('new note').click()
    })

    it('a new note can be created', ()=> {
      const norteContent= 'a note created by crypress'
      cy.contains('Create a new note').click()
      cy.get('input').type(norteContent)
      cy.contains('save').click()
      cy.contains(norteContent)
    })
  })
})
