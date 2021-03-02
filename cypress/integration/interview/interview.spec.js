describe("Home Page - Freshly", () => {
  describe("when a user visits the home page", () => {

    beforeEach(() => {
      cy.visit("/")
    })

    it("then the top menu renders", () => {
      let topMenuHeaders = {
        "Plans & Menu": "plans-and-menu",
        "How it Works": "https://about.freshly.com/why-freshly",
        "Gifts": "gifts"
      }

      for ( const [text, link] of Object.entries( topMenuHeaders ) ) {
        cy.get('.new-nav-menu').should("contain", text)
      }
      cy.get('.new-nav-menu').should("contain", "Get $40")
    })

    it("then the get started section renders correctly", () => {
      let header = "Chef cooked healthy meals delivered to you"

      cy.get(".home-form").within(() => {
        cy.get("h1.home-page-section-title")
      })
      cy.get("form#email-form-top").within(() => {
        cy.get('#email-top').type("test-interview@test.com")
        cy.get("#zip-code-top").type("10005")
      })
      cy.get('.primary-blue-button').click()
    })
  })
})

const testLink = (selector, linkText, link) => {
  cy.get(selector).should("contain", linkText).and("be.visible")
  cy.request(link).its("status").should("eql", 200)
}

