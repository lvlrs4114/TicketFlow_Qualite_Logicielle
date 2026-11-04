import { createTicket } from "../src/ticket-service.js";

describe("createTicket — contrat API mocké", () => {
  beforeEach(() => localStorage.clear());

  test.skip("transmet le nom et la priorité calculée", async () => {
    const api = {
      postTicket: jest.fn().mockResolvedValue({ ticket: {} }),
      notifySupport: jest.fn(),
    };

    await createTicket({ title: "VPN inaccessible", severity: 3 }, undefined, api);

    // TODO : vérifier le payload envoyé à postTicket.
    // TODO : vérifier que notifySupport n'est pas appelé pour une priorité basse.
  });
});
