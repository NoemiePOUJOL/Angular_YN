
import { Injectable } from '@angular/core';
import { Observable, forkJoin, of } from 'rxjs';
import {Assignment} from '../assignments/assignment.model';
import { LoggingService } from './logging.service';
import { HttpClient } from '@angular/common/http';
import { bdInitialAssignments } from "./data"

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {

   constructor(private loggingService:LoggingService, private http:HttpClient) { }

  assignments : Assignment[] = []

  url = "http://localhost:8010/api/assignments";
  //url = "https://serverjs-naxx.onrender.com/api/assignments";

  getAssignments(): Observable<Assignment[]>{
    return this.http.get<Assignment[]>(this.url); 
  }
  
  getAssignmentsPagine(page:number, limit:number): Observable<any>{
    return this.http.get<any>(this.url + "?page=" + page + "&limit=" + limit); 
  }


  getNewId():number{
    return this.assignments.length+1;
  }

  addAssignment(assignment: Assignment): Observable<any>{
    return this.http.post<Assignment>(this.url, assignment);
  }

  getAssignment(id:number): Observable<Assignment> {
    return this.http.get<Assignment>(this.url + "/" + id)
  }

  updateAssignment(assignment: Assignment): Observable<any>{
    return this.http.put<Assignment>(this.url, assignment);
  }

  deleteAssignment(assignment: Assignment): Observable<any>{
    this.loggingService.log(assignment.nom,"Supprimé");
    return this.http.delete(this.url + "/" + assignment._id);
  }

  peuplerBDavecForkJoin():Observable<any> {
    let appelsVersAddAssignment:Observable<any>[] = [];
 
    bdInitialAssignments.forEach(a => {
      const nouvelAssignment = new Assignment();
      nouvelAssignment.id = a.id;
      nouvelAssignment.nom = a.nom;
      nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
      nouvelAssignment.rendu = a.rendu;
      nouvelAssignment.matiere = a.matiere;
      nouvelAssignment.auteur = a.auteur;
      nouvelAssignment.note = a.note;

 
      appelsVersAddAssignment.push(this.addAssignment(nouvelAssignment))
    });
 
    return forkJoin(appelsVersAddAssignment);
  }
 
}


