import { createTicket } from "../src/ticket-service.js";

describe("ticket-service — départ", () => {
  test("sauvegarde un ticket", async () => {
    const repository = { save: jest.fn(async (ticket) => ticket) };
    const api = {
      postTicket: jest.fn(async () => ({})),
      notifySupport: jest.fn(async () => ({ delivered: true })),
    };

    const ticket = await createTicket(
      { title: "Serveur indisponible", severity: 3 },
      repository,
      api,
    );

    expect(repository.save).toHaveBeenCalledTimes(1);
    expect(api.postTicket).toHaveBeenCalledTimes(1);
    expect(ticket.status).toBe("OPEN");
  });
});

describe("createTicket — validation du titre", () => {
  function createDependencies() {
    return {
      repository: { save: jest.fn(async (ticket) => ticket) },
      api: {
        postTicket: jest.fn(async () => ({})),
        notifySupport: jest.fn(async () => ({ delivered: true })),
      },
    };
  }

  test("rejette un titre blanc avant tout effet de bord", async () => {
    const { repository, api } = createDependencies();
    const input = { title: "   ", severity: 3 };

    await expect(createTicket(input, repository, api)).rejects.toThrow();

    expect(repository.save).not.toHaveBeenCalled();
    expect(api.postTicket).not.toHaveBeenCalled();
    expect(api.notifySupport).not.toHaveBeenCalled();
  });

  test("normalise et crée un ticket valide", async () => {
    const { repository, api } = createDependencies();
    const input = { title: "  VPN   inaccessible  ", severity: 3 };

    const ticket = await createTicket(input, repository, api);

    expect(ticket).toEqual(
      expect.objectContaining({
        title: "VPN inaccessible",
        severity: 3,
        priority: "LOW",
        status: "OPEN",
      }),
    );
    expect(repository.save).toHaveBeenCalledTimes(1);
    expect(repository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "VPN inaccessible",
      }),
    );
    expect(api.postTicket).toHaveBeenCalledTimes(1);
    expect(api.postTicket).toHaveBeenCalledWith({
      name: "VPN inaccessible",
      priority: "LOW",
    });
    expect(api.notifySupport).not.toHaveBeenCalled();
  });
});
