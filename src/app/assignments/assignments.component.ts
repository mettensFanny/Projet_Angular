import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from './assignment.model';
import { AuthService } from 'src/app/shared/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import {animate, state, style, transition, trigger} from '@angular/animations';



@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})


export class AssignmentsComponent implements OnInit, AfterViewInit {

  titre = 'Mon application sur les assignments';
  assignmentSelectionne!: Assignment;

  //template recup sur angular material
  columns = [
    {
      nom: 'nom du devoir',
      cell: (assignment: Assignment) => `${assignment.nom}`,
    },
    {
      nom: 'date de rendu',
      cell: (assignment: Assignment) => `${this.formaterDate(assignment.dateDeRendu)}`,
    },
    {
      nom: 'rendu',
      cell: (assignment: Assignment) => `${this.estRendu(assignment.rendu)}`,
    },
    {
      nom: ' ',
      cell: (assignment: Assignment) => `${assignment.id}`,
    },
  ];

  displayedColumns = this.columns.map(c => c.nom);



  //aide sur https://stackoverflow.com/questions/66839002/how-to-add-pagination-in-angular-material-table-that-bind-to-api-response
  public assignments = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) private paginator!: MatPaginator;

  constructor(private assignmentsService: AssignmentsService, private authService: AuthService) { }

  ngOnInit(): void {

    this.assignmentsService.getAssignments().subscribe(
      res => this.assignments.data = res
    );

  }

  ngAfterViewInit(): void {
    this.assignments.paginator = this.paginator;
  }


  onAssignmentClicke(assignment: Assignment) {
    this.assignmentSelectionne = assignment;
  }

  //fonction qui check le status connecté
  isConnected(): boolean {
    return this.authService.loggedIn;
  }

  estRendu(rendu: boolean): string {
    return rendu ? "oui" : "non";
  }

  formaterDate(dateRendu: Date): string {
    return dateRendu.toString().split("T")[0];
  }
}