/// <reference types="cypress" />

beforeEach('Open application', () => {
    cy.visit('/')
})

it('Input fields', () => {
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    const name = 'Artem'
    cy.get('#inputEmail1').type('hello@test.com', { delay: 200 }).clear().type('hello').clear()
    cy.contains('nb-card', 'Using the Grid').contains('Email').type(`${name}@test.com`)  // String interpolation. Method clear() doesn't work with label web element https://docs.cypress.io/api/commands/clear; "Yes 'It' Works" 'Yes "It" Works'
    // cy.contains('nb-card', 'Using the Grid').contains('Email').type("test"+"@test.com")  // String Concatenation

    // cy.get('#inputEmail1').should('have.value', `${name}@test.com`).clear().type('test@bondaracademy.com') // Known default (initial) value of input field
    cy.get('#inputEmail1').should('not.have.value', '').clear().type('test@bondaracademy.com')
        .press(Cypress.Keyboard.Keys.TAB) // Dynamic (no known in advance) default (initial) value of input field

    cy.get('textarea').type('Yes It Works')

    // cy.contains('Auth').click()
    // cy.contains('Login').click()

    // cy.get('#input-email').type('test@bondaracademy.com')
    // cy.get('#input-password').type('Welcome{enter}')

    // cy.get('#exampleInputEmail1').invoke('prop', 'value') // Invoke input field value
})

it('Radio buttons', () => {
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then(allRadioButtons => {
        cy.wrap(allRadioButtons).eq(0).should('not.be.visible').check({ force: true }).should('be.checked')
        cy.wrap(allRadioButtons).eq(1).check({ force: true })
        cy.wrap(allRadioButtons).eq(0).should('not.be.checked')
        cy.wrap(allRadioButtons).eq(2).should('be.disabled')
    })

    //cy.contains('nb-card', 'Using the Grid').contains('Option 1').check({ force: true }) // Not working
    cy.contains('nb-card', 'Using the Grid').contains('Option 1').click({ force: true }) // Working
    cy.contains('nb-card', 'Using the Grid').contains('label', 'Option 1').find('input').check({ force: true })
})

it('Checkboxes', () => {
    cy.contains('Modal & Overlays').click()
    cy.contains('Toastr').click()

    cy.get('[type="checkbox"]').check({ force: true }) // Set the state of the checkbox and IF NOT checked it will check it
    cy.get('[type="checkbox"]').should('be.checked')
    cy.get('[type="checkbox"]').uncheck({ force: true }) // Set the state of the checkbox and IF NOT unchecked it will uncheck it.
    cy.get('[type="checkbox"]').should('not.be.checked')
    cy.get('[type="checkbox"]').click({ force: true, multiple: true }) // Revert (flip) the current state of the checkbox ONLY
    cy.get('[type="checkbox"]').should('be.checked')
})

it('Lists and dropdowns', () => {
    cy.contains('Modal & Overlays').click()
    cy.contains('Toastr').click()

    cy.contains('div', 'Toast type:').find('select option')
    cy.contains('div', 'Toast type:').find('select').select('info').should('have.value', 'info')

    cy.contains('div', 'Toast type:').find('select option').then(listOfOptions => {
        cy.wrap(listOfOptions).eq(0)
            .should('have.value', 'primary')
            .should('have.text', 'primary')
        cy.wrap(listOfOptions).eq(1)
            .should('have.value', 'success')
            .should('have.text', 'success')
        cy.wrap(listOfOptions).eq(2)
            .should('have.value', 'info')
            .should('have.text', 'info')
        cy.wrap(listOfOptions).eq(3)
            .should('have.value', 'warning')
            .should('have.text', 'warning')
        cy.wrap(listOfOptions).eq(4)
            .should('have.value', 'danger')
            .should('have.text', 'danger')
    })

    cy.contains('div', 'Position:').find('nb-select').click()
    cy.get('.option-list').contains('bottom-right').click()
    cy.contains('div', 'Position:').find('nb-select').should('have.text', 'bottom-right')

    cy.contains('div', 'Position:').find('nb-select').then(dropdown => {
        cy.wrap(dropdown).click()
        cy.get('.option-list nb-option').each((option, index, list) => {
            cy.wrap(option).click()
            if (index < list.length - 1)
                cy.wrap(dropdown).click()
        })
    })
})

it('Tooltips', () => {
    cy.contains('Modal & Overlays').click()
    cy.contains('Tooltip').click()

    cy.contains('button', 'Top').trigger('mouseenter')
    cy.get('nb-tooltip').should('have.text', 'This is a tooltip')

    cy.contains('[nbtooltipstatus="danger"]', 'Show Tooltip').trigger('mouseenter')
    cy.get('nb-tooltip svg').should('have.class', 'eva eva-alert-triangle')

    cy.contains('button', 'Danger').trigger('mouseenter')
    cy.get('nb-tooltip.status-danger').should('have.text', 'This is a tooltip')
})

it('Dialog boxes', () => {
    // cy.contains('Modal & Overlays').click()
    // cy.contains('Dialog').click()

    // cy.contains('Open Dialog with component').click()
    // cy.contains('nb-card', 'This is a title passed to the dialog component').should('contain', 'Suspendisse potenti.')
    // cy.contains('Dismiss Dialog').click()

    cy.contains('Tables & Data').click()
    cy.contains('Smart Table').click()

    //1.
    cy.get('.nb-trash').first().click()
    cy.on('window:confirm', confirm => {
        expect(confirm).to.equal('Are you sure you want to delete?')
        // console.log(confirm)
        // return false // simulate "Cancel"
    })

    //2.
    cy.window().then(win => {
        cy.stub(win, 'confirm').as('dialogBox').returns(false) // simulate "Cancel"
        // console.log(win)
    })
    cy.get('.nb-trash').first().click()
    cy.get('@dialogBox').should('be.calledWith', 'Are you sure you want to delete?')
})

it('Web tables', () => {
    cy.contains('Tables & Data').click()
    cy.contains('Smart Table').click()

    //1. How to find by text
    cy.get('tbody').contains('tr', 'Larry').then(tableRow => {
        cy.wrap(tableRow).find('.nb-edit').click()
        cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('35')
        cy.wrap(tableRow).find('.nb-checkmark').click()
        cy.wrap(tableRow).find('td').last().should('have.text', '35')
    })

    //2. How to find by index
    cy.get('.nb-plus').click()
    cy.get('thead tr').eq(2).then(tableRow => {
        cy.wrap(tableRow).find('[placeholder="First Name"]').type('John')
        cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Smith')
        cy.wrap(tableRow).find('.nb-checkmark').click()
    })

    cy.get('tbody tr').first().find('td').then(tableColumns => {
        cy.wrap(tableColumns).eq(2).should('have.text', 'John')
        cy.wrap(tableColumns).eq(3).should('have.text', 'Smith')
    })

    //3. Looping through the rows
    const ages = [20, 30, 40, 200]

    cy.wrap(ages).each(age => {
        cy.get('[placeholder="Age"]').clear().type(age)
        cy.wait(500) // It is considered not a good practice. Use in case of last resort
        cy.get('tbody tr').each(tableRows => {
            if (age == 200) {
                cy.wrap(tableRows).should('contain.text', 'No data found')
            } else {
                cy.wrap(tableRows).find('td').last().should('have.text', age)
            }
        })
    })
})

it('Web tables without wait hardcode (Student example)', () => {

    cy.visit('/');
    cy.contains('Tables & Data').click();
    cy.contains('Smart Table').click();

    const age = [20, 30, 40, 200];

    cy.wrap(age).each(age => {
        cy.get('thead [placeholder="Age"]').should('be.visible').clear().type(age);

        // Check if the age is 200 and handle 'No data found' case
        if (age === 200) {
            cy.get('tbody tr').should('contain', 'No data found');
        } else {
            // Ensure the table has loaded by checking the first row's specific cell
            cy.get('tbody tr').first().find('td .ng-star-inserted').last().should('have.text', age);

            // Perform assertions on each row to check the age
            cy.get('tbody tr').each(tableRow => {
                cy.wrap(tableRow).find('td').eq(6).should('contain', age);
            });
        }
    });
});

it('Datepickers', () => {
    cy.contains('Forms').click()
    cy.contains('Datepicker').click()

    function selectDateFromCurrentDay(day) {
        let date = new Date()
        date.setDate(date.getDate() + day)
        let futureDay = date.getDate()
        let futureMonthLong = date.toLocaleDateString('en-US', { month: 'long' })
        let futureMonthShort = date.toLocaleDateString('en-US', { month: 'short' })
        let futureYear = date.getFullYear()
        let dateToAssert = `${futureMonthShort} ${futureDay}, ${futureYear}`
        cy.get('nb-calendar-view-mode').invoke('text').then(calendarMonthAndYear => {
            if (!calendarMonthAndYear.includes(futureMonthLong) || !calendarMonthAndYear.includes(futureYear)) {
                cy.get('[data-name="chevron-right"]').click()
                selectDateFromCurrentDay(day)
            } else {
                cy.get('.day-cell').not('.bounding-month').contains(futureDay).click()

            }
        })
        return dateToAssert
    }

    cy.get('[placeholder="Form Picker"]').then(input => {
        cy.wrap(input).click()
        const dateToAssert = selectDateFromCurrentDay(20)
        cy.wrap(input).should('have.value', dateToAssert)
    })
})

it('Sliders', () => {
    cy.get('[tabtitle="Temperature"] circle')
        .invoke('attr', 'cx', '45.62')
        .invoke('attr', 'cy', '50.35')
        .click()
    cy.get('[class="value temperature h1"]').should('contain.text', '18')

    cy.contains('Humidity').click()
    cy.get('[tabtitle="Humidity"] circle')
        .invoke('attr', 'cx', '262.649')
        .invoke('attr', 'cy', '167.308')
        .click()
    cy.get('[class="value humidity h1"]').should('contain.text', '88')
})

it('Drag and drop', () => {
    cy.contains('Extra Components').click()
    cy.contains('Drag & Drop').click()

    cy.get('#todo-list div').first().trigger('dragstart')
    cy.get('#drop-list').trigger('drop')
    cy.get('#drop-list').should('contain.text', 'Get groceries')
    cy.get('#drop-list div').last().trigger('dragstart')
    cy.get('#todo-list').trigger('drop')
    cy.get('#drop-list').should('not.contain.text', 'Get groceries')
    cy.get('#todo-list div').first().trigger('dragstart')
    cy.get('#drop-list').trigger('drop')
    cy.get('#drop-list').should('contain.text', 'Feed the dog')
    cy.get('#drop-list div').first().contains('button', 'delete').click()
    cy.get('#drop-list').should('not.contain.text', 'Feed the dog')
})

it.only('Iframes', () => {
    cy.contains('Modal & Overlays').click()
    cy.contains('Dialog').click()
    cy.frameLoaded('[data-cy="esc-close-iframe"]') // Need to install Cypress iframe https://www.npmjs.com/package/cypress-iframe?activeTab=readme to work with iframes

    cy.iframe('[data-cy="esc-close-iframe"]').contains('Open Dialog with esc close').click()
    cy.contains('Dismiss Dialog').click()

    cy.enter('[data-cy="esc-close-iframe"]').then(getBody => {
        getBody().contains('Open Dialog with esc close').click()
        cy.get('ngx-showcase-dialog nb-card-header').should('have.text', 'This is a title passed to the dialog component')
        cy.contains('Dismiss Dialog').click()
        getBody().contains('Open Dialog without esc close').click()
        cy.get('nb-dialog-container nb-card-header').should('have.text', 'Friendly reminder')
        cy.contains('OK').click()
    })
})