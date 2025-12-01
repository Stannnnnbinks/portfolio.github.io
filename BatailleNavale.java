// 0 = aucune action sur cette case,aucun pion(valeur initiale de toute les cases)
// 1 = un pion non découvert ( valeur quand un bateau est sur la case et non découvert)
// 2 = un pion découvert (valeur quand un bateau est sur la case et découvert par l'adversaire)
// 3 = une case découverte sans pion ( la case a été découverte mais il n'y a pas de bateau)

import java.util.Scanner;

public class BatailleNavale {

    public static void affichagetabJoueur(int[][] plateau, int taille) {
        
        // Affichage des numéros de colonnes en haut
        System.out.print("   "); // Espacement avant les colonnes
        for (int j = 0; j < taille; j++) {
            System.out.print(j+1 + " "); // Affiche les numéros de colonnes
            }
        System.out.println();
        
        // Affichage des lignes avec les numéros de lignes à gauche
        for (int i = 0; i < taille; i++) { // boucle pour parcourir les lignes
            System.out.print(i+1 + "  "); // Affiche le numéro de la ligne
            for (int j = 0; j < taille; j++) { // boucle pour parcourir les colonnes
                switch (plateau[i][j]) {
                    case 0:
                        System.out.print("~ "); // Case vide
                        break;
                    case 1:
                        System.out.print("o "); // Bateau
                        break;
                }
            }
            System.out.println(); // pour passer à la ligne suivante
        }
    }


    public static void affichagetabJoueurCache(int[][] plateau, int taille) {
        
        System.out.print("   ");
        for (int j = 0; j < taille; j++) {
            System.out.print(j+1 + " ");
            }
        System.out.println();
        
        for (int i = 0; i < taille; i++) {
            System.out.print(i+1 + "  ");
            for (int j = 0; j < taille; j++) {
                switch (plateau[i][j]) {
                    case 0:
                        System.out.print("? "); // Case vide
                        break;
                    case 1:
                        System.out.print("? "); // Pion non découvert
                        break;
                    case 2:
                        System.out.print("o ");  // Pion découvert
                        break;
                    case 3:
                        System.out.print("x "); // Case sans bateau
                        break;
                }
            }
            System.out.println();
        }
    }
    


    public static void main(String[] args) {
        int[][] tabJoueur = new int[5][5]; // En Java, tous les tableaux numériques sont automatiquement initialisés à 0
        int[][] tabOrdi = new int[5][5];

        Scanner sc = new Scanner(System.in);

        System.out.println("Bataille Navale");

        System.out.println("Placement des bateaux :");

        int ligne, colonne;

        for (int b = 1; b <= 5; b++) { // On répète 5 fois la demande
            boolean placementValide = false;

            while (!placementValide) { // Tant que le bateau n'est pas placé correctement , on redemande
                System.out.println("Bateau " + b + " :");

                System.out.print("Entrez la ligne (0 à 4) : ");
                ligne = sc.nextInt();

                System.out.print("Entrez la colonne (0 à 4) : ");
                colonne = sc.nextInt();

                // Vérification de validité
                if (ligne < 0 || ligne >= 5 || colonne < 0 || colonne >= 5) {
                    System.out.println("Coordonnées invalides.");
                } else if (tabJoueur[ligne][colonne] != 0) {
                    System.out.println("Case déjà occupée.");
                } else {
                    tabJoueur[ligne][colonne] = 1; // Placement du pion
                    placementValide = true;
                }
            }
        }
        System.out.println("Tous les bateaux sont placés !");
        System.out.println("Plateau du joueur :");
        affichagetabJoueur(tabJoueur, 5);


        for (int b = 1; b <= 5; b++) {
            boolean placementValide = false;
            while (!placementValide) {
                int ligneOrdi = (int)(Math.random() * 5);
                int colonneOrdi = (int)(Math.random() * 5);

                if (tabOrdi[ligneOrdi][colonneOrdi] == 0) {
                    tabOrdi[ligneOrdi][colonneOrdi] = 1;
                    placementValide = true;
                }
            }
        }
        System.out.println("Plateau de l'ordi :");
        affichagetabJoueur(tabOrdi, 5);
    }
}

