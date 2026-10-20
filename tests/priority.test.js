import { calculatePriority } from "../src/ticket-utils.js";

describe("calculatePriority", () => {
  test.each([
    [0, "LOW"],
    [3, "LOW"],
    [4, "MEDIUM"],
    [7, "MEDIUM"],
    [8, "HIGH"],
    [10, "HIGH"],
  ])("classe la sévérité %i en %s", (severity, expected) => {
    const ticket = { severity };

    const priority = calculatePriority(ticket);

    expect(priority).toBe(expected);
  });
});
