/// <reference types="cypress" />

import { onDatepickerPage } from "../page-objects/datepickerPage"
import { onFormLayoutsPage } from "../page-objects/formLayoutsPage"
import { navigateTo } from "../page-objects/navigationPage"

beforeEach('Open application', () => {
    //cy.visit('/')
    cy.openHomePage()
})

it('Navigation test', () => {
    navigateTo.formLayoutsPage()
    navigateTo.datepickerPage()
    navigateTo.tooltipPage()
    navigateTo.toastrPage()
    navigateTo.calendarPage()
    navigateTo.dragNDropPage()
})

it.only('Test with page object', () => {
    navigateTo.formLayoutsPage()
    onFormLayoutsPage.submitUsingTheGridForm('test@test.com', 'Welcome', 0) // Indexes: 0, 1, 2 or in case of labels -> Strings:'Option 1', 'Option 2', 'Disabled Option'
    onFormLayoutsPage.submitBasicForm('artem@test.com', 'Welcome', false) // Booleans: true or false
    navigateTo.datepickerPage()
    onDatepickerPage.selectCommonDatepickerDateFromToday(5)
    onDatepickerPage.selectDatepickerWithRangeDateFromToday(10, 50)
})