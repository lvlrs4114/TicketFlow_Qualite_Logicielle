import { getOpenTickets } from "../src/ticket-service.js";

describe("getOpenTickets", () => {
  test("retourne exactement les ouverts dans leur ordre, avec un seul appel API", async () => {
    const first = { id: 1, status: "OPEN" };
    const last = { id: 3, status: "OPEN" };
    const api = {
      getTickets: jest
        .fn()
        .mockResolvedValue([first, { id: 2, status: "CLOSED" }, last]),
    };

    const tickets = await getOpenTickets(api);

    expect(tickets).toEqual([first, last]);
    expect(api.getTickets).toHaveBeenCalledTimes(1);
  });

  test("retourne une liste vide si aucun ticket n'est disponible", async () => {
    const api = { getTickets: jest.fn().mockResolvedValue([]) };

    await expect(getOpenTickets(api)).resolves.toEqual([]);
  });

  test("propage une panne de la dépendance API", async () => {
    const error = new Error("Service indisponible");
    const api = { getTickets: jest.fn().mockRejectedValue(error) };

    await expect(getOpenTickets(api)).rejects.toBe(error);
  });
});
