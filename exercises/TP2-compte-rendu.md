# TP2 — Expérience sur la couverture

`shippingCost` est maintenant isolée dans `src/shipping.js`, sans dépendance
avec le DOM. Toutes les mesures ci-dessous portent uniquement sur ce module,
avec la commande fournie dans la fiche.

| Expérience                         | Résultat            | Lignes | Branches |
| ---------------------------------- | ------------------- | ------ | -------- |
| Trois tests faibles sur le starter | 3 réussis           | 100 %  | 83,33 %  |
| Tests pertinents sur le starter    | 2 échecs, 4 réussis | 100 %  | 100 %    |
| Même suite après correction        | 6 réussis           | 100 %  | 100 %    |
| Mutation >= 100 vers > 100         | 1 échec, 5 réussis  | 100 %  | 100 %    |

La suite faible couvre 99, 101 et le type du résultat premium à 20.
La suite complète vérifie les montants de 99, 100, 101 et premium à 20,
ainsi que deux partitions supplémentaires : 0 et argument absent.
Pour l'argument absent, l'hypothèse choisie avant le test est une commande non
premium de total nul (9,90 € de frais). Ce choix complète la spécification.

Le test à 100 tue la mutation du seuil. Les modifications temporaires ont été
restaurées après chaque expérience ; le module conserve sa version corrigée.

Le rapport mesure l'exécution, sans certifier la qualité des assertions.
Une meilleure assertion peut révéler un défaut sans couvrir davantage de lignes.
Une frontière utile vaut mieux que multiplier des montants similaires.
Le même score de couverture peut accompagner des tests verts ou rouges.
La mutation prouve la détection d'un défaut précis, pas de tous les défauts.
