# TicketFlow — Qualité Logicielle & Testing Avancé

Projet fil rouge pour 14 h de cours Bachelor 3. L’application est volontairement imparfaite : les étudiants partent d’une exploration manuelle, puis construisent progressivement une stratégie de tests utile.

## Prérequis

Node.js 20+ (22 recommandé), npm, navigateur et éditeur.

## Installation

```bash
npm install
```

## Application

```bash
npm run dev
```

Puis ouvrir <http://localhost:3000>. Aucun backend séparé n’est nécessaire : le client HTTP de démonstration fournit les réponses attendues par l’application et les tests.

## Jest

```bash
npm test
npm run test:unit
npm run test:watch
npm run test:coverage
```

Le fichier de configuration limite la couverture aux modules exécutables hors DOM. Les tests de départ sont volontairement insuffisants et restent verts malgré plusieurs défauts métier.

## Cypress

Laisser `npm run dev` tourner dans un terminal, puis lancer :

```bash
npm run cypress:open
# ou
npm run e2e
```

Les sélecteurs d’action sont exposés avec `data-cy`. Les quatre scénarios de `cypress/e2e/06-flaky.starter.cy.js` sont désactivés au départ : ils servent de support au TP6 et s'activent un à un.

## Parcours pédagogique

Les sujets étudiants détaillés sont dans [`exercises/README.md`](exercises/README.md) : TP0 exploration, TP1 unitaires, TP2 coverage et limites, TP3 API et mocks, TP4 intégration, TP5 Cypress, TP6 flakiness, TP7 tests API Cypress/Jest, TP8 CI, puis l'exercice final. Chaque fiche comprend mission, investigation, défi et livrable. Le tri alphabétique des tickets est une fonctionnalité secondaire à tester.
