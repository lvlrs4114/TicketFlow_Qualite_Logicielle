describe("Final — prise en charge d’un ticket", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get('[data-cy="reset"]').click();
  });

  it.skip("passe un ticket ouvert en cours", () => {
    // TODO : créer un ticket, puis cliquer sur Commencer dans sa carte.
    // TODO : vérifier le statut IN_PROGRESS et le compteur des tickets ouverts.
  });
});
