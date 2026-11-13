describe("TP5 — parcours de création", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get('[data-cy="reset"]').click();
  });

  it("crée un ticket prioritaire", () => {
    // TODO Mission 1 : saisir « Production indisponible », choisir 8 et créer.
    // TODO Vérifier HIGH dans la carte de ce ticket, pas dans toute la page.

    cy.get('[data-cy="ticket-title"]').type("Production indisponible");
    cy.get('[data-cy="ticket-severity"]').select("8");
    cy.get('[data-cy="create-ticket"]').click();

    cy.contains('[data-cy="ticket-card"]', "Production indisponible")
        .find('[data-cy="priority-badge"]').should("have.text", "HIGH");
  });

  it("ouvre puis ferme le détail d’un ticket", () => {
    // TODO Préparer ici son propre ticket de sévérité 8.
    // TODO Mission 2 : ouvrir le détail, vérifier OPEN, fermer et vérifier CLOSED.
    // TODO Revenir à la liste avec le bouton de retour.

    cy.get('[data-cy="ticket-title"]').type("son propre ticket");
    cy.get('[data-cy="ticket-severity"]').select("8");
    cy.get('[data-cy="create-ticket"]').click();

    cy.contains('[data-cy="ticket-card"]', "son propre ticket")
        .find('[data-cy="open-ticket"]').click();

    cy.get('#ticket-detail')
      .find('[data-cy="detail-status"]')
      .should("have.text", "azerty");

    cy.get('[data-cy="detail-close-ticket"]').click();

    cy.get('#ticket-detail')
      .find('[data-cy="detail-status"]')
      .should("have.text", "CLOSED");

    cy.get('[data-cy="back-to-list"]').click();
  });
});
