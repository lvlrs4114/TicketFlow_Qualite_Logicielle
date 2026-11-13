import { createTicket, closeTicket, getTickets } from "./ticket-service.js";
import { ticketRepository } from "./ticket-repository.js";
import { ticketApi } from "./ticket-api.js";
import {
  filterTickets,
  calculateStats,
  sortTicketsByTitle,
} from "./ticket-utils.js";

const form = document.querySelector("#ticket-form");
const title = document.querySelector("#title");
const severity = document.querySelector("#severity");
const search = document.querySelector("#search");
const sortMode = document.querySelector("#sort-mode");
const list = document.querySelector("#ticket-list");
const stats = document.querySelector("#stats");
const message = document.querySelector("#form-message");
const listMessage = document.querySelector("#list-message");
const reset = document.querySelector("#reset-btn");
const board = document.querySelector("#board-panel");
const detailPanel = document.querySelector("#detail-panel");
const detail = document.querySelector("#ticket-detail");
const back = document.querySelector("#back-btn");

let tickets = [];
let selectedTicketId = null;

function displayTitle(ticket) {
  return ticket.title ?? ticket.name ?? "(sans titre)";
}

function renderStats() {
  const summary = calculateStats(tickets);
  stats.innerHTML = `<div class="stat" data-cy="stat-total"><strong>${summary.total}</strong><br>Total</div><div class="stat" data-cy="stat-open"><strong>${summary.open}</strong><br>Ouverts</div><div class="stat" data-cy="stat-closed"><strong>${summary.closed}</strong><br>Fermés</div>`;
}

function renderList() {
  const visible = sortTicketsByTitle(
    filterTickets(tickets, search.value),
    sortMode.value,
  );
  list.innerHTML = visible.length
    ? visible
        .map(
          (ticket) =>
            `<article class="ticket" data-id="${ticket.id}" data-cy="ticket-card"><div><h3 data-cy="ticket-title-display">${displayTitle(ticket)}</h3><span class="badge" data-cy="priority-badge">${ticket.priority}</span> <span class="meta">Sévérité ${ticket.severity} · <span data-cy="ticket-status">${ticket.status}</span></span></div><div class="ticket-actions"><button class="open-btn secondary" data-id="${ticket.id}" data-cy="open-ticket">Détails</button>${ticket.status === "OPEN" ? `<button class="close-btn" data-id="${ticket.id}" data-cy="close-ticket">Clore</button>` : ""}</div></article>`,
        )
        .join("")
    : '<p class="empty">Aucun ticket.</p>';
  list.querySelectorAll(".open-btn").forEach((button) =>
    button.addEventListener("click", () => {
      selectedTicketId = button.dataset.id;
      render();
    }),
  );
  list.querySelectorAll(".close-btn").forEach((button) =>
    button.addEventListener("click", async () => {
      const ticket = tickets.find((item) => item.id === button.dataset.id);
      if (!ticket) return;
      // Deliberate source of nondeterminism for TP6.
      await new Promise((resolve) => setTimeout(resolve, Math.random() * 900));
      await closeTicket(ticket);
      await load();
    }),
  );
}

function renderDetail() {
  const ticket = tickets.find((item) => item.id === selectedTicketId);
  if (!ticket) {
    selectedTicketId = null;
    detailPanel.hidden = true;
    board.hidden = false;
    return;
  }
  detailPanel.hidden = false;
  board.hidden = true;
  detail.innerHTML = `<p class="eyebrow">Fiche ticket</p><h2>${displayTitle(ticket)}</h2><p><span class="badge" data-cy="detail-priority">${ticket.priority}</span></p><dl class="ticket-details"><div><dt>Sévérité</dt><dd>${ticket.severity}</dd></div><div><dt>Statut</dt><dd data-cy="detail-status">${ticket.status}</dd></div><div><dt>Créé le</dt><dd>${new Date(ticket.createdAt).toLocaleString("fr-FR")}</dd></div></dl>${ticket.status === "OPEN" ? '<button id="detail-close-btn" data-cy="detail-close-ticket">Clore le ticket</button>' : '<p class="success">Ce ticket est fermé.</p>'}`;
  const closeButton = document.querySelector("#detail-close-btn");
  closeButton?.addEventListener("click", async () => {
    await closeTicket(ticket);
    await load();
  });
}

function render() {
  renderStats();
  if (selectedTicketId) renderDetail();
  else {
    detailPanel.hidden = true;
    board.hidden = false;
    renderList();
  }
}

async function load() {
  try {
    tickets = await getTickets();
    listMessage.textContent = "";
    render();
  } catch (error) {
    listMessage.textContent = `Erreur de chargement : ${error.message}`;
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  message.textContent = "";
  try {
    await createTicket({ title: title.value, severity: severity.value });
    title.value = "";
    message.textContent = "Ticket créé.";
    await load();
  } catch (error) {
    message.textContent = `Erreur : ${error.message}`;
    await load();
  }
});

search.addEventListener("input", render);
sortMode.addEventListener("change", render);
reset.addEventListener("click", async () => {
  ticketRepository.clear();
  await ticketApi.clearTickets();
  selectedTicketId = null;
  await load();
});
back.addEventListener("click", () => {
  selectedTicketId = null;
  render();
});

load();
