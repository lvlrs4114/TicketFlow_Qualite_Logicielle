import { readFileSync } from "node:fs";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

beforeEach(async () => {
  jest.resetModules();
  localStorage.clear();
  const apiTickets = [];
  global.fetch = jest.fn(async (_path, options = {}) => ({
    status: options.method === "POST" ? 201 : 200,
    json: async () => {
      if (options.method === "POST") {
        const ticket = JSON.parse(options.body);
        apiTickets.push({ ...ticket, id: "created-1", severity: 3, status: "OPEN" });
        return { ticket };
      }
      return { tickets: apiTickets };
    },
  }));
  const html = readFileSync("index.html", "utf8");
  document.body.innerHTML = new DOMParser().parseFromString(
    html,
    "text/html",
  ).body.innerHTML;
  require("../src/app.js");
  await screen.findByText("Aucun ticket.");
});

afterEach(() => {
  delete global.fetch;
  localStorage.clear();
  document.body.innerHTML = "";
});

test("affiche le ticket créé depuis le formulaire", async () => {
  const user = userEvent.setup();

  await user.type(
    screen.getByRole("textbox", { name: "Titre" }),
    "VPN inaccessible",
  );
  await user.click(screen.getByRole("button", { name: "Créer le ticket" }));

  expect(await screen.findByText("VPN inaccessible")).toBeVisible();
});
