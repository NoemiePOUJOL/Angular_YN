import { Component, /*Input,*/ OnInit } from '@angular/core';
import { Assignment } from '../assignment.model';
import {AssignmentsService} from '../../shared/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})

export class AssignmentDetailComponent implements OnInit {

  //@Input() assignmentTransmis! : Assignment;
  assignmentTransmis:Assignment;

  //mapping entre matiere et les autres matières
  mapNomProf = new Map<string, string>();
  mapImageMatiere = new Map<string, string>();
  mapImageProf = new Map<string, string>();

  listeNomProf = ["F. Arnault", "G. Galli", "S. Tounsi", "M. Buffa", "L. Donati"];
  listeImageMatiere = ["Communication.jpg", "Base_de_donnees.jpg", "Management_du_numerique.jpg", "IA.jpg","Outils_mathematiques.jpg"]
  listeImageProf = ["Frederic_Arnault.jpeg","Gregory_Galli.jpeg","Stephane_Tounsi.jpeg","Michel_Buffa.jpeg","Leo_Donati.jpeg"]
  listeMatiere = ["Communication","Base de donnees","Management du numerique", "IA","Outils mathematiques"]

  

  constructor(public authService : AuthService, private assignmentsService: AssignmentsService, private route: ActivatedRoute, private router:Router) {}

  ngOnInit(): void {
    const id= +this.route.snapshot.params['id'];

    this.remplirMaps();

    this.assignmentsService.getAssignment(id)
      .subscribe(a =>this.assignmentTransmis = a);
  }

  /*getAssignment(){
    const id = +this.route.snapshot.params['id'];
    this.assignmentsService.getAssignment(id)
      .subscribe(assignment => this.assignmentTransmis = assignment);
  }*/

  onAssignmentRendu() {
    if(this.assignmentTransmis){
      this.assignmentTransmis.rendu = true;

    this.assignmentsService.updateAssignment(this.assignmentTransmis)
      .subscribe(reponse => {
        console.log ("Réponse du server : " + reponse.message);

        this.router.navigate(["/home"]);
      })
    }
  }

  onDelete(){
    if(this.assignmentTransmis){
      this.assignmentsService.deleteAssignment(this.assignmentTransmis)
      .subscribe(reponse => {
        console.log ("Réponse du serveur :" + reponse.message);

        this.router.navigate(["/home"]);
      });
      this.assignmentTransmis = undefined;
    }
  }

  onClickEdit() {
    this.router.navigate(["/assignment", this.assignmentTransmis.id, 'edit'],
    {queryParams:{nom:this.assignmentTransmis.nom},fragment : 'edition'});
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  isLogged(): boolean {
    return this.authService.isLogged();
  }

  selectImageProf(): string {
    const path = "../../assets/imageProf/";
    const matiere = this.assignmentTransmis.matiere;
  
    console.log("Matiere:", matiere);
  
    if (this.mapImageProf.has(matiere)) {
      const imagePath = path + this.mapImageProf.get(matiere);
      console.log("Image Path:", imagePath);
      return imagePath;
    } else {
      console.log("Matiere non trouvée dans la mapImageProf.");
      return null;
    }
  }

  selectNomProf(): string {
    if (this.assignmentTransmis) {
      const matiere = this.assignmentTransmis.matiere;
      if (this.mapNomProf.has(matiere)) {
        return this.mapNomProf.get(matiere);
      }
    }
    return null;
  }

  selectImageMatiere(): string {
    const path = "../../assets/imageMatiere/";
    const matiere = this.assignmentTransmis.matiere;
  
    console.log("Matiere:", matiere);
  
    if (this.mapImageProf.has(matiere)) {
      const imagePath = path + this.mapImageMatiere.get(matiere);
      console.log("Image Path:", imagePath);
      return imagePath;
    } else {
      console.log("Matiere non trouvée dans la mapImageProf.");
      return null;
    }
  }

  private remplirMaps(): void {
    for (let i = 0; i < this.listeNomProf.length; i++) {
      const nomProf = this.listeNomProf[i];
      const imageMatiere = this.listeImageMatiere[i];
      const imageProf = this.listeImageProf[i];
      const matiere = this.listeMatiere[i];

      this.mapNomProf.set(matiere, nomProf);
      this.mapImageMatiere.set(matiere, imageMatiere);
      this.mapImageProf.set(matiere, imageProf);
    }
  }

}