/// <reference types="cypress" />

beforeEach('Open test application', () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()
})

it('Hello world 1', () => {

    // by Tag
    cy.get('input')

    // by ID value
    cy.get('#inputEmail1')

    // by Class value
    cy.get('.input-full-width')

    // by Attribute
    cy.get('[fullwidth]')

    // by Attribute with value
    cy.get('[placeholder="Email"]')

    // by Entire class value
    cy.get('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    // ho to combine several attributes
    cy.get('[placeholder="Email"][fullwidth]')
    cy.get('input[placeholder="Email"]')

    // find by data-cy attribute
    cy.get('[data-cy="inputEmail1"]')

})

it('Cypress Locator Methods', () => {

    // Theory
    // get() - to find web elements on the page GLOBALLY
    // find() - to find ONLY child web elements on the page
    // contains() - to find web elements by HTML text. It will find the very first match (web element) on the page unlike get() method that find all web elements. Method contains() is case sensitive.

    cy.contains('Sign in')
    cy.contains('Sign In', { matchCase: false }) // Disable case sensitivity
    cy.contains('Sign') // Partial match property
    cy.contains('Emai')
    cy.contains('[status="warning"]', 'Sign in') // Two arguments: locator and HTML text
    cy.contains('nb-card', 'Horizontal form')
    cy.contains('nb-card', 'Horizontal form').contains('Sign in') // Chain method contains(). Method contains() will check the matches ONLY through child web elements on the web page

    // cy.find('[data-cy="inputEmail1"]')  // Method find() doesn't work as a root, only in chain
    cy.contains('nb-card', 'Horizontal form').find('button') // Chain method find(). Method find() will check the matches ONLY through child web elements on the web page

    cy.contains('nb-card', 'Horizontal form').get('button') // Chain method get(). Method get() will check the matches on the entire web page GLOBALLY

})

it('Child Elements', () => {

    cy.contains('nb-card', 'Using the Grid').find('.row').find('button')

    cy.get('nb-card').find('nb-radio-group').contains('Option 1')

    cy.get('nb-card nb-radio-group').contains('Option 1') // Looking as a child element somewhere in the DOM

    cy.contains('nb-card', 'Using the Grid').find('.row button')

    cy.get('nb-card > nb-card-body [placeholder="Jane Doe"]') // Child element is exactly after parent web element

})

it('Parent Elements', () => {

    cy.get('#inputEmail1').parents('form').find('button')

    cy.contains('Using the Grid').parent().find('button') // cy.contains('Using the Grid').parent() is the same as the command cy.contains('nb-card', 'Using the Grid'). You can infinitely chain the number of parent() methods

    cy.get('#inputEmail1').parentsUntil('nb-card-body').find('button')

})

it('Cypress Chains', () => {

    cy.get('#inputEmail1')
        .parents('form')
        .find('button')
        .click()

    cy.get('#inputEmail1')
        .parents('form')
        .find('nb-radio')
        .first()
        .should('have.text', 'Option 1')

})

it('Reusing Locators', () => {

    // THIS WILL NOT WORK!! DON'T DO LIKE THIS!!!
    // const inputEmail1 = cy.get('#inputEmail1')
    // inputEmail1.parents('form').find('button')
    // inputEmail1.parents('form').find('nb-radio')

    // 1. Cypress Alias. It's a kind of smart global variable for the frame work
    // cy.get('#inputEmail1').as('inputEmail1')
    // cy.get('@inputEmail1').parents('form').find('button')
    // cy.get('@inputEmail1').parents('form').find('nb-radio')

    // 2. Using Cypress then() method. You can't return anything from then() method
    // let foo
    // console.log(foo)
    cy.get('#inputEmail1').then( inputEmail => {
        cy.wrap(inputEmail).parents('form').find('button')
        cy.wrap(inputEmail).parents('form').find('nb-radio')
        cy.wrap('Hello').should('equal', 'Hello')//.then( hello => {
        //     return hello
        // })
        cy.wrap(inputEmail).as('inputEmail2')
    })//.should('equal', 'Hello')
    // console.log(foo)
    
    cy.get('@inputEmail2').click()

})

it('Extracting Values', () => {
    // 1. Using a JQuery method
    cy.get('[for="exampleInputEmail1"]').then( label => {
        const emailLabel = label.text()
        console.log(emailLabel)
    })

    // 2. Using invoke command
    cy.get('[for="exampleInputEmail1"]').invoke('text').then( emailLabel => {
        console.log(emailLabel)
    })
    cy.get('[for="exampleInputEmail1"]').invoke('text').as('emailLabel')
    cy.get('@emailLabel')
    cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address') // Assertion with partial match
    cy.get('[for="exampleInputEmail1"]').should('have.text', 'Email address') // Assertion with exact match

    // 3. Invoke attribute value
    cy.get('#exampleInputEmail1').invoke('attr', 'class').then( classValue => {
        console.log(classValue)
    })
    cy.get('#exampleInputEmail1').should('have.attr', 'class', 'input-full-width size-medium status-basic shape-rectangle nb-transition') // Assertion

    // 4. Invoke input field value
    cy.get('#exampleInputEmail1').type('hello@test.com')
    cy.get('#exampleInputEmail1').invoke('prop', 'value').then( value => {
        console.log(value)
    })
    cy.get('#exampleInputEmail1').should('have.value', 'hello@test.com') // Assertion
    cy.get('#exampleInputEmail1').should('have.prop', 'value', 'hello@test.com') // Assertion

})

it('Assertions', () => {

    cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address') // contain is a partial assertion

    cy.get('[for="exampleInputEmail1"]').then( label => {
        expect(label).to.contain('Email address')
    })

    cy.get('[for="exampleInputEmail1"]').should('have.text', 'Email address') // have.text is an exact match assertion

    cy.get('[for="exampleInputEmail1"]').then( label => {
        expect(label).to.have.text('Email address')
    })

    cy.get('[for="exampleInputEmail1"]').invoke('text').then( emailLabel => {
        expect(emailLabel).to.contain('Email address')
    })

    cy.get('[for="exampleInputEmail1"]').invoke('text').then( emailLabel => {
        expect(emailLabel).to.equal('Email address')
        cy.wrap(emailLabel).should('equal', 'Email address')
    })
})

it.skip('Timeouts', () => {
    cy.contains('Modal & Overlays').click()
    cy.contains('Dialog').click()

    cy.contains('Open with delay 10 seconds').click()
    cy.get('nb-dialog-container nb-card-header', { timeout: 11000 })
        .should('have.text', 'Friendly reminder')
})
