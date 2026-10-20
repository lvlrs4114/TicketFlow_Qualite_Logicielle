# TP1 — Compte rendu

## Rouge puis vert

Avant les corrections, `npm test -- --runInBand` donne 8 tests en échec et
18 tests réussis. Les échecs révèlent le seuil de priorité 8 incorrect, la
recherche sensible à la casse, le comptage des statuts non fermés comme fermés,
l'acceptation d'un titre blanc et la mutation du tableau lors du tri.

Le test du starter « sévérité critique => HIGH » passe avec une sévérité de 10,
mais ne démontre pas que HIGH commence à 8 : les conditions `> 8` et `>= 8`
satisfont toutes deux ce test. Le test « stats total » vérifie seulement le
total, sans vérifier le nombre de tickets fermés.

Les corrections appliquent HIGH dès 8, normalisent la casse et les espaces
extérieurs de la recherche, comptent uniquement CLOSED comme fermé et refusent
un titre blanc avant la sauvegarde ou les appels API. Le tri utilise l'ordre
français sans modifier le tableau initial, ce qui permet de retrouver l'ordre
de création.

## Tests

- `tests/priority.test.js` : partitions et frontières 0, 3, 4, 7, 8 et 10.
- `tests/search-stats.test.js` : recherche, liste vide, OPEN/CLOSED/PENDING et
  statut inconnu.
- `tests/title.test.js` : normalisation, ordre français, absence de mutation et
  mode création.
- `tests/ticket-service.test.js` : refus sans effet de bord et création valide
  avec repository et API injectés.

## Intérêt d'un E2E pour le tri

Un E2E dédié à ce tri secondaire apporte peu par rapport aux tests unitaires
qui vérifient précisément l'ordre et l'absence de mutation. Son coût de mise en
place et de maintenance est supérieur. Un scénario navigateur devient utile
si l'on veut vérifier le branchement du sélecteur de tri à l'affichage.
