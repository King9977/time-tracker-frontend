import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: User = new User(0, '', '', '');

  public userForm = new FormGroup({
    id: new FormControl(0),
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.userService.get(parseInt(userId, 10)).subscribe((user: User) => {
        this.user = user;
        this.userForm = this.formBuilder.group(this.user);
      });
    }
  }

  saveUser(formData: any) {
    this.user = Object.assign({}, formData);
  
    if (this.user.id) {
      this.userService.update(this.user.id, this.user).subscribe({
        next: () => {
          this.back();
        }
      });
    } else {
      this.userService.create(this.user).subscribe({
        next: () => {
          this.back();
        }
      });
    }
  }
  

  back() {
    this.router.navigate(['/users']);
  }
}
