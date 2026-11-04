/** Lecture filtrée utilisée au TP3, indépendante de l’interface. */
export async function getOpenTickets(api) {
  const tickets = await api.getTickets();
  return tickets.filter((ticket) => ticket.status === "OPEN");
}
