import { calculatePriority, normalizeTicketTitle } from "./ticket-utils.js";
import { ticketRepository } from "./ticket-repository.js";
import { ticketApi } from "./ticket-api.js";

export async function getTickets(api = ticketApi) {
  return api.getTickets();
}

export async function getOpenTickets(api = ticketApi) {
  const tickets = await getTickets(api);
  return tickets.filter((ticket) => ticket.status === "OPEN");
}

export async function createTicket(
  input,
  repository = ticketRepository,
  api = ticketApi,
) {
  const title = normalizeTicketTitle(input?.title);
  if (!title) throw new Error("Le titre du ticket est obligatoire.");
  const severity = Number(input?.severity ?? 3);
  const ticket = {
    id: crypto.randomUUID(),
    title,
    severity,
    priority: calculatePriority({ severity }),
    status: "OPEN",
    createdAt: new Date().toISOString(),
  };
  const payload = { name: ticket.title, priority: ticket.priority };
  const persisted = await repository.save({ ...ticket, name: ticket.title });
  await api.postTicket(payload);
  if (ticket.priority === "HIGH") await api.notifySupport(ticket);
  return persisted;
}

export async function closeTicket(ticket, repository = ticketRepository) {
  return repository.replace({ ...ticket, status: "CLOSED" });
}
