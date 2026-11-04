import { readFileSync } from "node:fs";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

beforeEach(async () => {
  jest.resetModules();
  localStorage.clear();
  const html = readFileSync("index.html", "utf8");
  document.body.innerHTML = new DOMParser().parseFromString(
    html,
    "text/html",
  ).body.innerHTML;
  require("../src/app.js");
  await screen.findByText("Aucun ticket.");
});

afterEach(() => {
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
