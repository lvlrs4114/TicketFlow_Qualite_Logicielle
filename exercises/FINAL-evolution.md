# Exercice final — Prendre en charge les tickets (35–40 min)

## Objectif

L’application doit permettre de prendre en charge un ticket. Un ticket passe de `OPEN` à `IN_PROGRESS`, reste compté parmi les tickets ouverts et peut ensuite être fermé. Vous allez vérifier la règle avec Jest et le parcours utilisateur avec Cypress.

## Mission essentielle

1. Dans `tests/FINAL-starter.test.js`, activez les deux tests et écrivez uniquement les assertions `expect` manquantes. Toute la préparation, les mocks et les appels sont fournis.
2. Vérifiez que les tests échouent avant d’adapter le code, puis corrigez `calculateStats()` et ajoutez la méthode `startTicket()` au service.
3. Dans `src/app.js`, ajoutez un bouton **Commencer** à côté de **Détails** et **Clore** sur les cartes `OPEN`. Au clic, le ticket passe à `IN_PROGRESS` et la carte affiche le nouveau statut.
4. Dans `cypress/e2e/FINAL-starter.cy.js`, complétez et activez le parcours Cypress : créer un ticket, le commencer, vérifier `IN_PROGRESS`, puis vérifier qu’il compte toujours parmi les tickets ouverts.
5. Lancez les tests Jest ciblés, le test Cypress, la suite Jest et le build.

## Point de départ

Ouvrez `tests/FINAL-starter.test.js` et `cypress/e2e/FINAL-starter.cy.js`. Les tests sont ignorés au départ et contiennent des TODO. Les fichiers fonctionnels à faire évoluer sont `src/ticket-utils.js`, `src/ticket-service.js` et `src/app.js`.

```bash
npm test -- --runInBand --runTestsByPath tests/FINAL-starter.test.js
npm run e2e -- --spec cypress/e2e/FINAL-starter.cy.js
```

Au départ, les tests sont ignorés; `calculateStats()` ne compte que `OPEN` comme ouvert et l’interface n’a pas encore le bouton de prise en charge.

## Critères de réussite

- Les tests Jest vérifient le calcul des statistiques et le passage du service de `OPEN` à `IN_PROGRESS`.
- Le test Cypress vérifie le bouton, le statut visible et les statistiques dans le navigateur.
- Les deux tests ciblés, la suite Jest et le build passent après la correction.
- `npm run build` passe.

## Indices progressifs

<details><summary>Indice 1</summary>
Le total et le nombre de tickets fermés ne changent pas avec cette règle.
</details>

<details><summary>Indice 2</summary>
Dans `calculateStats`, le nombre `open` vient d’un filtre sur le statut.
</details>

<details><summary>Indice 3</summary>
Un ticket doit contribuer à `open` si son statut est `OPEN` ou `IN_PROGRESS`.
</details>

## Bonus facultatif

Quels autres composants, comme l’interface ou une fonction qui récupère les tickets ouverts, pourraient devoir appliquer cette nouvelle règle ?
