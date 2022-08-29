const { _ } = Cypress

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

      _.forOwn(topMenuHeaders, (link, text) => {
        cy.get(".new-nav-link").should("include.text", text)
      })

      cy.get(".new-nav-menu").should("contain", "Get $40")
    })

    it("then the get started section renders correctly", () => {
      let header = "Balanced meals for busy lives."

      cy.get("#home-hero-section-variant").within(() => {
        cy.get("h1.hero-text")
      })
      cy.get(".new-home-form").within(() => {
        cy.get("[data-name='Email']" ).type("test-interview@test.com")
        cy.get("[data-name='Postal']" ).type("10005")
      })
      cy.get("input[value='Get Started']").click()
    })
  })
})

const testLink = (selector, linkText, link) => {
  cy.get(selector).should("include.text", linkText).and("be.visible")
  cy.request(link).its("status").should("eql", 200)
}
