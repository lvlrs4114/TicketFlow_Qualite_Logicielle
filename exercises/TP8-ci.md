# TP8 — Analyser des échecs de CI (20–25 min)

## Objectif

Un échec de CI est un symptôme, pas toujours une explication. À partir de deux journaux, vous allez produire un diagnostic argumenté et décider quelle vérification faire ensuite.

## Mission essentielle

1. Pour chaque journal, séparez les faits observés de ce qu’ils ne permettent pas encore de conclure.
2. Formulez une hypothèse principale et citez la preuve qui la soutient.
3. Décidez de la prochaine action utile : quelle vérification lancer ou quelle information demander avant de corriger ?
4. Indiquez si l’incident relève du produit, du test ou de l’environnement, et qui devrait le prendre en charge.

## Point de départ

Les journaux sont des rapports d’incident fictifs. Il n’y a pas de backend strict à lancer et aucune modification de l’action GitHub n’est demandée. Le workflow actif peut être consulté pour comprendre quelles étapes composent le job E2E.

| Incident | Faits observés (preuve) | Ce qu’on peut conclure | Ce qui reste à vérifier | Prochaine action / responsable |
|---|---|---|---|---|
| `contract.log` |  |  |  |  |
| `flaky.log` |  |  |  |  |

## Critères de réussite

- Chaque hypothèse est reliée à un fait du journal.
- Vous distinguez clairement observation et conclusion.
- Chaque incident a une prochaine étape réaliste, sans prétendre corriger ce qui n’est pas reproductible avec les ressources fournies.

## Indices progressifs

<details><summary>Indice 1</summary>
Un journal permet d’affirmer ce qui s’est passé lors de cet essai. Il ne prouve pas toujours la cause racine.
</details>

<details><summary>Indice 2</summary>
Pour proposer la prochaine action, demandez-vous quelle observation pourrait confirmer ou écarter votre hypothèse.
</details>

## Bonus

Proposez un artefact de diagnostic utile à conserver lorsqu’un test Cypress échoue, et expliquez quelle question il aiderait à trancher.
