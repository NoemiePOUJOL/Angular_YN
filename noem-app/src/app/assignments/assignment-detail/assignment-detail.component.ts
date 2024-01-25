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

  constructor(public authService : AuthService, private assignmentsService: AssignmentsService, private route: ActivatedRoute, private router:Router) {}

  ngOnInit(): void {
    const id= +this.route.snapshot.params['id'];

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

}