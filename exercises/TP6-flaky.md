# TP6 — Stabiliser deux tests Cypress (40–45 min)

**Contexte**

Deux tests du starter illustrent une observation trop précoce et une dépendance entre scénarios. La fermeture depuis la liste a un délai aléatoire; ne modifiez pas l’application.

**Votre mission**

1. Activez le cas A (`describe.skip` → `describe`) et lancez-le; observez qu’il peut échouer ou passer selon le délai.
2. Remplacez l’observation fragile par une vérification fiable de l’état fermé, sans délai fixe.
3. Activez le cas B et vérifiez qu’il échoue lorsqu’il est lancé seul.
4. Préparez les données nécessaires dans chaque test; relancez les tests séparément puis ensemble.

**Fichiers utiles**

- `cypress/e2e/06-flaky.starter.cy.js`
- `cypress/e2e/smoke.cy.js` pour la création
- `cypress/support/e2e.js` pour les commandes de préparation
- `src/app.js` pour observer le comportement (ne pas le modifier)

**Commande**

Terminal 1 : `npm run dev`

Terminal 2 : `npm run e2e -- --spec cypress/e2e/06-flaky.starter.cy.js`

**Critère de réussite**

Le cas A attend l’état observable sans attente fixe. Le cas B passe seul et avec la spec complète, avec des données préparées par le test lui-même.

**Bonus (facultatif)**

Remplacez le sélecteur CSS profond du cas D par un sélecteur `data-cy` stable.
