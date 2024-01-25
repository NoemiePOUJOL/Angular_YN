import { Component, OnInit } from '@angular/core';
import { Assignment } from './assignment.model';
import { AssignmentsService } from '../shared/assignments.service';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})

export class AssignmentsComponent implements OnInit {
  titre = "Mon application sur les Assignments"
  ajoutActive = false;
  assignmentSelectionne! :Assignment;
  //formVisible = true; 
  assignments :Assignment[] = [];

  //Pour la pagination
  page : number = 1;
  limit : number = 2;
  totalDocs : number;
  totalPages : number;
  hasPrevPage : boolean;
  prevPage : number;
  hasNextPage : boolean;
  nextPage : number;

  constructor(private assignmentsService:AssignmentsService) { }

  ngOnInit() : void {
    this.getAssignments();
  }

  getAssignments(){
    this.assignmentsService.getAssignmentsPagine(this.page, this.limit).subscribe((data)=>{
      console.log('données reçues');
      this.assignments = data.docs;
      this.page = data.page;
      this.limit = data.limit;
      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;
      this.hasPrevPage = data.hasPrevPage;
      this.prevPage = data.prevPage;
      this.hasNextPage = data.hasNextPage;
      this.nextPage = data.nextPage;
      console.log('données reçues');
    });
    console.log('demande envoyée au service');
  }
  
  pageSuivante(){
    if(this.hasNextPage) {
    this.page = this.nextPage;
    this.getAssignments();
    }
  }

  dernierePage(){
    this.page = this.totalPages;
    this.getAssignments();
    
  }

  pagePrecedente(){
    if(this.hasPrevPage) {
    this.page = this.prevPage;
    this.getAssignments();
    }
  }

  premierePage(){
    this.page = 1;
    this.getAssignments();
    
  }
}


