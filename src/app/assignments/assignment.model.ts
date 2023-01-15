export class Assignment
{
  //_id!:string;
  _id?:string;
  
  id!: number;
  nom!:string;
  dateDeRendu!:Date;
  rendu!:boolean;

  //ajout de nouvelle propriétés à assignments
  auteur! : string;
  matiere! : string;
  note!: string;
  remarques! : string;
}
