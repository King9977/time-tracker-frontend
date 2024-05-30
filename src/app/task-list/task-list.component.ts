import { Component, OnInit } from '@angular/core';
import { TaskService } from '../service/task.service';
import { Task } from '../models/task';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(
    private taskService: TaskService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getAllTasks().subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });
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
