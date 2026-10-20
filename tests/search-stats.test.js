import { calculateStats, filterTickets } from "../src/ticket-utils.js";

describe("filterTickets", () => {
  test.each(["vpn", "  vpn  ", "VPN"])(
    "ignore la casse et les espaces extérieurs pour %j",
    (query) => {
      const vpn = { title: "VPN inaccessible" };
      const tickets = [vpn, { title: "Imprimante cassée" }];

      const result = filterTickets(tickets, query);

      expect(result).toEqual([vpn]);
    },
  );

  test.each(["", "   "])("renvoie tous les tickets pour %j", (query) => {
    const tickets = [{ title: "VPN inaccessible" }, { title: "Imprimante" }];

    const result = filterTickets(tickets, query);

    expect(result).toEqual(tickets);
  });
});

describe("calculateStats", () => {
  test("compte uniquement OPEN comme ouvert et CLOSED comme fermé", () => {
    const tickets = [
      { status: "OPEN" },
      { status: "CLOSED" },
      { status: "PENDING" },
      { status: "UNKNOWN" },
    ];

    const stats = calculateStats(tickets);

    expect(stats).toEqual({ total: 4, open: 1, closed: 1 });
  });

  test("renvoie des compteurs nuls pour une liste vide", () => {
    const tickets = [];

    const stats = calculateStats(tickets);

    expect(stats).toEqual({ total: 0, open: 0, closed: 0 });
  });
});
