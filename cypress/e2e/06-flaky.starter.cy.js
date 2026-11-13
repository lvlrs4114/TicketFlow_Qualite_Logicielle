// TP6 : activer un cas à la fois en retirant son `.skip`.
describe("TP6 A — lecture ponctuelle après fermeture", () => {
  it("peut lire CLOSED avant la fin de la fermeture", () => {
    cy.visit("/");
    cy.get('[data-cy="reset"]').click();
    cy.get('[data-cy="ticket-title"]').type("Connexion VPN");
    cy.get('[data-cy="ticket-severity"]').select("3");
    cy.get('[data-cy="create-ticket"]').click();

    cy.contains('[data-cy="ticket-card"]', "Connexion VPN")
      .find('[data-cy="close-ticket"]')
      .click();

    cy.wait(300);
    cy.contains('[data-cy="ticket-card"]', "Connexion VPN").then(($card) => {
      // expect is not retried. If the random close delay exceeds 100 ms,
      // this one-time observation still sees OPEN and fails.
      expect($card.find('[data-cy="ticket-status"]').text()).to.equal(
        "CLOSED",
      );
    });
  });
});

describe.skip("TP6 B — dépendance entre tests", () => {
  it("prépare un ticket pour le test suivant", () => {
    cy.visit("/");
    cy.get('[data-cy="reset"]').click();
    cy.get('[data-cy="ticket-title"]').type("Imprimante");
    cy.get('[data-cy="ticket-severity"]').select("3");
    cy.get('[data-cy="create-ticket"]').click();
    cy.contains('[data-cy="ticket-card"]', "Imprimante").should("be.visible");
  });

  it("suppose à tort que le ticket du test précédent existe", () => {
    cy.visit("/");
    cy.contains('[data-cy="ticket-card"]', "Imprimante").should("be.visible");
  });
});

describe.skip("TP6 D — sélecteur fragile (bonus)", () => {
  it("trouve le titre avec un sélecteur structurel", () => {
    cy.visit("/");
    cy.get('[data-cy="reset"]').click();
    cy.get('[data-cy="ticket-title"]').type("Ticket du scénario D");
    cy.get('[data-cy="create-ticket"]').click();

    // TODO bonus : remplacer ce sélecteur structurel profond par le data-cy stable.
    cy.get("#ticket-list article h3").should("have.text", "Ticket du scénario D");
  });
});
