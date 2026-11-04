# TP3 — Remplacer une dépendance ou observer un appel

Deux exercices simples sur la même fonction pour distinguer **mock** et **spy**.
Aucun repository, stockage ou scénario de création de ticket n'est nécessaire.

## La fonction à tester

`getOpenTickets(api)`, dans `src/open-tickets.js`, appelle `api.getTickets()`
puis renvoie uniquement les tickets `OPEN`, dans leur ordre initial.
Une erreur API doit être propagée. Cette fonction n'est pas utilisée par
l'interface : elle sert ici à pratiquer les tests de code asynchrone isolément.

L'API est un objet JavaScript possédant une méthode `getTickets`. La passer en
argument permet de choisir simplement la dépendance utilisée pendant le test.
Il n'y a pas de requête réseau à intercepter ni de serveur à lancer.

## Exercice 1 — Choisir la réponse avec un mock

**Fichier à créer :** `tests/open-tickets.test.js`.

Importer `getOpenTickets` depuis `../src/open-tickets.js`. Préparer une API
dont la méthode est remplacée par `jest.fn()` :

```js
const api = {
  getTickets: jest.fn().mockResolvedValue([
    { id: "a", status: "OPEN" },
    { id: "b", status: "CLOSED" },
    { id: "c", status: "OPEN" },
  ]),
};
```

1. Appeler `await getOpenTickets(api)` et vérifier le résultat exact : les
   tickets `a` puis `c`, sans le ticket fermé. Vérifier aussi que `getTickets`
   a été appelée une seule fois.
2. Écrire un deuxième test avec `mockResolvedValue([])` : le résultat doit
   être une liste vide.
3. Écrire un troisième test avec
   `mockRejectedValue(new Error('Service indisponible'))` et vérifier le rejet
   avec `await expect(getOpenTickets(api)).rejects.toThrow('Service indisponible')`.

Ici, le mock **remplace le comportement** de la dépendance : le test décide
quelle réponse ou quelle erreur elle produit. Ne pas mocker `getOpenTickets`,
qui est justement la fonction à tester. Attendre chaque promesse.

## Exercice 2 — Observer une méthode avec un spy

**Fichier à créer :** `tests/open-tickets-spy.test.js`.

Cette fois, utiliser cette petite API locale dont la méthode est déjà écrite :

```js
const api = {
  async getTickets() {
    return [
      { id: "a", status: "OPEN" },
      { id: "b", status: "CLOSED" },
      { id: "c", status: "OPEN" },
    ];
  },
};
```

1. Observer la méthode avec `const spy = jest.spyOn(api, 'getTickets')`.
2. Appeler `await getOpenTickets(api)`.
3. Vérifier que `spy` a été appelée une fois et que le résultat contient
   exactement les tickets `a` puis `c`.
4. Ajouter `afterEach(() => jest.restoreAllMocks())` pour restaurer la méthode
   après chaque test.

Ne pas utiliser `mockResolvedValue`, `mockRejectedValue` ou `mockImplementation`
dans cet exercice : la méthode fournie doit réellement s'exécuter. Un spy
observe l'appel et, par défaut, conserve le comportement de la méthode.
Le résultat filtré permet de vérifier que l'on n'a pas seulement compté un appel.

## Comparer les deux approches

Lancer `npm test -- --runInBand`. Les deux exercices doivent passer sans
modifier les règles de filtrage, déjà présentes dans le code.

- Dans quel exercice le test choisit-il une réponse de remplacement ?
- Dans lequel la méthode fournie continue-t-elle à s'exécuter ?
- Pourquoi ne suffit-il pas de vérifier uniquement le nombre d'appels ?

Le mock permet de provoquer facilement une panne. Le spy permet d'observer
une méthode existante sans remplacer son comportement. `jest.spyOn` peut aussi
être configuré pour remplacer ce comportement, mais ce n'est pas l'objectif ici.
Ni l'un ni l'autre ne prouve le fonctionnement d'un vrai service distant.
