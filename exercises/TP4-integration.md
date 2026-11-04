# TP4 — Suivre un ticket jusqu’au transport (45–50 min)

## Objectif

Quand un ticket est créé, le service le stocke et l’envoie à la façade API. Vous allez vérifier que la requête respecte le contrat attendu à sa sortie.

Le contrat est un `POST /api/tickets` avec un objet contenant `title` et `priority`.

## Mission essentielle

1. Ouvrez le test et activez-le s’il est ignoré.
2. Faites créer « Panne serveur » (sévérité 8), puis vérifiez l’appel envoyé au transport.
3. Lancez le test et repérez la différence entre l’objet envoyé et le contrat.
4. Corrigez le service, puis relancez le test, la suite et le build.

## Point de départ

Ouvrez `tests/create-integration.test.js`. Le trajet est : `ticket-service.js` crée le ticket, `ticket-repository.js` le stocke, puis `ticket-api.js` transmet la requête via `httpClient.post`. Le spy observe cette dernière fonction tout en gardant le vrai service, dépôt et API; un mock complet de l’API remplacerait ce trajet.

```bash
npm test -- --runInBand --runTestsByPath tests/create-integration.test.js
```

Au départ, observez le test rouge et le contenu réellement transmis.

## Critères de réussite

- Le test vérifie le chemin et le contrat `title` / `priority`.
- Le test ciblé passe après la correction du service.
- La suite Jest et `npm run build` passent.

## Indices progressifs

<details><summary>Indice 1</summary>
Suivez la valeur du titre depuis `createTicket` jusqu’à l’appel `postTicket`.
</details>

<details><summary>Indice 2</summary>
Le spy Jest est installé sur `httpClient.post`. `toHaveBeenCalledWith` permet d’examiner ses arguments.
</details>

<details><summary>Indice 3</summary>
Le chemin est le premier argument; l’objet métier est le second. Comparez sa clé de titre avec le contrat avant de modifier le service.
</details>

## Bonus

Simulez un POST rejeté et observez le comportement, ou examinez l’alias conservé dans le ticket stocké. Expliquez une chose que le spy ne vérifie pas.
