import { createTicket } from "../src/ticket-service.js";
import { httpClient } from "../src/ticket-api.js";

describe("createTicket — intégration locale", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("transmet le contrat attendu au transport local", async () => {

    //arrange
    jest
      .spyOn(httpClient, "post")
      .mockResolvedValue({ status: 201, body: { ticket: {} } });

    //act
    await createTicket({ title: "Panne serveur", severity: 8 });

    //assert
    expect(httpClient.post).toHaveBeenCalledWith("/api/tickets", {
      title: "Panne serveur",
      priority: "HIGH",
    });
  });
});
