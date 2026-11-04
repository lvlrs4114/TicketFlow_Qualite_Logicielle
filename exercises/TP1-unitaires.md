# TP1 — Premier filet de sécurité Jest

**Incident.** Les tickets de sévérité 8 ne sont pas classés comme urgents. Les cinq tests livrés passent pourtant.

Les exercices 1 à 3 constituent la mission essentielle. Les exercices 4 et 5 sont optionnels : tri et interaction avec le DOM.

## Méthode commune

Pour les exercices 1 à 4, écrire des tests nommés par comportement et structurés en arrange/act/assert. Lancer `npm test -- --runInBand`, observer les échecs, puis corriger uniquement la fonction concernée dans `src/ticket-utils.js`. Relancer les tests pour vérifier le passage au vert.

## Exercice 1 — Classer les priorités

**Fonction :** `calculatePriority` · **Fichier à créer :** `tests/priority.test.js`.

**Règle :** 0–3 → `LOW` ; 4–7 → `MEDIUM` ; 8–10 → `HIGH`.

1. Écrire un cas pour chacune des sévérités 3, 4, 7, 8 et 10. Utiliser `test.each` si souhaité.
2. Avant de corriger, identifier le test du starter qui passe sans démontrer que HIGH commence à 8. Expliquer pourquoi il laisse passer le défaut.
3. Corriger le calcul de priorité après avoir observé le test rouge au seuil 8.

## Exercice 2 — Rechercher un ticket

**Fonction :** `filterTickets` · **Fichier à créer :** `tests/search-stats.test.js`.

**Règle :** la recherche ignore la casse et les espaces extérieurs ; une recherche vide renvoie tous les tickets.

1. Préparer une liste contenant « VPN inaccessible » et un autre titre sans rapport.
2. Vérifier que la requête `vpn` retrouve uniquement « VPN inaccessible ».
3. Vérifier qu'une requête vide renvoie toute la liste.
4. Corriger la recherche après avoir constaté l'échec.

## Exercice 3 — Calculer les statistiques

**Fonction :** `calculateStats` · **Fichier à compléter :** `tests/search-stats.test.js`, dans un bloc `describe` distinct de la recherche.

**Règle :** seul `OPEN` compte comme ouvert et seul `CLOSED` compte comme fermé. Un autre statut compte dans le total.

1. Préparer une liste avec un ticket `OPEN`, un `CLOSED` et un `PENDING`.
2. Vérifier l'objet complet attendu : `{ total: 3, open: 1, closed: 1 }`.
3. Corriger le calcul après avoir constaté l'échec. Expliquer pourquoi vérifier seulement le total ne suffit pas.

## Exercice 4 — Trier les titres (optionnel)

**Fonction :** `sortTicketsByTitle` · **Fichier à créer :** `tests/sort.test.js`.

**Règle :** le mode `title` trie en ordre français A–Z sans modifier le tableau initial ; le mode `creation` conserve l'ordre de création.

1. Préparer les titres `['zèbre', 'Alpha', 'école']` et vérifier l'ordre obtenu : `['Alpha', 'école', 'zèbre']`.
2. Vérifier que le tableau initial n'a pas changé.
3. Vérifier que le mode `creation` conserve l'ordre initial, même après un tri par titre.
4. Corriger au besoin. Discuter : ce tri justifie-t-il un E2E à lui seul ?

## Exercice 5 — Créer un ticket dans le DOM (optionnel)

**Fichier dédié :** `tests/ticket-ui.test.js`.

**Objectif :** saisir un titre, cliquer sur « Créer le ticket » et vérifier
que le ticket apparaît dans la page. Aucun navigateur ni serveur à lancer :
Jest utilise déjà jsdom. Les dépendances Testing Library sont incluses dans
le projet (`npm ci` pour mettre à jour l'installation).

Le fichier fourni contient la préparation : charger le vrai `index.html`,
initialiser `src/app.js` et vider le stockage entre les tests. Garder cette
préparation telle quelle ; se concentrer sur le corps du test.

1. Créer un utilisateur avec `const user = userEvent.setup()`.
2. Trouver le champ avec `screen.getByRole('textbox', { name: 'Titre' })`
   et saisir « VPN inaccessible » avec `await user.type(...)`.
3. Trouver le bouton « Créer le ticket » avec `screen.getByRole('button', ...)`
   et cliquer avec `await user.click(...)`.
4. Vérifier `expect(await screen.findByText('VPN inaccessible')).toBeVisible()`.

Lancer uniquement ce fichier :

```bash
npm test -- --runInBand --runTestsByPath tests/ticket-ui.test.js
```

`getByRole` trouve un élément par son rôle et son nom accessible ; `findByText`
attend que le résultat asynchrone apparaisse, sans attente fixe à ajouter.
Ce scénario traverse le formulaire, le service et le stockage local : c'est
un petit test d'intégration du DOM, complémentaire aux unitaires précédents.
Il n'utilise ni React ni `render(<TicketBoard />)`.

Référence : [exemple DOM Testing Library](https://testing-library.com/docs/dom-testing-library/example-intro/).
