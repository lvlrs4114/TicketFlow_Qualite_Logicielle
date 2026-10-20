import { shippingCost } from "../src/ticket-utils.js";

describe("shippingCost", () => {
  test.each([
    [99, 9.9],
    [100, 0],
    [101, 0],
    [0, 9.9],
  ])(
    "facture %s € de commande non premium à %s € de livraison",
    (total, expected) => {
      const order = { total, premium: false };

      const cost = shippingCost(order);

      expect(cost).toBe(expected);
    },
  );

  test("offre la livraison à un membre premium pour 20 €", () => {
    const order = { total: 20, premium: true };

    const cost = shippingCost(order);

    expect(cost).toBe(0);
  });

  test("considère un argument absent comme un total nul non premium", () => {
    const cost = shippingCost();

    expect(cost).toBe(9.9);
  });
});
