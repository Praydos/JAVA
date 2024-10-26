import java.util.Scanner;

public class Exercice3 {
    private  String phrase;


    //read phrase
    public void readPhrase() {
        System.out.println("enter a phrase :");
        Scanner sc = new Scanner(System.in);
        phrase = sc.nextLine();

    }

    //print phrase
    public void printPhrase() {
        if(phrase == null) {
            System.out.println("No phrase");
        }else {
            System.out.println(phrase);
        }

    }

    //count words

    public void countWords() {
        int count = 0;
        if(phrase == null) {
            System.out.println("No phrase");

        }else {
            String[] words = phrase.split(" ");
            System.out.println("nbr des mots : " + words.length);
        }
    }

    //reverse phrase


    public void menu(){
        Scanner scanner = new Scanner(System.in);
        int choice;

        do {
            System.out.println("\n--- Menu ---");
            System.out.println("1. Saisir une chaîne de caractères");
            System.out.println("2. Afficher la chaîne saisie");
            System.out.println("3. Inverser la chaîne saisie");
            System.out.println("4. Nombre de mots dans la chaîne");
            System.out.println("5. Quitter");
            System.out.print("Choisissez une option : ");
            choice = scanner.nextInt();
            scanner.nextLine(); // Consomme le saut de ligne

            switch (choice) {
                case 1:
                    readPhrase();
                    break;
                case 2:
                   printPhrase();
                    break;
                case 4:
                    countWords();
                    break;
                case 5:
                    System.out.println("Au revoir!");
                    break;
                default:
                    System.out.println("Choix invalide. Veuillez réessayer.");
            }
        } while (choice != 5);
    }

}
