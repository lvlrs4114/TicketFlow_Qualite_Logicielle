# TP3 — Remplacer ou observer

Le TP contient désormais deux exercices indépendants, sur la même fonction
`getOpenTickets` extraite dans `src/open-tickets.js`. Elle n'est pas utilisée
par le DOM. L'API est passée en argument ; aucune modification du service de
création ni aucun repository mocké ne sont nécessaires.

## Exercice 1 — Mock

`tests/open-tickets.test.js` remplace `api.getTickets` avec `jest.fn` : succès
avec ordre exact, liste vide et panne propagée. Chaque promesse est attendue.
Le test décide des réponses simulées et ne remplace pas la fonction testée.

## Exercice 2 — Spy

`tests/open-tickets-spy.test.js` observe une méthode async locale avec
`jest.spyOn`, sans changer son implémentation. L'assertion vérifie un appel et
les deux tickets ouverts retournés. Les spies sont restaurés après le test.

Les quatre cas passent sans correction du comportement métier. Le comptage
d'appels complète les assertions sur les valeurs, sans les remplacer.
Ni un mock ni un spy sur cet objet local ne prouvent un échange réseau réel.
Les anciens tests avancés de création et notification du TP3 ont été retirés.
