import { calculatePriority, normalizeTicketTitle } from "./ticket-utils.js";
import { ticketRepository } from "./ticket-repository.js";
import { ticketApi } from "./ticket-api.js";

export async function getTickets(api = ticketApi) {
  return api.getTickets();
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
  const payload = { title: ticket.title, priority: ticket.priority };
  const persisted = await repository.save({ ...ticket, title: ticket.title });
  await api.postTicket(payload);
  if (ticket.priority === "HIGH") await api.notifySupport(ticket);
  return persisted;
}

export async function closeTicket(
  ticket,
  repository = ticketRepository,
  api = ticketApi,
) {
  const closed = { ...ticket, status: "CLOSED" };
  const persisted = await repository.replace(closed);
  await api.patchTicket(closed);
  return persisted;
}
