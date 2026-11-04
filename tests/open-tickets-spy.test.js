import { getOpenTickets } from "../src/open-tickets.js";

afterEach(() => {
  jest.restoreAllMocks();
});

test("observe getTickets sans remplacer son implémentation", async () => {
  const api = {
    async getTickets() {
      return [
        { id: "a", status: "OPEN" },
        { id: "b", status: "CLOSED" },
        { id: "c", status: "OPEN" },
      ];
    },
  };
  const spy = jest.spyOn(api, "getTickets");

  const tickets = await getOpenTickets(api);

  expect(spy).toHaveBeenCalledTimes(1);
  expect(tickets).toEqual([
    { id: "a", status: "OPEN" },
    { id: "c", status: "OPEN" },
  ]);
});
