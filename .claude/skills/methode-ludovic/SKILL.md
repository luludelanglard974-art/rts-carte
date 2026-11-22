---
name: methode-ludovic
description: Règles de travail de Ludovic, à appliquer dans tous ses repos : branche dédiée puis merge fast-forward sur main avec le nouveau SHA, SQL Supabase livré à part (10 lignes max), pièges Supabase / VPS / Vercel / Stripe déjà vécus. À suivre pour toute modification de code, toute migration, tout déploiement et tout livrable donné à Ludovic.
---

# Méthode Ludovic

Ludovic ne code pas : il pilote, Claude Code exécute. Il travaille souvent sur mobile, à la voix.
Réponses en français, courtes et scannables. Une seule question à la fois.

## Git et déploiement
1. Toujours travailler sur une branche dédiée (`claude/<sujet>`), jamais directement sur main.
2. Une fois validé : merge en fast-forward sur main (pas de commit de merge, pas de force-push).
3. Toujours donner le NOUVEAU SHA (court) après chaque commit ou merge. Ne jamais répondre « c'est déjà fait » sans le prouver par un SHA.
4. Après un push sur main : vérifier que le déploiement Vercel est READY avant d'annoncer que c'est en ligne.
5. Diagnostiquer avant de corriger : confirmer la cause avant de produire un correctif.

## SQL Supabase
1. Le SQL que Ludovic exécute lui-même est livré SEUL, dans son propre bloc, 10 lignes maximum (au-delà, le copier-coller mobile arrive vide).
2. Toujours commencer par la requête sûre, puis adapter au vrai schéma :
   `select table_name from information_schema.tables where table_schema='public' order by 1;`
   Jamais d'empilement de requêtes hypothétiques.
3. Après une migration : vérifier les GRANT (sinon RLS = « permission denied »).
4. Après un ajout de colonne : `notify pgrst, 'reload schema';`
5. Vérifier dans `information_schema.columns` qu'une colonne existe vraiment, même si la migration dit « success ».
6. Noms de policies : pas d'accents, pas de « : » (ASCII simple, snake_case).
7. Pas d'embed PostgREST avec des RLS imbriquées : faire deux requêtes séparées.
8. Rappeler de désactiver la traduction automatique du navigateur avant de coller du SQL (elle traduit le SQL en silence).

## VPS (console navigateur)
1. Heredocs interdits (`cat > fichier <<'EOF'` crée un fichier VIDE sans erreur).
   Utiliser `printf '%s\n' ... > fichier`, ou du base64 (obligatoire dès qu'il y a des apostrophes françaises).
2. Après toute création de fichier : vérifier avec `wc -c`.

## Vercel
1. Après tout changement de variable d'environnement : REDÉPLOYER (la variable n'est prise qu'au build suivant).
2. Ne jamais afficher la valeur d'un secret (commit, journal, réponse).

## Stripe
1. Le webhook Stripe ne pointe JAMAIS sur une URL `.vercel.app` (protégée par le login Vercel : tout échoue en silence). Toujours le domaine personnalisé.
2. Le webhook est le seul point de déblocage d'un paiement ou d'un abonnement.
3. STRIPE_SECRET_KEY : copiée avec le bouton de Stripe, jamais à la main, puis redéploiement.

## Livrables pour Ludovic
- Prompt destiné à Claude Code : UN seul bloc de code copiable, commençant par « STOP. Ne réponds PAS c'est déjà fait », avec demande d'un nouveau SHA.
- Test de connexion : toujours redonner URL + email + mot de passe de test.
- Jamais de proposition d'arrêter ou de faire une pause.
