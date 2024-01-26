import { Component, OnInit } from '@angular/core';
import { Assignment } from '../assignment.model';
import {AssignmentsService} from '../../shared/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css']
})

export class EditAssignmentComponent implements OnInit{ 
  assignment : Assignment | undefined;
  nomAssignment : string;
  dateDeRendu : Date;
  rendu : boolean;
  matiere : string;
  auteur : string;
  note: number;


  constructor(private assignmentsService: AssignmentsService, private route: ActivatedRoute, private router:Router) {}

  ngOnInit(): void {
    this.getAssignment();

    //affichage des queryParams et fragment
    console.log("Query Params :");
    console.log(this.route.snapshot.queryParams);
    console.log("Fragment :");
    console.log(this.route.snapshot.fragment);
  }


  getAssignment(){
    const id = +this.route.snapshot.params['id'];

    this.assignmentsService.getAssignment(id).subscribe((assignment) => {
      if (!assignment) return;
      this.assignment = assignment;
      this.nomAssignment = assignment.nom;
      this.dateDeRendu = assignment.dateDeRendu;
      this.rendu = assignment.rendu;
      this.matiere = assignment.matiere;
      this.auteur = assignment.auteur;
      this.note = assignment.note;
    });
  }


  onSaveAssignment(){
    if (!this.assignment) return;

    this.assignment.nom = this.nomAssignment;
    this.assignment.dateDeRendu = this.dateDeRendu;
    this.assignmentsService
      .updateAssignment(this.assignment)
      .subscribe(reponse => {
        console.log("Réponse du serveur : " + reponse.message);
        this.router.navigate(['/home']);
      });
  }
}
