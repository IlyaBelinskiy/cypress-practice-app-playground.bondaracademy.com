

class FormLayoutsPage {

    /**
     * Method to submit Using The Grid form with valid user credentials
     * @param {string} email - valid user email
     * @param {string} password - valid user password
     * @param {number} optionIndex - provide index of the option radio button. Start form 0
     */
    submitUsingTheGridForm(email, password, optionIndex) { //optionLabel
        cy.contains('nb-card', 'Using the Grid').then(form => {
            cy.wrap(form).find('[placeholder="Email"]').type(email)
            cy.wrap(form).find('[placeholder="Password"]').type(password)
            cy.wrap(form).find('[type="radio"]').eq(optionIndex).check({ force: true })
            //cy.wrap(form).contains('label', optionLabel).find('input').check({ force: true })
            cy.wrap(form).contains('Sign in').click()
        })
    }

    /**
     * Method to submit Basic form with valid user credentials
     * @param {string} email - valid user email
     * @param {string} password - valid user password
     * @param {boolean} isCheckboxSelected - provide true or false
     */
    submitBasicForm(email, password, isCheckboxSelected) {
        cy.contains('nb-card', 'Basic form').then(form => {
            cy.wrap(form).find('[placeholder="Email"]').type(email)
            cy.wrap(form).find('[placeholder="Password"]').type(password)
            if (isCheckboxSelected) {
                cy.wrap(form).find('[type="checkbox"]').check({ force: true })
            }
            cy.wrap(form).contains('Submit').click()
        })
    }

}

export const onFormLayoutsPage = new FormLayoutsPage()