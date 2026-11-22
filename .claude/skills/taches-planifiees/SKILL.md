---
name: taches-planifiees
description: Créer ou modifier une tâche qui tourne seule (cron Vercel, GitHub Actions schedule, déclencheur Apps Script, routine planifiée) : délai maximum, journal, idempotence, alerte en cas d'échec, option --dry-run.
---

# Tâches planifiées (cron et Trigger.dev)

Source : BYS Academy (Jean-Baptiste Roy), skills-bys-*.md, récupéré le 20/11/2026.
Quand : pour tout ce qui doit tourner sans toi : rapports, nettoyage, synchronisation, relances.

## Étapes
1. Identifie la tâche, son déclencheur (heure, fréquence) et son résultat attendu.
2. Choisis l'outil : cron sur le serveur pour un script simple, Trigger.dev ou équivalent pour une file de tâches lourdes avec relances intégrées.
3. Écris le traitement avec : un délai maximum, un journal du début et de la fin de chaque exécution, un fichier ou une table d'état pour l'idempotence, une alerte en cas d'échec.
4. Ajoute une option --dry-run qui montre ce qui serait fait sans rien faire.
5. Teste en local, puis sur le serveur avec le dry-run, puis en réel.
6. Note la tâche, son heure et son journal dans le CLAUDE.md.

## Règles
- Toujours un délai maximum.
- Journaliser le début, la fin et le résultat de chaque exécution.
- Idempotence obligatoire.
- Alerter en cas d'échec, jamais d'échec silencieux.
- Les heures de cron sur un serveur sont souvent en UTC.
- Les secrets viennent du .env, jamais du script.

