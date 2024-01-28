import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-liste-professeur',
  templateUrl: './liste-professeur.component.html',
  styleUrls: ['./liste-professeur.component.css']
})
export class ListeProfesseurComponent {

  listeNomProf = ["Arnault", "Galli", "Tounsi", "Buffa", "Donati"];
  listePrenomProf = ["Frederic", "Gregory", "Stephane", "Michel", "Leo"];
  listeImageProf = ["Frederic_Arnault.jpeg", "Gregory_Galli.jpeg", "Stephane_Tounsi.jpeg", "Michel_Buffa.jpeg", "Leo_Donati.jpeg"];
  path = "../assets/imageProf/";

  // Création d'un tableau d'objets 'profs' regroupant les informations
  profs: any[] = [];

  // Propriété pour stocker les professeurs à afficher sur une page donnée
  paginatedProfs: any[] = [];

  constructor() {
    // Initialisation du tableau 'profs' avec les informations des professeurs
    for (let i = 0; i < this.listeNomProf.length; i++) {
      this.profs.push({
        nom: this.listeNomProf[i],
        prenom: this.listePrenomProf[i],
        image: this.listeImageProf[i]
      });
    }

    // Initialisation des professeurs à afficher sur la première page
    this.paginatedProfs = this.profs.slice(0, 5); // Supposant une pagination de 5 éléments par page
  }

  pageEvent(event: PageEvent) {
    console.log(event);
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.paginatedProfs = this.profs.slice(startIndex, endIndex);
  }
}
