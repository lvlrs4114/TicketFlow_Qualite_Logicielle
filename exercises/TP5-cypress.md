# TP5 — Parcours utilisateur dans le navigateur (60–70 min)

**Contexte**

Vous allez vérifier un parcours critique dans le navigateur, avec des données réinitialisées pour chaque test. Le smoke existant montre déjà la création d’un ticket.

**Votre mission**

1. Lancez le serveur dans un terminal et exécutez `smoke.cy.js` depuis l’autre.
2. Dans le starter, créez « Production indisponible », sévérité `8`, puis vérifiez `HIGH` dans sa carte.
3. Dans un test indépendant, ouvrez son détail, vérifiez `OPEN`, fermez-le, vérifiez `CLOSED` et revenez à la liste.
4. Complétez les deux tests, puis retirez leur `it.skip` pour les exécuter.

**Fichiers utiles**

- `cypress/e2e/smoke.cy.js`
- `cypress/e2e/05-parcours.starter.cy.js`
- Sélecteurs dans `index.html` et `src/app.js`

Sélecteurs utiles : `[data-cy="ticket-title"]`, `[data-cy="ticket-severity"]`, `[data-cy="create-ticket"]`, `[data-cy="ticket-card"]`, `[data-cy="priority-badge"]`, `[data-cy="open-ticket"]`, `[data-cy="detail-close-ticket"]`, `[data-cy="detail-status"]`, `[data-cy="back-to-list"]`.

**Commande**

Terminal 1 : `npm run dev`

Terminal 2 : `npm run cypress:open` (smoke d’abord) ou `npm run e2e`.

**Critère de réussite**

Le smoke passe. Une fois complétés et activés, les deux tests sont indépendants et vérifient la priorité dans la bonne carte puis la fermeture dans le détail.

**Bonus (facultatif)**

Recharge et persistance, recherche, titre vide ou tri; gardez chaque scénario autonome.
