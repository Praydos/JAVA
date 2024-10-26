import java.util.Scanner;

public class Exercice4 {

    // Fonction pour compter les occurrences des lettres
    public static void compterOccurrences(String ch) {
        // Tableau pour stocker le nombre d'occurrences de chaque lettre
        int[] nb_occurrences = new int[26];

        // Conversion de la chaîne en majuscules pour simplifier la gestion des lettres
        ch = ch.toUpperCase();

        // Comptage des occurrences des lettres
        for (int i = 0; i < ch.length(); i++) {
            char c = ch.charAt(i);
            if (c >= 'A' && c <= 'Z') { // Vérifie si le caractère est une lettre
                nb_occurrences[c - 'A']++;
            }
        }

        System.out.println("La chaîne \"" + ch + "\" contient :");
        for (int i = 0; i < 26; i++) {
            if (nb_occurrences[i] > 0) {
                char lettre = (char) (i + 'A');
                System.out.println(nb_occurrences[i] + " fois la lettre '" + lettre + "'");
            }
        }

//        return nb_occurrences;
    }



    }


