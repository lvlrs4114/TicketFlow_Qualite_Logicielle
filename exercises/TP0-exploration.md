# TP0 — Enquête sans lire le code

**Incident.** L'équipe support dit que « l'application marche », mais les personnes qui traitent les tickets remontent des comportements surprenants.

## Mission essentielle

Lancer l'application et préparer au moins **trois rapports d'anomalie**. Pour chacun : étapes exactes, données saisies, résultat observé, résultat attendu et conséquence pour le support. Créer notamment un ticket de sévérité « Élevée », essayer un titre composé d'espaces et rechercher un ticket avec une autre casse.

Ne lire ni `src/` ni `tests/` à ce stade. Le titre affiché dans le navigateur ne prouve pas que le payload transmis à un futur backend est correct.

## Investigation

Classer les anomalies par impact et probabilité. Quel comportement peut produire une donnée durablement invalide ? Lequel perturbe surtout le confort d'utilisation ? Expliquer comment vous transformeriez deux rapports en tests automatisés, avec un oracle explicite.

## Défi

Créer trois tickets avec des titres de casses différentes, choisir « Titre A–Z », revenir à l'ordre de création. Est-ce que l'ordre d'origine revient ? Écrire un quatrième rapport si nécessaire.

**Livrable :** tableau de trois ou quatre rapports, avec un ordre de traitement argumenté. Aucun correctif de code exigé ici.
