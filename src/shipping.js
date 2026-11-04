/** Règle métier de livraison utilisée au TP2, indépendante de l’interface. */
export function shippingCost(order) {
  const total = Number(order?.total ?? 0);
  if (order?.premium) return 0;
  if (total >= 100) return 0;
  return 9.9;
}
