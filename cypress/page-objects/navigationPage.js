
function SelectGroupMenyItem(groupItemName) {
    cy.contains('a', groupItemName).invoke('attr', 'aria-expanded').then(attr => {
        if (attr.includes('false')) {
            cy.contains('a', groupItemName).click()
        }
    })
}

class NavigationPage {

    formLayoutsPage() {
        SelectGroupMenyItem('Forms')
        //cy.contains('Forms').click()
        cy.contains('Form Layouts').click()
    }

    datepickerPage() {
        SelectGroupMenyItem('Forms')
        //cy.contains('Forms').click()
        //cy.wait(500)
        cy.contains('Datepicker').click()
    }

    toastrPage() {
        SelectGroupMenyItem('Modal & Overlays')
        //cy.contains('Modal & Overlays').click()
        //cy.wait(500)
        cy.contains('Toastr').click()
    }

    tooltipPage() {
        SelectGroupMenyItem('Modal & Overlays')
        //cy.contains('Modal & Overlays').click()
        cy.contains('Tooltip').click()
    }

    calendarPage() {
        SelectGroupMenyItem('Extra Components')
        cy.contains('Calendar').click()
    }

    dragNDropPage() {
        SelectGroupMenyItem('Extra Components')
        cy.contains('Drag & Drop').click()
    }
}

export const navigateTo = new NavigationPage()