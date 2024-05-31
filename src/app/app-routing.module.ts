import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TaskListComponent } from './pages/task-list/task-list.component';

import { AppRoles } from './app.roles';
import { ProjectDetailComponent } from './pages/project-detail/project-detail.component';
import { AppAuthGuard } from './guard/app.auth.guard';
import { ProjectListComponent } from './pages/project-list/project-list.component';
import { TaskDetailComponent } from './pages/task-detail/task-detail.component';
import { TimeEntryListComponent } from './pages/time-entry-list/time-entry-list.component';
import { TimeEntryDetailComponent } from './pages/time-entry-detail/time-entry-detail.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  
  { 
    path: 'projects', 
    component: ProjectListComponent, 
    canActivate: [AppAuthGuard], 
    data: { roles: [AppRoles.Read], pagetitle: 'Projects' } 
  },
  
  { 
    path: 'projects/:id', 
    component: ProjectDetailComponent, 
    canActivate: [AppAuthGuard], 
    data: { roles: [AppRoles.Update], pagetitle: 'Project Detail' } 
  },
  
  { 
    path: 'tasks', 
    component: TaskListComponent, 
    canActivate: [AppAuthGuard], 
    data: { roles: [AppRoles.Read], pagetitle: 'Tasks' } 
  },
  { 
    path: 'task-detail', 
    component: TaskDetailComponent, 
    canActivate: [AppAuthGuard], 
    data: { roles: [AppRoles.Update], pagetitle: 'Task Detail' } 
  },
  { 
    path: 'tasks/:id', 
    component: TaskDetailComponent, 
    canActivate: [AppAuthGuard], 
    data: { roles: [AppRoles.Update], pagetitle: 'Task Detail' } 
  },


  { 
    path: 'time-entries', 
    component: TimeEntryListComponent, 
    canActivate: [AppAuthGuard], 
    data: { roles: [AppRoles.Read], pagetitle: 'Time Entries' } 
  },
  
  { 
    path: 'time-entry/:id', 
    component: TimeEntryDetailComponent, 
    canActivate: [AppAuthGuard], 
    data: { roles: [AppRoles.Update], pagetitle: 'Time Entry Detail' } 
  },
  { 
    path: 'users', 
    component: UserListComponent, 
    canActivate: [AppAuthGuard], 
    data: { roles: [AppRoles.Read], pagetitle: 'Users' } 
  },

  { 
    path: 'users/add', 
    component: UserDetailComponent, 
    canActivate: [AppAuthGuard], 
    data: { roles: [AppRoles.Update], pagetitle: 'Add New User' } 
  },
  
  { 
    path: 'users/:id', 
    component: UserDetailComponent, 
    canActivate: [AppAuthGuard], 
    data: { roles: [AppRoles.Update], pagetitle: 'User Detail' } 
  },

  { 
    path: 'users/edit/:id', 
    component: UserDetailComponent, 
    canActivate: [AppAuthGuard], 
    data: { roles: [AppRoles.Update], pagetitle: 'User Edit' } 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
