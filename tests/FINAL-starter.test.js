import { calculateStats } from "../src/ticket-utils.js";
import { startTicket } from "../src/ticket-service.js";

describe("FINAL — calculateStats et tickets en cours", () => {
  test.skip("compte IN_PROGRESS parmi les tickets ouverts", () => {
    const tickets = [
      { status: "OPEN" },
      { status: "IN_PROGRESS" },
      { status: "CLOSED" },
    ];

    const stats = calculateStats(tickets);

    // TODO étudiant : écrire l'assertion expect pour les statistiques attendues.
  });

  test.skip("startTicket persiste IN_PROGRESS et le transmet à l’API", async () => {
    const ticket = { id: "ticket-1", status: "OPEN" };
    const repository = { replace: jest.fn(async (updated) => updated) };
    const api = { patchTicket: jest.fn().mockResolvedValue({ ticket }) };

    const updated = await startTicket(ticket, repository, api);

    const expected = { id: "ticket-1", status: "IN_PROGRESS" };

    // TODO étudiant : écrire les expect pour updated, repository.replace et api.patchTicket.
  });
});
