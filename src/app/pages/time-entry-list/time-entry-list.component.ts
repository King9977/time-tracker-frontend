import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TimeEntry } from '../../models/time-entry';
import { Task } from '../../models/task';
import { TimeEntryService } from '../../service/time-entry.service';
import { TaskService } from '../../service/task.service';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-time-entry-list',
  templateUrl: './time-entry-list.component.html',
  styleUrls: ['./time-entry-list.component.css']
})
export class TimeEntryListComponent implements OnInit {
  timeEntries: TimeEntry[] = [];
  tasks: Task[] = [];

  constructor(
    private timeEntryService: TimeEntryService,
    private taskService: TaskService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadTimeEntries();
    this.loadTasks();
  }

  loadTimeEntries(): void {
    this.timeEntryService.getAll().subscribe(entries => {
      this.timeEntries = entries;
    });
  }

  loadTasks(): void {
    this.taskService.getAllTasks().subscribe(entries => {
      this.tasks = entries;
    });
  }

  getTaskNameById(taskId: number): string {
    const task = this.tasks.find(task => task.id === taskId);
    return task ? task.name : '';
  }
  
  calculateDuration(startTime: string, endTime: string): number {
    const start = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${endTime}:00`);
    const durationInMilliseconds = end.getTime() - start.getTime();
    return durationInMilliseconds / (1000 * 60);
  }

  deleteTimeEntry(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: {
        title: 'Löschen',
        message: 'Soll dieser Eintrag gelöscht werden?'
      }
  })

  dialogRef.afterClosed().subscribe(dialogResult => {
    if (dialogResult === true) {
      this.timeEntryService.delete(id).subscribe({
        next: response => {
          if (response.status === 200) {
            this.snackBar.open('Der Eintrag ist gelöscht worden.', '', {duration: 4000});
            this.loadTimeEntries()
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
