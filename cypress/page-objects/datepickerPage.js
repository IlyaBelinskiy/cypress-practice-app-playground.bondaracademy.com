
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

class DatepickerPage {

    /**
     * Method to select date in Common Datepicker
     * @param {number} numberOfDaysFromToday - number of days from the current day
     */
    selectCommonDatepickerDateFromToday(numberOfDaysFromToday) {
        cy.get('[placeholder="Form Picker"]').then(input => {
            cy.wrap(input).click()
            const dateToAssert = selectDateFromCurrentDay(numberOfDaysFromToday)
            cy.wrap(input).should('have.value', dateToAssert)
        })
    }

    /**
     * Method to select range of dates in Datepicker With Range
     * @param {number} numberOfDaysFromTodayStart - start number of days from the current day
     * @param {number} numberOfDaysFromTodayEnd - end number of days from the current day
     */
    selectDatepickerWithRangeDateFromToday(numberOfDaysFromTodayStart, numberOfDaysFromTodayEnd) {
        cy.get('[placeholder="Range Picker"]').then(input => {
            cy.wrap(input).click()
            const dateToAssertStart = selectDateFromCurrentDay(numberOfDaysFromTodayStart)
            const dateToAssertEnd = selectDateFromCurrentDay(numberOfDaysFromTodayEnd)
            const rangeOfDatesToAssert = `${dateToAssertStart} - ${dateToAssertEnd}`
            cy.wrap(input).should('have.value', rangeOfDatesToAssert)
        })
    }
}

export const onDatepickerPage = new DatepickerPage()