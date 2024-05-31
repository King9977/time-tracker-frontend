import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Task } from '../../models/task';
import { Project } from '../../models/project';
import { TaskService } from '../../service/task.service';
import { ProjectService } from '../../service/project.service';


@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
  task: Task  = new Task();
  taskId!: number;
  projects: Project[] = [];

  public taskForm = new FormGroup({
    id: new FormControl(0),
    name: new FormControl(''),
    projectId: new FormControl(0),
    description: new FormControl('')
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private formBuilder: FormBuilder,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.taskId = +this.route.snapshot.paramMap.get('id')!;
    this.loadTask(this.taskId);
    this.loadProjects();
  }
  
  loadProjects(): void {
    this.projectService.getAll().subscribe(projects => {
      this.projects = projects;
    });
  }

  
  
  loadTask(taskId: number): void {
    this.taskService.get(taskId).subscribe(task => {
      this.task = task;
      this.taskForm = this.formBuilder.group(this.task)
    });
  }

  saveTask(formData: any): void {
    this.task = Object.assign({}, formData);

    if (this.task.id) {
      this.taskService.update(this.task.id, this.task).subscribe({
        next: () => {
          this.back();
        }
      });
    } else {
      this.taskService.create(this.task).subscribe({
        next: () => {
          this.back();
        }
      });
    }
  }

  back() {
    this.router.navigate(['/tasks']);
  }
}
