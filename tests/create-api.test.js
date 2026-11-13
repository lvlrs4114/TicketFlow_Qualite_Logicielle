import { createTicket } from "../src/ticket-service.js";

describe("createTicket — contrat API mocké", () => {
  beforeEach(() => localStorage.clear());

  test("transmet le titre et la priorité calculée", async () => {
    const api = {
      postTicket: jest.fn().mockResolvedValue({ ticket: {} }),
      notifySupport: jest.fn(),
    };

    await createTicket({ title: "VPN inaccessible", severity: 3 }, undefined, api);

    expect(api.postTicket).toHaveBeenCalledWith({
      title: "VPN inaccessible",
      priority: "LOW",
    });
    expect(api.notifySupport).not.toHaveBeenCalled();
  });
});
