# Parcours étudiant — TicketFlow

Ces fiches se suivent dans **le même projet**.

| Jour | Séquence                    | Livrable observable                                            |
| ---- | --------------------------- | -------------------------------------------------------------- |
| 1    | [TP0](TP0-exploration.md)   | Trois anomalies reproductibles et classées                     |
| 1    | [TP1](TP1-unitaires.md)     | Tests qui font apparaître au moins deux défauts                |
| 1    | [TP2](TP2-couverture.md)    | Cas limites, mutation manuelle et conclusion sur la couverture |
| 1    | [TP3](TP3-mocks.md)         | Service asynchrone testé avec succès, vide et erreur           |
| 2    | [TP4](TP4-integration.md)   | Contrat `title` vérifié à la frontière du transport            |
| 2    | [TP5](TP5-cypress.md)       | Parcours navigateur création → fermeture → retour              |
| 2    | [TP6](TP6-flaky.md)         | Scénarios isolés sans attente fixe ni sélecteur structurel     |
| 2    | [TP7](TP7-api.md)           | Même contrat API testé en Cypress et Jest                      |
| 2    | [TP8](TP8-ci.md)            | Triage d’incidents CI à partir de journaux                    |
| 2    | [Final](FINAL-evolution.md) | Prise en charge vérifiée par Jest et Cypress                   |

Les groupes rapides passent aux défis, les autres valident d'abord les critères essentiels.

## Avant de commencer

```bash
npm ci
npm run dev
# autre terminal
npm test -- --runInBand
```

Ouvrir `http://localhost:3000`. `npm run dev` démarre l’application et son API locale (`/api/tickets`). Pour Cypress : `npm run cypress:open` ; pour la CI locale : `npm run e2e` avec le serveur démarré. Les scénarios Cypress peuvent intercepter les requêtes avec `cy.intercept`.

Le dossier `enseignant/` contient la correction. Gardez-le fermé pendant les exercices. Chaque exercice précise les fichiers autorisés. Un test rouge attendu fait partie du travail : expliquez ce qu'il prouve avant de corriger le code.

## Règles communes

1. Un test doit avoir une règle attendue indépendante de l'implémentation actuelle.
2. Vérifier le rouge sur le starter, puis le vert après la correction, quand un défaut est annoncé.
3. Ne pas corriger un défaut hors du TP qui l'introduit, sauf demande de l'enseignant.
4. Protéger le comportement observable. Utiliser un spy seulement si l'appel fait partie du contrat à vérifier.
5. À la fin du TP, pouvoir dire ce que les tests **ne prouvent pas**.

**Fonction secondaire à disposition :** le tri « Titre A–Z » de la liste. L'ordre de création est le mode par défaut. Le tri devrait ignorer la casse et les accents français, sans modifier la liste source.
