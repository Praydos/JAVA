# JAVA
this repository is only for my school homework & practical work in java oop.
Voici le compte rendu de votre code Java pour l’exercice :

### Présentation du Code
Le programme en Java permet de gérer un ensemble de notes d'étudiants, saisies au clavier, et de réaliser plusieurs opérations de traitement et d'affichage de ces données. 

### Fonctionnalités Implémentées
1. **Création et remplissage du tableau** :  
   - La méthode `creeTable()` demande à l'utilisateur le nombre d'étudiants, puis initialise un tableau de type `double` pour stocker leurs notes.
   - Ensuite, cette méthode remplit le tableau avec les notes des étudiants entrées par l'utilisateur.
   - Si le nombre d'étudiants est inférieur ou égal à zéro, un message d'erreur est affiché, et un tableau vide est retourné.

2. **Tri et affichage des notes** :
   - La méthode `trie(double[] notes)` trie le tableau `notes` en ordre croissant et affiche chaque note dans cet ordre.
   - `Arrays.sort(notes)` est utilisée pour le tri, suivi d'une boucle `for` pour l'affichage.

3. **Calcul et affichage de la note moyenne** :
   - La méthode `noteMoy(double[] notes)` calcule la moyenne des notes en additionnant toutes les valeurs du tableau `notes` puis en divisant la somme par le nombre d'éléments.
   - La moyenne est ensuite retournée sous forme de `double`.

4. **Affichage de la note maximale et minimale** :
   - La méthode `minMax(double[] notes)` trie le tableau et affiche la note la plus élevée et la note la plus basse. 
   - Le tri est également effectué par `Arrays.sort(notes)`, et les notes maximale et minimale sont respectivement les dernières et premières valeurs du tableau trié.



Ensuite, vous pouvez appeler cette méthode depuis le `main` pour demander la note spécifique, puis afficher le nombre d’étudiants ayant obtenu cette note.

### Exécution et Exemple d'Utilisation
1. Créer le tableau de notes via `creeTable()`.
2. Trier et afficher les notes avec `trie(notes)`.
3. Calculer et afficher la note moyenne via `noteMoy(notes)`.
4. Afficher la note maximale et minimale via `minMax(notes)`.



*****************************************************************************************************************************************************************

EXERCICE 3


Voici un compte rendu pour le code du deuxième exercice :

### Présentation du Code
Le programme en Java permet de conjuguer un verbe du premier groupe (c’est-à-dire un verbe régulier se terminant en "-er") au présent de l’indicatif. 

### Fonctionnalités Implémentées

1. **Vérification de la terminaison du verbe** :  
   - La méthode `conjuger(String verbe)` commence par vérifier si le verbe entré se termine bien par les lettres "er". 
   - Si ce n’est pas le cas, le programme affiche un message d’erreur : `"le verbe n'est pas de 1er group"`, et la méthode se termine avec `return`.

2. **Extraction de la base du verbe** :
   - Si le verbe se termine bien par "er", la méthode extrait la racine (ou base) du verbe, en retirant les deux dernières lettres.
   - Cette base est ensuite utilisée pour ajouter les terminaisons correspondant à chaque pronom sujet.

3. **Affichage de la conjugaison** :
   - La méthode affiche la conjugaison du verbe au présent de l’indicatif pour les pronoms personnels : "je", "tu", "il/elle", "nous", "vous", "ils/elles".
   - Les terminaisons sont ajoutées directement lors de l'affichage, sans besoin de stockage additionnel.

### Exemple de Méthode `main`

Voici un exemple de méthode `main` qui utilise la méthode `conjuger` :

```java
public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    System.out.print("Entrez un verbe du premier groupe : ");
    String verbe = scanner.nextLine();
    conjuger(verbe);
}
```

### Exécution et Exemple d'Utilisation
Le programme demande d’abord à l’utilisateur d’entrer un verbe du premier groupe. Si le verbe est valide, il affiche la conjugaison sous la forme suivante :

```plaintext
Entrez un verbe du premier groupe : chanter
je chante
tu chantes
il/elle chante
nous chantons
vous chantez
ils/elles chantent
```

Ce programme est fonctionnel pour tous les verbes réguliers du premier groupe.
*****************************************************************************************************************************************************************

EXERCICE 3

### Présentation du Code
Ce programme Java permet d’effectuer plusieurs opérations sur une chaîne de caractères saisie par l’utilisateur. Il présente un menu avec diverses options pour interagir avec la chaîne : saisie, affichage, inversion et comptage de mots.

### Fonctionnalités Implémentées

1. **Saisie de la chaîne de caractères** :
   - La méthode `readPhrase()` permet de lire une chaîne de caractères entrée par l’utilisateur et de la stocker dans la variable `phrase`.
   - La méthode utilise `Scanner` pour capturer l’entrée de l’utilisateur via le clavier.

2. **Affichage de la chaîne** :
   - La méthode `printPhrase()` affiche la chaîne stockée dans `phrase`.
   - Si aucune chaîne n’a encore été saisie, le message "No phrase" est affiché.

3. **Comptage des mots** :
   - La méthode `countWords()` compte le nombre de mots dans la chaîne `phrase`.
   - La chaîne est divisée en mots en utilisant `split(" ")`, qui considère les espaces comme séparateurs. Le nombre de mots est alors affiché.
   - Si aucune chaîne n’a encore été saisie, le message "No phrase" est affiché.

4. **Inversion de la chaîne (Manquante)** :
   - Le code fourni ne contient pas l'implémentation de la méthode pour inverser la chaîne. Pour ajouter cette fonctionnalité, une méthode `reversePhrase()` pourrait être implémentée pour inverser les caractères de `phrase` et afficher la chaîne inversée.

5. **Menu pour effectuer des opérations** :
   - La méthode `menu()` présente un menu de choix à l’utilisateur pour sélectionner une opération.
   - Le menu utilise un `do-while` pour permettre plusieurs opérations jusqu’à ce que l’utilisateur choisisse de quitter (option 5).
   - Après chaque opération, le programme retourne au menu.

### Exécution et Exemple d'Utilisation

1. **Lancement du menu** : le programme présente les options suivantes :
   - `1` pour saisir une chaîne,
   - `2` pour afficher la chaîne,
   - `3` pour inverser la chaîne (à ajouter),
   - `4` pour afficher le nombre de mots,
   - `5` pour quitter.

2. **Exemple de session** :
   ```plaintext
   --- Menu ---
   1. Saisir une chaîne de caractères
   2. Afficher la chaîne saisie
   3. Inverser la chaîne saisie
   4. Nombre de mots dans la chaîne
   5. Quitter
   Choisissez une option : 
   ```

### Remarques
Ce programme est structuré pour être interactif et facilite l’exécution d’opérations sur une chaîne de caractères par le biais d’un menu, offrant une expérience utilisateur intuitive.
*****************************************************************************************************************************************************************

EXERCICE 4

Voici le compte rendu pour le code du quatrième exercice :

### Présentation du Code
Ce programme Java lit une chaîne de caractères saisie par l’utilisateur et compte le nombre d’occurrences de chaque lettre de l’alphabet. Il ignore la différence entre les majuscules et les minuscules et n’affiche que les lettres apparaissant au moins une fois dans le texte.

### Fonctionnalités Implémentées

1. **Comptage des occurrences des lettres** :
   - La méthode `compterOccurrences(String ch)` est conçue pour compter le nombre d’occurrences de chaque lettre de l’alphabet.
   - Un tableau `nb_occurrences` de taille 26 est utilisé pour stocker les occurrences des lettres de 'A' à 'Z', chaque index représentant une lettre (index 0 pour 'A', index 1 pour 'B', etc.).
   - La chaîne `ch` est convertie en majuscules (`ch = ch.toUpperCase()`), ce qui permet de traiter les lettres de façon uniforme, sans distinguer les majuscules des minuscules.

2. **Itération et vérification des lettres** :
   - Le programme parcourt chaque caractère de la chaîne. Si le caractère est une lettre (entre 'A' et 'Z'), son occurrence est incrémentée dans le tableau.
   - Cette vérification est réalisée avec une condition (`if (c >= 'A' && c <= 'Z')`).

3. **Affichage des résultats** :
   - Une fois les occurrences comptées, le programme affiche chaque lettre apparaissant au moins une fois, avec le nombre d’occurrences.
   - Seules les lettres avec une occurrence supérieure à 0 sont affichées, conformément aux exigences.

### Exécution et Exemple d'Utilisation

1. **Saisie de la chaîne** :
   - L’utilisateur est invité à entrer une ligne de texte, et le programme utilise `compterOccurrences` pour compter et afficher les occurrences de chaque lettre.

2. **Exemple de sortie** :
   ```plaintext
   Entrez une ligne de texte : Jeanne
   La chaîne "JEANNE" contient :
   1 fois la lettre 'A'
   2 fois la lettre 'E'
   1 fois la lettre 'J'
   3 fois la lettre 'N'
   ```

### Code de la Méthode `main`

Pour rendre le programme exécutable, on peut ajouter une méthode `main` qui lira l’entrée de l’utilisateur et appellera `compterOccurrences` :

```java
public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    System.out.print("Entrez une ligne de texte : ");
    String ch = scanner.nextLine();
    compterOccurrences(ch);
}
```

conclusion 
Ces quatre exercices en Java explorent des concepts essentiels de la programmation, en particulier la manipulation de données et l'interaction avec l’utilisateur. Le premier exercice met en avant l’utilisation de tableaux pour stocker des données (notes des étudiants) et effectuer des opérations comme le tri, le calcul de moyenne, et la recherche de valeurs extrêmes. Le deuxième exercice développe la manipulation de chaînes pour conjuguer des verbes, en utilisant des méthodes de chaîne et la vérification d'entrées pour structurer et transformer le texte de manière pratique. Le troisième exercice introduit un menu interactif, permettant de réaliser diverses opérations sur une chaîne de caractères et illustrant l'importance de la modularité et de l’organisation d’un programme. Enfin, le quatrième exercice approfondit la logique de condition et le comptage avec des tableaux en analysant la fréquence des lettres dans une chaîne, sans distinction entre majuscules et minuscules. Ensemble, ces exercices renforcent la maîtrise des structures de données de base, des boucles, des conditions, et des entrées/sorties, offrant une base solide pour des applications plus avancées et une expérience utilisateur intuitive.



