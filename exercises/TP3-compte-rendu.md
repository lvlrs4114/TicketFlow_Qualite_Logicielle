# TP3 — Doubles et services asynchrones

Les sept nouveaux cas couvrent le filtrage exact des tickets ouverts dans
l'ordre, la liste vide, la propagation d'une panne API, les sévérités 10 et 3,
le rejet du POST et une panne de notification. Chaque promesse est attendue.
La suite complète passe : 39 tests. Aucun correctif métier n'est nécessaire
pour ces règles sur la base du TP2 ; le second commit documente la validation.

## Politique de panne retenue

Une panne de notification est propagée à l'appelant ; le ticket déjà sauvegardé
reste localement et le POST a déjà été effectué. C'est un choix explicite,
compatible avec le comportement existant. Un rejet du POST laisse lui aussi le
ticket local, mais empêche la notification. Il n'existe pas de transaction ni
de garantie de retour arrière dans la séquence save → post → notify.

## Valeurs et détails d'implémentation

Un test qui vérifie uniquement `save` appelé accepte aussi un ticket erroné.
Les tests ajoutés vérifient le titre, la priorité, le statut et les données
retournées et conservées. Un changement de mécanisme de persistance préservant
le résultat peut casser un spy sur `save` : cette assertion impose une méthode
précise. Les assertions métier portent donc surtout sur les valeurs.
La notification est comparée aux champs métier du ticket, sans imposer les
alias internes que le TP4 doit examiner.

## Limites

Ces doubles prouvent le comportement du service pour les réponses simulées.
Ils ne prouvent ni la persistance réelle, ni le contrat HTTP, ni la réception
d'une notification par un service distant. Aucune méthode espionnée avec
`jest.spyOn` n'est utilisée ici, donc aucun spy global n'est à restaurer.
