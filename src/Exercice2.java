import java.util.Scanner;

public class Exercice2 {


    public static void conjuger(String verbe){
        if(!verbe.toLowerCase().endsWith("er")){
            System.out.println("le verbe n'est pas de 1er group");
            return;
        }
        String baseVerbe = verbe.substring(0, verbe.length()-2);

        // Affichage de la conjugaison au présent de l'indicatif
        System.out.println("je " + baseVerbe + "e");
        System.out.println("tu " + baseVerbe + "es");
        System.out.println("il/elle " + baseVerbe + "e");
        System.out.println("nous " + baseVerbe + "ons");
        System.out.println("vous " + baseVerbe + "ez");
        System.out.println("ils/elles " + baseVerbe + "ent");



    }

}
