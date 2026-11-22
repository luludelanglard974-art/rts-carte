---
name: self-healing
description: Après chaque génération de code ou de fichier : tester réellement, trouver la cause racine, corriger seul ; au bout de trois échecs sur le même problème, s'arrêter et demander à Ludovic.
---

# Self-Healing (auto-correction)

Source : BYS Academy (Jean-Baptiste Roy), skills-bys-*.md, récupéré le 20/11/2026.
Quand : à activer en permanence dans le CLAUDE.md : « Après chaque génération, teste et corrige seul ; au bout de trois échecs, demande-moi ».

## Étapes
1. Après chaque génération, exécute un test réel (lancer le script, appeler la route, ouvrir le fichier produit). Pas un test mental : un test réel.
2. Si une erreur apparaît, lis-la en entier et cherche la cause racine, pas le symptôme.
3. Compare avec les erreurs déjà rencontrées dans les process du projet.
4. Applique la correction, relance le test, vérifie qu'aucune régression n'apparaît ailleurs.
5. Documente l'erreur et sa solution dans le process concerné pour qu'elle ne revienne pas.
6. Au bout de trois échecs sur le même problème, arrête-toi et explique ce que tu as essayé et où tu bloques.

## Règles
- Toujours expliquer ce qui a été corrigé et pourquoi.
- Ne jamais masquer une erreur : pas de try/catch vide, pas de message d'erreur avalé.
- Trois échecs, puis on demande à l'humain.
- Tenir un journal des erreurs récurrentes pour améliorer les process.
- Une correction ne remplace jamais une sauvegarde : copie datée avant de toucher un fichier important.

## Format de sortie
Pour chaque erreur : le symptôme, la cause trouvée, la correction appliquée, le test qui prouve que c'est réglé, et la ligne ajoutée au process.

