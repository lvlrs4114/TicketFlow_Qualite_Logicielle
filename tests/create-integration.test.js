import { createTicket } from "../src/ticket-service.js";
import { httpClient } from "../src/ticket-api.js";

describe("createTicket — intégration locale", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test.skip("transmet le contrat attendu au transport local", async () => {
    jest
      .spyOn(httpClient, "post")
      .mockResolvedValue({ status: 201, body: { ticket: {} } });

    await createTicket({ title: "Panne serveur", severity: 8 });

    // TODO étudiant : vérifier le chemin et le payload métier attendu.
  });
});
