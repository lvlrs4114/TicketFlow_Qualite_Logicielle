import { calculateStats } from "../src/ticket-utils.js";

describe("FINAL — calculateStats et tickets en cours", () => {
  test.skip("compte IN_PROGRESS parmi les tickets ouverts", () => {
    const tickets = [
      { status: "OPEN" },
      { status: "IN_PROGRESS" },
      { status: "CLOSED" },
    ];

    const stats = calculateStats(tickets);

    // TODO étudiant : attendre { total: 3, open: 2, closed: 1 }.
    expect(stats).toEqual({ total: 3, open: 1, closed: 1 });
  });
});
