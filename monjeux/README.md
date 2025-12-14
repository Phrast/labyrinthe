## Modifications apportées entre vendredi et dimanche soir

Depuis vendredi, on a apporté plusieurs améliorations au projet de jeu labyrinthe.

La première modification concerne l'interface d'accueil. On a ajouté un menu déroulant qui permet au joueur de choisir son niveau de difficulté (niveau 1, 2 ou 3) avant de commencer la partie. Le niveau sélectionné est ensuite chargé depuis l'API quand le jeu démarre.

Ensuite, On a complètement réorganisé la structure du code pour le rendre plus clair et maintenable. On a créé trois nouveaux dossiers : un dossier "constants" qui regroupe toutes les constantes du jeu (ennemis, armes, types de tuiles), un dossier "utils" qui contient les fonctions utilitaires (gestion de l'API, système de combat, règles du jeu, calculs de score), et On a séparé les composants en deux catégories : les pages principales et les composants de jeu.

Enfin, On a refactorisé tout le code. Avant, la logique métier était mélangée avec l'affichage dans les composants, ce qui rendait le code difficile à comprendre. Maintenant, toute la logique est extraite dans des fonctions réutilisables, les constantes sont centralisées, et chaque fichier a une responsabilité claire. Le code est beaucoup plus simple et facile à maintenir.

---

## Fonctionnalités du Projet

### Niveau 10/20 - MVP complet
- ✅ Page d'accueil avec nom du jeu et texte de contexte
- ✅ Champ de saisie de pseudo
- ✅ Bouton "Jouer"
- ✅ Affichage de la grille (niveau chargé depuis l'API)
- ✅ Tuiles cliquables qui se révèlent
- ✅ Position du joueur affichée
- ✅ Révélation uniquement des tuiles adjacentes
- ✅ Case start révélée au lancement
- ✅ Page de fin avec résultat (Victoire/Défaite)
- ✅ Affichage du score (tuiles révélées, temps)
- ✅ Enregistrement du pseudo + score
- ✅ Affichage des highscores
- ✅ Appel API pour récupérer un niveau
- ✅ Gestion de l'état de chargement et des erreurs
- ✅ Routing entre les pages

### Niveau 13/20 - Jeu RPG complet
- ✅ Combats avec système d'armes
- ✅ Inventaire pour les clés
- ✅ Inventaire pour les armes/items
- ✅ Portes avec système de clés colorées
- ✅ Pièges avec perte de HP
- ✅ Utilisation de l'API pour la grille et les ennemis
- ✅ Découpage en composants (BattleModal, Inventory, etc.)
- ✅ Gestion de l'état avec hooks React

### Niveau 16/20 - Version solide et structurée
- ✅ Plusieurs types d'ennemis avec stats différentes (Gobelin, Slime, Orc)
- ✅ Dégâts différents selon l'arme (Pioche, Seau, Bottes)
- ✅ Plusieurs types d'obstacles (pièges feu/eau/roche)
- ✅ HP persistant dans le niveau
- ✅ Conditions de victoire/défaite définies
- ✅ Choix de niveau (1, 2 ou 3)
- ✅ Architecture claire avec logique isolée
- ✅ Code bien organisé (constants/, utils/, components/)
- ✅ Interface lisible avec HP et inventaire
- ✅ Messages clairs pour les actions

### Niveau 18/20 - Projet abouti
- ✅ Plusieurs niveaux distincts (sélection de 1 à 3)
- ✅ Système de score travaillé (temps + tuiles)
- ❌ Progression automatique entre niveaux
- ❌ Page de règles/tutoriel dédiée
- ❌ Historique des scores (localStorage)
- ❌ Animations (flip des tuiles, transitions)
