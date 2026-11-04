# Exercice final — Compter les tickets en cours (20 min)

**Contexte**

Une nouvelle règle métier demande de compter les tickets `IN_PROGRESS` parmi les tickets ouverts. La fonction concernée est pure : testez-la directement, sans mocks.

**Votre mission**

1. Activez et complétez le test ignoré dans `tests/FINAL-starter.test.js` pour les statuts `OPEN`, `IN_PROGRESS` et `CLOSED`.
2. Lancez le test ciblé et observez le rouge avant de modifier le code.
3. Adaptez `calculateStats()` dans `src/ticket-utils.js`.
4. Relancez le test, la suite Jest et le build.

**Fichiers utiles**

- `tests/FINAL-starter.test.js`
- `src/ticket-utils.js`
- `tests/ticket-utils.test.js`

**Commande**

```bash
npm test -- --runInBand --runTestsByPath tests/FINAL-starter.test.js
npm test -- --runInBand
npm run build
```

**Critère de réussite**

Le test sans mocks passe pour les trois statuts après la modification de `calculateStats()`. Les tests existants et le build restent verts.

**Bonus (facultatif)**

Discutez quels autres endroits, par exemple `getOpenTickets()` ou l’interface, pourraient évoluer avec cette règle.
