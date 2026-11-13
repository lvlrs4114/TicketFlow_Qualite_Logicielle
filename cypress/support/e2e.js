Cypress.Commands.add("resetDb", () => {
  cy.window().then((window) =>
    window.localStorage.removeItem("ticketflow:tickets"),
  );
  cy.reload();
});

Cypress.Commands.add("seedTickets", (tickets) => {
  cy.window().then((window) =>
    window.localStorage.setItem("ticketflow:tickets", JSON.stringify(tickets)),
  );
  cy.reload();
});

beforeEach(() => {
  const tickets = new Map();
  cy.intercept("GET", "/api/tickets", (request) => {
    request.reply({ statusCode: 200, body: { tickets: [...tickets.values()] } });
  });
  cy.intercept("POST", "/api/tickets", (request) => {
    const ticket = {
      ...request.body,
      id: `cypress-${tickets.size + 1}`,
      severity: request.body.priority === "HIGH" ? 8 : 3,
      status: "OPEN",
      createdAt: new Date().toISOString(),
    };
    tickets.set(ticket.id, ticket);
    request.reply({ statusCode: 201, body: { ticket } });
  });
  cy.intercept("PATCH", "/api/tickets/*", (request) => {
    tickets.set(request.body.id, request.body);
    request.reply({ statusCode: 200, body: { ticket: request.body } });
  });
  cy.intercept("DELETE", "/api/tickets", (request) => {
    tickets.clear();
    request.reply({ statusCode: 200, body: { tickets: [] } });
  });
  cy.intercept("POST", "/api/support-notifications", {
    statusCode: 201,
    body: { delivered: true },
  });
});
