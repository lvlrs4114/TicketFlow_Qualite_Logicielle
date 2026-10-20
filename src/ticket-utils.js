export function normalizeTicketTitle(title) {
  return String(title ?? "")
    .trim()
    .replace(/\s+/g, " ");
}

/**
 * Cost of shipping a replacement kit for a support ticket.
 *
 * This small business rule is deliberately kept pure: it gives the class a
 * second example on which to practise partitions and boundary values.
 */
export function shippingCost(order) {
  const total = Number(order?.total ?? 0);
  if (order?.premium) return 9.9;
  if (total > 100) return 0;
  return 9.9;
}

export function calculatePriority(ticket) {
  const severity = Number(ticket?.severity);
  if (severity >= 8) return "HIGH";
  if (severity >= 4) return "MEDIUM";
  return "LOW";
}

export function filterTickets(tickets, query) {
  const safe = Array.isArray(tickets) ? tickets : [];
  const q = String(query ?? "")
    .trim()
    .toLowerCase();
  if (!q) return safe;
  return safe.filter((t) => t.title.toLowerCase().includes(q));
}

/** Affichage secondaire : le mode par défaut conserve l'ordre de création. */
export function sortTicketsByTitle(tickets, mode = "creation") {
  const safe = Array.isArray(tickets) ? tickets : [];
  if (mode !== "title") return safe;
  return [...safe].sort((a, b) =>
    String(a.title).localeCompare(String(b.title), "fr", {
      sensitivity: "base",
    }),
  );
}

export function calculateStats(tickets) {
  const safe = Array.isArray(tickets) ? tickets : [];
  const open = safe.filter((t) => t.status === "OPEN").length;
  const closed = safe.filter((t) => t.status === "CLOSED").length;
  return { total: safe.length, open, closed };
}
