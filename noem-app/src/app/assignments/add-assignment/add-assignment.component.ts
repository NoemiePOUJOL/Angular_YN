import { Component,  OnInit, /*EventEmitter, Output */ } from '@angular/core';
import {Router} from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']

})
export class AddAssignmentComponent {
  //@Output() nouvelAssignment = new EventEmitter<Assignment>();
  nouvelAssignment: Assignment;
  nomDevoir:string ='';
  dateRendu:Date=new Date();
  rendu:boolean = false;
  matiere:string ='';
  auteur:string ='';
  note:number = 0;

  constructor(private assignmentService : AssignmentsService, private router:Router, private authservice:AuthService){}

  ngOnInit() {
  }

  onSubmit(event) {
  event.preventDefault();
  console.log(this.nomDevoir);

  const newAssignment = new Assignment();

  newAssignment.id = Math.floor(Math.random()*1000);
  newAssignment.nom = this.nomDevoir;
  newAssignment.dateDeRendu = this.dateRendu;
  newAssignment.rendu = this.rendu;
  newAssignment.matiere = this.matiere;
  newAssignment.auteur = this.matiere;
  newAssignment.note = this.note;

  //this.assignments.push(newAssignment);
  //this.nouvelAssignment.emit(newAssignment);

  this.assignmentService.addAssignment(newAssignment)
    .subscribe(reponse => {
      console.log("réponse du serveur :" + reponse.message);

      //on navigue vers la page d'accueil
      this.router.navigate(['home']);
    });
  }
}


