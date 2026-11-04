# TP6 — Stabiliser des tests Cypress (40–45 min)

## Objectif

Un test peut passer ou échouer selon le moment où il regarde l’écran. Un autre peut dépendre d’un ticket créé par un test précédent; repérez ces deux problèmes sans modifier l’application.

## Mission essentielle

1. Activez le cas A et lancez-le plusieurs fois; notez pourquoi le résultat varie.
2. Rendez sa vérification fiable en attendant un état observable, sans délai fixe.
3. Activez le cas B et lancez son deuxième test seul; observez l’échec.
4. Faites préparer ses données par chaque test, puis vérifiez-les seuls et ensemble.

## Point de départ

Ouvrez `cypress/e2e/06-flaky.starter.cy.js`. Le code de fermeture aléatoire est dans `src/app.js`; ne le modifiez pas. Dans deux terminaux, lancez `npm run dev`, puis `npm run e2e -- --spec cypress/e2e/06-flaky.starter.cy.js`.

Au départ, A peut lire `OPEN` avant la fin de la fermeture; B suppose qu’un ticket créé par un autre test existe encore.

## Critères de réussite

- A attend que le ticket soit effectivement `CLOSED`, sans `cy.wait(...)` fixe.
- B passe seul et avec le reste de la spec.
- Chaque test prépare les données dont il a besoin.

## Indices progressifs

<details><summary>Indice 1</summary>
Une attente fixe dure toujours le même temps : parfois elle est trop courte, parfois elle gaspille du temps. Une assertion Cypress peut attendre une condition jusqu’à son délai maximal.
</details>

<details><summary>Indice 2</summary>
`.then(...)` s’exécute une fois sur l’élément trouvé; une assertion dans ce callback n’est pas répétée. `.should(...)` réessaie l’assertion pendant que Cypress attend que l’interface se mette à jour.
</details>

<details><summary>Indice 3</summary>
Pour A, ciblez la carte du ticket puis vérifiez son `[data-cy="ticket-status"]` avec une assertion Cypress. Pour B, la création et la réinitialisation doivent se trouver dans le test qui vérifie le ticket.
</details>

## Bonus D (facultatif)

Activez le scénario D et remplacez son sélecteur structurel `#ticket-list article h3` par un sélecteur stable. Il prépare déjà ses propres données; l’application n’a pas besoin d’être modifiée.
