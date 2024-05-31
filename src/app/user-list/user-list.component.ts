import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { User } from '../models/user';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAll().subscribe((users: User[]) => {
      this.users = users;
    });
  }

  deleteUser(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: {
        title: 'Löschen',
        message: 'Soll dieser Eintrag gelöscht werden?'
      }
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult === true) {
        this.userService.delete(id).subscribe({
          next: response => {
            if (response.status === 200) {
              this.snackBar.open('Der Eintrag ist gelöscht worden.', '', { duration: 4000 });
              this.loadUsers();
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
