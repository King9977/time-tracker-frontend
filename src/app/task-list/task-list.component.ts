import { Component, OnInit } from '@angular/core';
import { TaskService } from '../service/task.service';
import { Task } from '../models/task';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Project } from '../models/project';
import { ProjectService } from '../service/project.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  projects: Project[] = [];

  constructor(
    private taskService: TaskService,
    private projectService: ProjectService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadTasks();
    this.loadProjects();
  }

  loadTasks() {
    this.taskService.getAllTasks().subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });
  }

  loadProjects() {
    this.projectService.getAll().subscribe((projects: Project[]) => {
      this.projects = projects;
    });
  }
  

  getProjectNameById(projectId: number): string {
    const projects = this.projects.find(projects => projects.id === projectId);
    return projects ? projects.name : '';
  }

  deleteTask(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: {
        title: 'Löschen',
        message: 'Soll dieser Eintrag gelöscht werden?'
      }
  })

  dialogRef.afterClosed().subscribe(dialogResult => {
    if (dialogResult === true) {
      this.taskService.delete(id).subscribe({
        next: response => {
          if (response.status === 200) {
            this.snackBar.open('Der Eintrag ist gelöscht worden.', '', {duration: 4000});
            this.loadTasks()
          } else {
            this.snackBar.open('Es ist ein Fehler aufgetreten.', '', {duration: 4000});
          }
        },
        error: () => this.snackBar.open('Es ist ein Fehler aufgetreten.', '', {duration: 4000})
      })
    }
  })  }
}
