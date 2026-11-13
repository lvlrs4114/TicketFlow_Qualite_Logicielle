const { createServer } = require("node:http");
const { readFile } = require("node:fs/promises");
const { extname, resolve, sep } = require("node:path");
const { randomUUID } = require("node:crypto");

const root = resolve(__dirname, "..");
const tickets = new Map();
const mime = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
};

function sendJson(response, status, body) {
  response.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(body));
}

async function readJson(request) {
  let raw = "";
  for await (const chunk of request) {
    raw += chunk;
    if (raw.length > 1_000_000) throw new Error("Requête trop volumineuse");
  }
  return raw ? JSON.parse(raw) : {};
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url, "http://localhost");
  try {
    if (url.pathname === "/api/tickets" && request.method === "GET") {
      return sendJson(response, 200, { tickets: [...tickets.values()] });
    }
    if (url.pathname === "/api/tickets" && request.method === "POST") {
      const payload = await readJson(request);
      if (!payload.title) return sendJson(response, 400, { message: "title is required" });
      const ticket = {
        ...payload,
        id: randomUUID(),
        severity: payload.priority === "HIGH" ? 8 : 3,
        status: "OPEN",
        createdAt: new Date().toISOString(),
      };
      tickets.set(ticket.id, ticket);
      return sendJson(response, 201, { ticket });
    }
    if (url.pathname === "/api/support-notifications" && request.method === "POST") {
      return sendJson(response, 201, { delivered: true });
    }
    const ticketMatch = url.pathname.match(/^\/api\/tickets\/([^/]+)$/);
    if (ticketMatch && request.method === "PATCH") {
      const current = tickets.get(ticketMatch[1]);
      if (!current) return sendJson(response, 404, { message: "Ticket introuvable" });
      const ticket = { ...current, ...(await readJson(request)) };
      tickets.set(ticket.id, ticket);
      return sendJson(response, 200, { ticket });
    }
    if (url.pathname === "/api/tickets" && request.method === "DELETE") {
      tickets.clear();
      return sendJson(response, 200, { tickets: [] });
    }

    const pathname = url.pathname === "/" ? "/index.html" : decodeURIComponent(url.pathname);
    const file = resolve(root, `.${pathname}`);
    if (file !== root && !file.startsWith(`${root}${sep}`)) {
      return sendJson(response, 403, { message: "Accès interdit" });
    }
    const contents = await readFile(file);
    response.writeHead(200, { "Content-Type": mime[extname(file)] ?? "application/octet-stream" });
    response.end(contents);
  } catch (error) {
    sendJson(response, 500, { message: error.message || "Erreur serveur" });
  }
});

const port = Number(process.env.PORT ?? 3000);
server.listen(port, "127.0.0.1", () => {
  console.log(`TicketFlow démarré sur http://localhost:${port}`);
});
