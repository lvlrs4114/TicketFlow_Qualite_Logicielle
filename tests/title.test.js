import {
  normalizeTicketTitle,
  sortTicketsByTitle,
} from "../src/ticket-utils.js";

describe("normalizeTicketTitle", () => {
  test.each([
    [null, ""],
    ["   \t\n", ""],
    [
      "  VPN   inaccessible\tdepuis\nce matin  ",
      "VPN inaccessible depuis ce matin",
    ],
  ])("normalise %j en %j", (title, expected) => {
    const result = normalizeTicketTitle(title);

    expect(result).toBe(expected);
  });
});

describe("sortTicketsByTitle", () => {
  test("trie les titres en ordre français sans modifier la liste initiale", () => {
    const tickets = ["zèbre", "Alpha", "école"].map((title) => ({ title }));
    const original = [...tickets];

    const result = sortTicketsByTitle(tickets, "title");

    expect(result.map((ticket) => ticket.title)).toEqual([
      "Alpha",
      "école",
      "zèbre",
    ]);
    expect(tickets).toEqual(original);
  });

  test.each([undefined, "creation"])(
    "conserve l'ordre de création en mode %j, même après un tri par titre",
    (mode) => {
      const tickets = ["zèbre", "Alpha", "école"].map((title) => ({ title }));
      const original = [...tickets];
      sortTicketsByTitle(tickets, "title");

      const result = sortTicketsByTitle(tickets, mode);

      expect(result).toEqual(original);
    },
  );
});
