# TP1 — Compte rendu

## Rouge puis vert

Les tests mettent en évidence le seuil de priorité 8 incorrect, la recherche
sensible à la casse, le comptage des statuts non fermés comme fermés et la
mutation du tableau lors du tri.

Le test du starter « sévérité critique => HIGH » passe avec une sévérité de 10,
mais ne démontre pas que HIGH commence à 8 : les conditions `> 8` et `>= 8`
satisfont toutes deux ce test. Le test « stats total » vérifie seulement le
total, sans vérifier le nombre de tickets fermés.

Les corrections appliquent HIGH dès 8, normalisent la casse et les espaces
extérieurs de la recherche, comptent uniquement CLOSED comme fermé. Le tri utilise l'ordre
français sans modifier le tableau initial, ce qui permet de retrouver l'ordre
de création.

## Tests

- `tests/priority.test.js` : partitions et frontières 0, 3, 4, 7, 8 et 10.
- `tests/search-stats.test.js` : recherche, liste vide, OPEN/CLOSED/PENDING et
  statut inconnu.
- `tests/title.test.js` : ordre français, absence de mutation et mode création.

## Intérêt d'un E2E pour le tri

Un E2E dédié à ce tri secondaire apporte peu par rapport aux tests unitaires
qui vérifient précisément l'ordre et l'absence de mutation. Son coût de mise en
place et de maintenance est supérieur. Un scénario navigateur devient utile
si l'on veut vérifier le branchement du sélecteur de tri à l'affichage.

## Option DOM

`tests/ticket-ui.test.js` ajoute un seul scénario optionnel : saisir un titre,
créer le ticket et vérifier son affichage avec Testing Library. La préparation
utilise le vrai HTML et app.js sous jsdom, sans React ni mock. Le stockage et
les modules sont réinitialisés avant le test pour isoler le scénario.
