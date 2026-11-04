# TP8 — Diagnostiquer la CI (20–25 min)

**Contexte**

Deux journaux décrivent des incidents différents. Comparez-les, puis examinez un workflow E2E qui peut démarrer Cypress avant que l’application soit prête. Le workflow actif sert de référence et ne doit pas être modifié.

**Votre mission**

1. Lisez `contract.log` et `flaky.log`; remplissez pour chacun le diagnostic ci-dessous.
2. Lisez `.github/workflows/tests.yml` et suivez l’ordre des étapes du job E2E.
3. Comparez-le à `broken-workflow.yml` et complétez l’exemple incomplet.
4. Vérifiez que l’exemple attend l’application avant de lancer Cypress; laissez le workflow actif intact.

| Incident | Attendu | Observé | Hypothèse et preuve | Correction proposée |
|---|---|---|---|---|
| `contract.log` | TODO | TODO | TODO | TODO |
| `flaky.log` | TODO | TODO | TODO | TODO |

**Fichiers utiles**

- `exercises/ci/contract.log`, `exercises/ci/flaky.log`
- `exercises/ci/broken-workflow.yml`
- `.github/workflows/tests.yml`
- `package.json`

**Commande**

```bash
npm ci
npm test -- --runInBand
npm run build
```

Pour essayer Cypress : terminal 1 `npm run dev &`, puis terminal 2 `npm run e2e`.

**Critère de réussite**

Les journaux sont distingués dans le diagnostic; l’exemple cassé attend que l’application réponde avant Cypress, et le workflow actif n’a pas changé.

**Bonus (facultatif)**

Lancez toute la suite Cypress et proposez un artefact de diagnostic utile en cas d’échec.
