## Modifications apportées entre vendredi et dimanche soir

Depuis vendredi, on a apporté plusieurs améliorations au projet de jeu labyrinthe.

La première modification concerne l'interface d'accueil. On a ajouté un menu déroulant qui permet au joueur de choisir son niveau de difficulté (niveau 1, 2 ou 3) avant de commencer la partie. Le niveau sélectionné est ensuite chargé depuis l'API quand le jeu démarre.

Ensuite, On a complètement réorganisé la structure du code pour le rendre plus clair et maintenable. On a créé trois nouveaux dossiers : un dossier "constants" qui regroupe toutes les constantes du jeu (ennemis, armes, types de tuiles), un dossier "utils" qui contient les fonctions utilitaires (gestion de l'API, système de combat, règles du jeu, calculs de score), et On a séparé les composants en deux catégories : les pages principales et les composants de jeu.

Enfin, On a refactorisé tout le code. Avant, la logique métier était mélangée avec l'affichage dans les composants, ce qui rendait le code difficile à comprendre. Maintenant, toute la logique est extraite dans des fonctions réutilisables, les constantes sont centralisées, et chaque fichier a une responsabilité claire. Le code est beaucoup plus simple et facile à maintenir.
