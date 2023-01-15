import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import { Matieres } from '../matieres';



@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css'],
})
export class AddAssignmentComponent implements OnInit {
  // emetteur de l'événementy (nouvelAssignment)
  // du formulaire
  lstMatieres!: string[];

  nomDevoir: string = '';
  nomAuteur: string = '';
  matiereChoisie: string = '';
  dateDeRendu!: Date;
  remarques: string = '';
  note: string = '';



  constructor(private assignmentsService: AssignmentsService) { }

  ngOnInit(): void {
    this.lstMatieres = Object.keys(Matieres);
  }

  onSubmit() {

    //console.log(this.nomDevoir + ' a rendre le ' + this.dateDeRendu);
    const newAssignment = new Assignment();

    newAssignment.nom = this.nomDevoir;
    newAssignment.dateDeRendu = this.dateDeRendu;
    newAssignment.rendu = false;
    newAssignment.id = Math.floor(Math.random() * 100000000);

    // ajout des nouvelles propriétes de assignment
    newAssignment.auteur = this.nomAuteur;
    newAssignment.matiere = this.matiereChoisie;
    newAssignment.note = "non rendu";
    newAssignment.remarques = this.remarques;

    //this.assignments.push(newAssignment);
    //this.nouvelAssignment.emit(newAssignment);
    this.assignmentsService.addAssignment(newAssignment)
      .subscribe(reponse => {
        console.log(reponse.message);
      });
  }
}
