describe("TicketFlow — contrat API", () => {
  it.skip("charge les tickets et transmet la création à l’API", () => {
    // TODO 1 : intercepter GET /api/tickets et répondre avec une liste vide.
    // TODO 2 : intercepter POST /api/tickets, vérifier son body et répondre 201.

    cy.visit("/");
    // TODO 3 : attendre l’alias du GET.
    cy.get('[data-cy="ticket-title"]').type("VPN inaccessible");
    cy.get('[data-cy="ticket-severity"]').select("3");
    cy.get('[data-cy="create-ticket"]').click();
    // TODO 4 : attendre l’alias du POST.
    cy.contains("Ticket créé.").should("be.visible");
  });
});
