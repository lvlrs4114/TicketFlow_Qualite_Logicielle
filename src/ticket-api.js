export const httpClient = {
  async get(path) {
    return toResponse(await fetch(path));
  },
  async post(path, payload) {
    return toResponse(await fetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }));
  },
};

async function toResponse(response) {
  let body = {};
  try { body = await response.json(); } catch {}
  return { status: response.status, body };
}

function assertOk(response) {
  if (response.status >= 400)
    throw new Error(response.body?.message ?? "Erreur HTTP");
  return response.body;
}

export const ticketApi = {
  async getTickets() {
    const body = assertOk(await httpClient.get("/api/tickets"));
    return body.tickets;
  },
  async postTicket(payload) {
    return assertOk(await httpClient.post("/api/tickets", payload));
  },
  async notifySupport(ticket) {
    if (!ticket?.id) throw new Error("Ticket invalide");
    return assertOk(await httpClient.post("/api/support-notifications", { ticketId: ticket.id }));
  },
};
