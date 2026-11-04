# TP2 — Une bonne couverture suffit-elle à faire de bons tests ?

Ce TP est **un seul exercice**, mené en plusieurs étapes sur `shippingCost`.
L'objectif est de porter un regard critique sur le rapport de couverture :
**exécuter du code ne signifie pas vérifier sa justesse**.

## Le terrain d'expérience

`src/shipping.js` contient une règle métier indépendante de l'interface. Elle
n'est pas utilisée par le DOM : aucun parcours navigateur n'est nécessaire.
Le module est isolé pour que le rapport ne mélange pas la livraison et les
fonctions de tickets travaillées au TP1.

**Spécification :** pour une commande non premium, les frais sont de 9,90 €
en dessous de 100 € et nuls à partir de 100 €. Pour un membre premium,
les frais sont toujours nuls, quel que soit le total.

Créer `tests/shipping.test.js` et importer `shippingCost` depuis
`../src/shipping.js`. Pendant toute l'expérience, mesurer le même périmètre :

```bash
npm run test:coverage -- --runInBand --runTestsByPath tests/shipping.test.js --collectCoverageFrom=src/shipping.js
```

Comparer les résultats de cette commande à chaque étape : nombre de tests
réussis/échoués, lignes couvertes, branches couvertes. Aucun quota n'est demandé.

## Étape 1 — Exécuter beaucoup de code avec des tests insuffisants

Commencer uniquement avec cette petite suite :

```js
import { shippingCost } from "../src/shipping.js";

test("facture la livraison pour 99 € non premium", () => {
  expect(shippingCost({ total: 99, premium: false })).toBe(9.9);
});

test("offre la livraison pour 101 € non premium", () => {
  expect(shippingCost({ total: 101, premium: false })).toBe(0);
});

test("renvoie un nombre pour un membre premium", () => {
  expect(typeof shippingCost({ total: 20, premium: true })).toBe("number");
});
```

Lancer la commande de couverture **sans corriger le code**. Repérer les chemins
exécutés : premium, non premium sous le seuil, non premium au-dessus du seuil.

Avant d'ajouter des tests, répondre à ces questions :

- Quel cas manque pour vérifier précisément « à partir de 100 € » ?
- Le troisième test prouve-t-il que le membre premium ne paie rien ?
- Une ligne exécutée signifie-t-elle que son résultat est correct ?

Le troisième test est volontairement faible : il vérifie le type du résultat,
pas la règle métier. Les deux premiers évitent la frontière. Même si beaucoup
de lignes et de branches sont parcourues, ces tests peuvent laisser passer
les deux défauts annoncés. Ne pas modifier une valeur attendue pour imiter un
résultat erroné du code.

## Étape 2 — Faire parler la spécification

Sans encore modifier `src/shipping.js` :

1. Ajouter le cas non premium à **100 €**, avec des frais attendus de **0 €**.
2. Remplacer l'assertion de type du cas premium à 20 € par le montant attendu : **0 €**.
3. Relancer la même commande et constater les échecs sur le code de départ.

Comparer la couverture à celle de l'étape 1. Les tests peuvent désormais
détecter les défauts sans exécuter beaucoup plus de code : ce sont les
**valeurs choisies** et les **résultats attendus**, tirés de la spécification,
qui les rendent plus utiles.

## Étape 3 — Corriger puis mesurer à nouveau

Corriger uniquement `shippingCost` pour respecter les deux règles de gratuité.
Relancer la même commande : les cas 99, 100, 101 et premium à 20 € doivent passer.

Relever à nouveau lignes et branches. La couverture indique quels chemins ont
été exécutés ; le passage au vert indique que les résultats correspondent aux
attentes des cas écrits. Aucun des deux ne prouve à lui seul l'absence de bugs.

## Étape 4 — Vérifier qu'un test détecte une régression

Dans le code corrigé, remplacer provisoirement `>= 100` par `> 100`.
Avant de lancer les tests, prédire lequel doit échouer, puis vérifier.
Le cas à 100 € doit devenir rouge, même si la couverture reste élevée.
**Restaurer immédiatement `>= 100` et vérifier le retour au vert.**

Cette mutation sert à vérifier la capacité des tests à détecter un défaut
précis. Elle ne constitue pas une preuve que tous les défauts seraient détectés.

## Prendre du recul

Expliquer avec les observations de l'expérience :

- Ce que le rapport de couverture mesure et ce qu'il ne mesure pas.
- Pourquoi le cas à 100 € est plus utile que multiplier des montants au-dessus du seuil.
- Pourquoi une assertion précise peut améliorer un test sans augmenter la couverture.
- Ce que le test devenu rouge lors de la mutation permet d'affirmer.

Pour explorer d'autres partitions, écrire d'abord la politique attendue pour
0 € ou un argument absent. Distinguer la spécification fournie d'une hypothèse
ajoutée. Ne pas ajouter de `/* istanbul ignore next */` pour augmenter le score.
