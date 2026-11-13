describe("TicketFlow — contrat API", () => {
  it("charge les tickets et transmet la création à l’API", () => {
    cy.intercept("GET", "/api/tickets", {
      statusCode: 200,
      body: { tickets: [] },
    }).as("getTickets");
    cy.intercept("POST", "/api/tickets", (request) => {
      expect(request.body).to.deep.equal({
        title: "VPN inaccessible",
        priority: "LOW",
      });
      request.reply({
        statusCode: 201,
        body: { ticket: request.body },
      });
    }).as("createTicket");

    cy.visit("/");
    cy.wait("@getTickets");
    cy.get('[data-cy="ticket-title"]').type("VPN inaccessible");
    cy.get('[data-cy="ticket-severity"]').select("3");
    cy.get('[data-cy="create-ticket"]').click();
    // cy.wait("@createTicket");
    cy.contains("Ticket créé.").should("be.visible");
  });
});
