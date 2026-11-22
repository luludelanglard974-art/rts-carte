---
name: securite
description: Audit de sécurité complet du projet (dépendances, injections, secrets, en-têtes HTTP, permissions, tests de l'extérieur). À lancer avant chaque mise en ligne d'un outil qui touche des données, et une fois par mois. Rapport en tableau faille / criticité / fichier et ligne / correctif.
---

# Sécurité

Source : BYS Academy (Jean-Baptiste Roy), skills-bys-*.md, récupéré le 20/11/2026.
Quand : avant chaque mise en ligne d'un outil qui touche des données, et une fois par mois sur le serveur : « Fais l'audit de sécurité complet du projet ».

## Étapes
1. Scanne les dépendances (npm audit ou équivalent) et liste les failles connues.
2. Analyse le code pour les injections (SQL, commandes, HTML non échappé), les contrôles d'accès manquants, les redirections non vérifiées.
3. Vérifie les secrets : rien dans le code, les pages HTML, les journaux ni l'historique git ; tout dans un .env en chmod 600.
4. Vérifie les en-têtes HTTP (CSP, nosniff, frame-ancestors, HSTS), la limitation de débit sur les connexions et les formulaires, la taille maximale des corps de requête.
5. Vérifie les permissions : chaque route refuse par défaut, chaque clé a le périmètre minimum, les bots ne répondent qu'aux identifiants autorisés.
6. Teste de l'extérieur chaque chemin censé être fermé, y compris les variantes (majuscules, double barre, sans barre finale).
7. Rédige le rapport classé par criticité, puis corrige le critique d'abord, avec une sauvegarde datée avant chaque modification.

## Règles
- Corriger les failles critiques avant tout le reste.
- Jamais de secret en clair dans le code ni dans un commentaire.
- HTTPS partout, cookies HttpOnly, Secure et SameSite.
- Principe du moindre privilège sur chaque accès et chaque clé.
- Aucun try/catch vide : échouer fermé.
- Ne jamais laisser dans le code un commentaire qui décrit une faille.

## Format de sortie
Un tableau : faille, criticité (critique, haute, moyenne, basse), fichier et ligne, correctif proposé. Puis la liste des corrections appliquées et les tests de l'extérieur avec leur résultat.


## Dans nos repos (ajout Ludovic)
- Le rapport est livré AVANT toute correction. Rien n'est corrigé sans l'accord de Ludovic.
- Exception : un secret exposé en clair est signalé en tout premier, en tête du rapport (sans jamais recopier sa valeur).
- Règles permanentes : section « Sécurité » du CLAUDE.md (10 règles BYS).
