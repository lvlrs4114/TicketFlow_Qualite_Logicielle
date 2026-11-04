# TP5 — Parcours utilisateur dans le navigateur (60–70 min)

## Objectif

Un ticket peut être créé sans que l’interface affiche correctement sa priorité ou son état. Vous allez vérifier le parcours visible dans un vrai navigateur.

## Mission essentielle

1. **Créer** : dans le premier test, saisir « Production indisponible », choisir la sévérité `8`, puis créer le ticket.
2. **Vérifier la priorité** : trouvez la carte de ce ticket et vérifiez que son badge indique `HIGH`.
3. **Préparer le deuxième test** : créez-y son propre ticket de sévérité `8`; chaque test repart de données réinitialisées.
4. **Ouvrir et fermer** : ouvrez le détail, vérifiez `OPEN`, puis utilisez le bouton de fermeture.
5. **Vérifier le résultat** : vérifiez `CLOSED` et revenez à la liste. Complétez les TODO puis retirez les deux `it.skip`.

## Point de départ

Ouvrez `cypress/e2e/05-parcours.starter.cy.js`. Lancez le serveur dans un terminal, puis le smoke dans un autre :

```bash
npm run dev
npm run e2e -- --spec cypress/e2e/smoke.cy.js
```

Dans Cypress, `cy.visit("/")` ouvre l’application, `cy.get(...)` trouve un élément, `cy.contains(...)` cherche un texte, `.find(...)` cherche à l’intérieur d’un élément déjà trouvé, et `.should(...)` vérifie une condition avec attente automatique.

Exemple de sélection d’une carte puis de son badge (à adapter, ce n’est pas le scénario complet) :

```js
cy.contains('[data-cy="ticket-card"]', "Mon titre")
  .find('[data-cy="priority-badge"]');
```

## Critères de réussite

- Le smoke et les deux tests complétés passent.
- `HIGH` est vérifié dans la carte du ticket créé.
- Le deuxième test fonctionne seul et vérifie `OPEN`, `CLOSED`, puis le retour à la liste.

## Indices progressifs

<details><summary>Indice 1</summary>
Les champs ont les sélecteurs `[data-cy="ticket-title"]` et `[data-cy="ticket-severity"]`; le bouton de création est `[data-cy="create-ticket"]`.
</details>

<details><summary>Indice 2</summary>
Après création, ciblez la carte avec `cy.contains('[data-cy="ticket-card"]', titre)`, puis cherchez le badge avec `.find(...)`.
</details>

<details><summary>Indice 3</summary>
Le détail s’ouvre avec `[data-cy="open-ticket"]`; son statut est `[data-cy="detail-status"]`. Fermez avec `[data-cy="detail-close-ticket"]`, puis revenez avec `[data-cy="back-to-list"]`.
</details>

## Bonus

Essayez la recherche, le tri ou la persistance après rechargement, en gardant chaque test autonome.
