# Exercice final — Compter les tickets en cours (20 min)

## Objectif

La règle métier évolue : un ticket `IN_PROGRESS` doit compter parmi les tickets ouverts. Vous allez vérifier cette règle dans une fonction simple, puis adapter son calcul.

## Mission essentielle

1. Ouvrez `tests/FINAL-starter.test.js`, activez le test et complétez l’attente indiquée.
2. Lancez le test ciblé et observez l’échec.
3. Adaptez `calculateStats()` pour compter les tickets en cours comme ouverts.
4. Relancez le test ciblé, la suite Jest et le build.

## Point de départ

Ouvrez `tests/FINAL-starter.test.js`. La fonction à corriger est dans `src/ticket-utils.js`.

```bash
npm test -- --runInBand --runTestsByPath tests/FINAL-starter.test.js
```

Au départ, le test est ignoré et le code ne compte que les statuts `OPEN` comme ouverts.

## Critères de réussite

- Le test vérifie les statuts `OPEN`, `IN_PROGRESS` et `CLOSED`.
- Le test ciblé et la suite Jest passent après la correction.
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
