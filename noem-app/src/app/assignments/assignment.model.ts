export class Assignment {
    _id?: string;
    id!: number;
    nom:string='';
    dateDeRendu:Date=new Date();
    rendu:boolean=false;
    matiere:string;
    imageMatiere:string;
    nomProf:string;
    imageProf:string;
    note:number;
    remarque:string;
    auteur:string;
}