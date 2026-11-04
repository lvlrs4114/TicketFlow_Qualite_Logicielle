# TP7 — Répartir un budget fictif de tests (25–30 min)

**Contexte**

Votre équipe dispose d’un budget pédagogique fictif de **8 tests** pour six fonctionnalités. Le budget sert à discuter des risques; il ne correspond pas à une limite réelle du projet. Il s’agit de choisir les tests, pas de les programmer.

**Votre mission**

1. À partir de la matrice, répartissez exactement 8 tests entre création, priorité HIGH, fermeture/persistance, recherche, tri A–Z et couleur du badge.
2. Pour chaque fonctionnalité, choisissez une quantité et un ou plusieurs niveaux : unitaire, intégration ou E2E. Vous pouvez lui attribuer zéro test.
3. Laissez au moins une fonctionnalité sans test.
4. Justifiez deux décisions, dont le renoncement à cette fonctionnalité.

Les niveaux d’impact et de probabilité sont des hypothèses fournies (1 faible, 3 élevé).

| Fonctionnalité | Impact | Probabilité | Niveaux choisis | Nombre de tests |
|---|---:|---:|---|---:|
| Création ticket | 3 | 3 | TODO | TODO |
| Priorité HIGH | 3 | 2 | TODO | TODO |
| Fermeture et persistance | 3 | 2 | TODO | TODO |
| Recherche | 2 | 3 | TODO | TODO |
| Tri A–Z | 1 | 2 | TODO | TODO |
| Couleur du badge | 1 | 2 | TODO | TODO |
| **Total** |  |  |  | **8** |

**Fichiers utiles**

`src/ticket-service.js`, `src/ticket-utils.js`, `src/app.js`, `index.html` et les exemples dans `tests/`.

**Commande**

```bash
npm test -- --runInBand
```

**Critère de réussite**

La proposition totalise 8 tests, répartit niveaux et quantités sur les six lignes, et justifie deux choix dont une fonctionnalité entièrement laissée sans test.

**Bonus (facultatif)**

Si le tri devient très fréquent, réallouez des tests sans dépasser le budget et expliquez le compromis.
