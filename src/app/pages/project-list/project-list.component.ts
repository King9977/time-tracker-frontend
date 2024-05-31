import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProjectService } from '../../service/project.service';
import { Project } from '../../models/project';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];

  constructor(
    private projectService: ProjectService,   
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects() {
    this.projectService.getAll().subscribe((projects: Project[]) => {
      this.projects = projects;
    });
  }

  deleteProject(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: {
        title: 'Löschen',
        message: 'Soll dieser Eintrag gelöscht werden?'
      }
  })

  dialogRef.afterClosed().subscribe(dialogResult => {
    if (dialogResult === true) {
      this.projectService.delete(id).subscribe({
        next: response => {
          if (response.status === 200) {
            this.snackBar.open('Der Eintrag ist gelöscht worden.', '', {duration: 4000});
            this.loadProjects()
          } else {
            this.snackBar.open('Es ist ein Fehler aufgetreten.', '', {duration: 4000});
          }
        },
        error: () => this.snackBar.open('Es ist ein Fehler aufgetreten.', '', {duration: 4000})
      })
    }
  })
}
}
