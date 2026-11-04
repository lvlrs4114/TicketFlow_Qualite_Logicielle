describe("TP5 — parcours de création", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get('[data-cy="reset"]').click();
  });

  it.skip("crée un ticket prioritaire", () => {
    // TODO Mission 1 : saisir « Production indisponible », choisir 8 et créer.
    // TODO Vérifier HIGH dans la carte de ce ticket, pas dans toute la page.
  });

  it.skip("ouvre puis ferme le détail d’un ticket", () => {
    // TODO Préparer ici son propre ticket de sévérité 8.
    // TODO Mission 2 : ouvrir le détail, vérifier OPEN, fermer et vérifier CLOSED.
    // TODO Revenir à la liste avec le bouton de retour.
  });
});
