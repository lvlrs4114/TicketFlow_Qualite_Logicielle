# TP2 — Couverture et mutation

## Partitions supplémentaires choisies avant les tests

Pour un total de 0 € sans abonnement premium, les frais sont de 9,90 €,
conformément à la règle des montants inférieurs à 100 €.
Pour un argument absent, nous ajoutons l'hypothèse suivante : il représente une
commande non premium de total 0 €, donc des frais de 9,90 €. Cette politique
est un choix explicite, pas une exigence de la fiche.

L'absence de mutation du tri est déjà vérifiée dans `tests/title.test.js` (TP1).

## Expériences réalisées

- Avant correction : 30 tests réussis, 2 échecs (100 € et premium à 20 €).
- Suite provisoire limitée à 99 € et 101 € : les deux tests passent sur le code
  erroné. Ils exécutent les deux issues du seuil existant, sans vérifier sa
  frontière ni la règle premium. La couverture du module reste à 19,04 % des
  lignes et 16 % des branches : cette petite suite ne couvre pas tout le module.
- Tests pertinents restaurés, puis correction : 32 tests réussis ; couverture
  de `ticket-utils.js` : 100 % des lignes, 84 % des branches. Les branches non
  exécutées concernent notamment les valeurs de repli des autres fonctions.
- Mutation manuelle `>= 100` vers `> 100` : seul le test « facture 100 € de
  commande non premium à 0 € de livraison » échoue ; les 5 autres tests de
  livraison passent. La mutation a ensuite été annulée.

## Ce que mesure la couverture

La couverture indique les lignes et les branches exécutées par les tests.
Elle permet de repérer des chemins encore inexplorés.
Même une couverture élevée ne vérifie pas la justesse des valeurs attendues.
Les frontières et les partitions doivent venir de la spécification.
Le test à 100 € tue la mutation du seuil : il protège la règle métier précise.
