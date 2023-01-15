import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import { Matieres } from '../matieres';

@Component({
 selector: 'app-edit-assignment',
 templateUrl: './edit-assignment.component.html',
 styleUrls: ['./edit-assignment.component.css'],
})
export class EditAssignmentComponent implements OnInit {
 lstMatieres!: string[];
 assignment!: Assignment | undefined;
 nomAssignment!: string;
 matiereChoisie!: string;
 noteAssignment!: string;
 remarqueAssignment!: string;
 auteurAssignment!: string;
 dateDeRendu!: Date;

 constructor(
   private assignmentsService: AssignmentsService,
   private route: ActivatedRoute,
   private router: Router
 ) {}

 ngOnInit(): void {
   this.getAssignment();
   this.lstMatieres = Object.keys(Matieres);

 }


 test():void{
  console.log(this.lstMatieres);
}

 getAssignment() {
  // on récupère l'id dans le snapshot passé par le routeur
  // le "+" force l'id de type string en "number"
  const id = +this.route.snapshot.params['id'];

  this.assignmentsService.getAssignment(id).subscribe((assignment) => {
    if (!assignment) return;
    this.assignment = assignment;
    // Pour pré-remplir le formulaire
    this.nomAssignment = assignment.nom;
    this.dateDeRendu = assignment.dateDeRendu;
    this.auteurAssignment = assignment.auteur;
    this.remarqueAssignment = assignment.remarques;
    this.noteAssignment = assignment.note;
    this.matiereChoisie = assignment.matiere;
  });
}
onSaveAssignment() {
  if (!this.assignment) return;

  // on récupère les valeurs dans le formulaire
  this.assignment.nom = this.nomAssignment;
  this.assignment.dateDeRendu = this.dateDeRendu;
  this.assignment.note = this.noteAssignment;
  this.assignment.remarques = this.remarqueAssignment;
  this.assignment.auteur = this.auteurAssignment;
  this.assignment.matiere = this.matiereChoisie;

  this.assignmentsService
    .updateAssignment(this.assignment)
    .subscribe((message) => {
      //console.log(message);

      // navigation vers la home page
      this.router.navigate(['/home']);
    });
}

}
