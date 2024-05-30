import { Component, OnInit } from '@angular/core';
import { TimeEntry } from '../models/time-entry';
import { TimeEntryService } from '../service/time-entry.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-time-entry-list',
  templateUrl: './time-entry-list.component.html',
  styleUrls: ['./time-entry-list.component.css']
})
export class TimeEntryListComponent implements OnInit {
  timeEntries: TimeEntry[] = [];

  constructor(
    private timeEntryService: TimeEntryService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadTimeEntries();
  }

  loadTimeEntries(): void {
    this.timeEntryService.getAll().subscribe(entries => {
      this.timeEntries = entries;
    });
  }

  deleteTimeEntry(entryId: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: {
        title: 'Löschen',
        message: 'Soll dieser Eintrag gelöscht werden?'
      }
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult === true) {
        this.timeEntryService.delete(entryId).subscribe({
          next: response => {
            if (response.status === 200) {
              this.snackBar.open('Der Eintrag wurde erfolgreich gelöscht.', '', { duration: 4000 });
              this.loadTimeEntries();
            } else {
              this.snackBar.open('Es ist ein Fehler aufgetreten.', '', { duration: 4000 });
            }
          },
          error: () => this.snackBar.open('Es ist ein Fehler aufgetreten.', '', { duration: 4000 })
        });
      }
    });
  }
}
