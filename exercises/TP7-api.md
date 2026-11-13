# TP7 — Tester un appel API avec Cypress et Jest (25–30 min)

## Objectif

Vérifier le même contrat de création d’un ticket à deux niveaux : dans le navigateur avec Cypress, puis dans le service avec Jest et une API mockée.

Le transport HTTP utilise `fetch`. Les scénarios Cypress interceptent les requêtes avec `cy.intercept` : aucun backend n’est requis.

## Mission essentielle

1. Dans `cypress/e2e/07-api.cy.js`, retirez `it.skip`, puis interceptez `GET /api/tickets` et répondez avec une liste vide.
2. Intercepter `POST /api/tickets`, vérifier le corps envoyé (`title` et `priority`) et répondre avec un succès.
3. Créer un ticket depuis l’interface et vérifier le message de succès ainsi que les requêtes observées.
4. Dans `tests/create-api.test.js`, retirez `test.skip`, puis testez `createTicket` avec une API Jest mockée. Vérifiez que `postTicket` reçoit le même contrat métier.

## À retenir

- Cypress exerce le navigateur et observe une requête HTTP réelle, interceptée par le test.
- Jest remplace la frontière API par une fonction simulée; il vérifie le service sans réseau ni interface.
- Les deux tests partagent le contrat, mais ne prouvent pas les mêmes choses.

## Critères de réussite

- Cypress confirme le `GET` initial et le `POST` après soumission.
- Le test Jest vérifie le payload et passe sans réseau.
- Les réponses API simulées suivent la forme `{ tickets: [...] }` pour le `GET` et `{ ticket: ... }` pour le `POST`.

## Point de départ

Les deux tests sont ignorés et contiennent des TODO. Commencez par les compléter, puis retirez `it.skip` et `test.skip`. Pour connaître la priorité attendue, suivez la règle métier de `src/ticket-utils.js`.

## Défi

Faites répondre le `POST` avec une erreur HTTP et vérifiez le comportement de l’interface. Ajoutez ensuite le cas correspondant dans Jest en faisant rejeter `postTicket`.
