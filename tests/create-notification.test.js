import { createTicket } from "../src/ticket-service.js";

function setup() {
  const stored = [];
  const repository = {
    save: jest.fn(async (ticket) => {
      stored.push(ticket);
      return ticket;
    }),
  };
  const api = {
    postTicket: jest.fn().mockResolvedValue({}),
    notifySupport: jest.fn().mockResolvedValue({ delivered: true }),
  };
  return { stored, repository, api };
}

describe("createTicket — notifications et erreurs", () => {
  test.each([
    [10, "HIGH", 1],
    [3, "LOW", 0],
  ])(
    "sévérité %i : priorité %s et %i notification",
    async (severity, priority, notifications) => {
      const { stored, repository, api } = setup();

      const result = await createTicket(
        { title: "Panne serveur", severity },
        repository,
        api,
      );

      expect(result).toEqual(
        expect.objectContaining({
          title: "Panne serveur",
          severity,
          priority,
          status: "OPEN",
        }),
      );
      expect(stored).toEqual([result]);
      expect(repository.save).toHaveBeenCalledTimes(1);
      expect(repository.save).toHaveBeenCalledWith(result);
      expect(api.postTicket).toHaveBeenCalledTimes(1);
      expect(api.notifySupport).toHaveBeenCalledTimes(notifications);
      if (notifications) {
        expect(api.notifySupport).toHaveBeenCalledWith(
          expect.objectContaining({
            id: result.id,
            title: result.title,
            priority,
          }),
        );
      }
    },
  );

  test("conserve le ticket local et ne notifie pas si le POST échoue", async () => {
    const { stored, repository, api } = setup();
    const error = new Error("POST indisponible");
    api.postTicket.mockRejectedValue(error);

    await expect(
      createTicket({ title: "Panne serveur", severity: 10 }, repository, api),
    ).rejects.toBe(error);

    expect(stored).toEqual([
      expect.objectContaining({ title: "Panne serveur", priority: "HIGH" }),
    ]);
    expect(api.notifySupport).not.toHaveBeenCalled();
  });

  test("propage la panne de notification et conserve le ticket déjà sauvegardé", async () => {
    const { stored, repository, api } = setup();
    const error = new Error("Notification indisponible");
    api.notifySupport.mockRejectedValue(error);

    await expect(
      createTicket({ title: "Panne serveur", severity: 10 }, repository, api),
    ).rejects.toBe(error);

    expect(stored).toEqual([
      expect.objectContaining({ title: "Panne serveur", priority: "HIGH" }),
    ]);
    expect(api.postTicket).toHaveBeenCalledTimes(1);
    expect(api.notifySupport).toHaveBeenCalledTimes(1);
  });
});
