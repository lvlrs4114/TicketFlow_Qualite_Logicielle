# TP4 — Suivre un ticket jusqu’au transport (45–50 min)

**Contexte**

Le test unitaire ne vérifie pas encore le trajet complet de création. Le projet utilise un dépôt local et une façade qui imite un transport HTTP; aucun backend distant n’est appelé.

**Votre mission**

1. Complétez et activez le test `test.skip` du starter. Il utilise le vrai `createTicket`, le dépôt et l’API; seul `httpClient.post` est espionné.
2. Vérifiez l’appel au transport pour « Panne serveur » avec une sévérité de 8.
3. Exécutez le test, observez le résultat et identifiez l’écart avec le contrat métier attendu.
4. Corrigez le service, puis relancez les nouveaux et anciens tests ainsi que le build.

**Fichiers utiles**

- `tests/create-integration.test.js`
- `src/ticket-service.js`
- Pour suivre le trajet : `src/ticket-repository.js`, `src/ticket-api.js`

**Commande**

```bash
npm test -- --runInBand --runTestsByPath tests/create-integration.test.js
npm test -- --runInBand
npm run build
```

**Critère de réussite**

Le test activé vérifie le contrat à la frontière transport avec les composants réels et passe après une correction ciblée. La suite existante et le build restent verts.

**Bonus (facultatif)**

Supprimez l’alias superflu du ticket stocké ou simulez un POST rejeté. Expliquez ce que l’espionnage du transport ne prouve pas.
