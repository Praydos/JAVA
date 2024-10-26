import java.util.Arrays;
import java.util.Scanner;

public class Exercice1 {

    //creation et remplisage du tableu
    public static double[] creeTable(){

        Scanner scanner = new Scanner(System.in);

        // Saisie du nombre d'étudiants
        System.out.print("Entrez le nombre d'étudiants : ");
        int nombreEtudiants = scanner.nextInt();

        if (nombreEtudiants <= 0) {
            System.out.println("La taille doit être positive.");
            return new double[0]; // Retourne un tableau vide si la taille est invalide
        }

        //creation du table
        double[] notes = new double[nombreEtudiants];

        //remplire la table
        System.out.println("Saisissez les notes des étudiants :");
        for (int i = 0; i < nombreEtudiants; i++) {
            System.out.print("Note de l'étudiant " + (i + 1) + " : ");
            notes[i] = scanner.nextDouble();
        }

        return notes;
    }

    //trier et afficher le tableu
    public static void trie(double[] notes) {
        Arrays.sort(notes);
        for(double i: notes){
            System.out.println(i);
        }
    }

    //note moyenne
    public static double noteMoy(double[] notes) {
        double somme =0;
        for(double i: notes){
            somme += i;
        }
        return somme/notes.length;
    }

    //la note maximal et minimal
    public static void minMax(double[] notes) {
        Arrays.sort(notes);
        System.out.println("Max "+notes[ notes.length-1]);
        System.out.println("Min "+notes[0]);

    }



}
