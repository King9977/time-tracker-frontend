import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TimeEntryService } from '../service/time-entry.service';
import { Project } from '../models/project';
import { ProjectService } from '../service/project.service';
import { TimeEntry } from '../models/time-entry';
import { Task } from '../models/task'; // Importieren Sie das Task-Modell
import { TaskService } from '../service/task.service'; // Importieren Sie den TaskService

@Component({
  selector: 'app-time-entry-detail',
  templateUrl: './time-entry-detail.component.html',
  styleUrls: ['./time-entry-detail.component.css']
})
export class TimeEntryDetailComponent implements OnInit {
  timeEntry: TimeEntry = new TimeEntry(0, new Date(), '', '', 0, 0,);
  projects: Project[] = [];
  tasks: Task[] = []; // Definieren Sie die tasks-Eigenschaft

  public timeForm = new FormGroup({
    id: new FormControl(0),
    date: new FormControl(),
    startTime: new FormControl(''),
    endTime: new FormControl(''),
    taskId: new FormControl(0),
    userId: new FormControl(0),
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private timeEntryService: TimeEntryService,
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    const timeEntryId = +this.route.snapshot.paramMap.get('id')!;
    if (timeEntryId) {
      this.loadTimeEntry(timeEntryId);
    }

    this.loadProjects();
    this.loadTasks();
  }

  loadProjects(): void {
    this.projectService.getAll().subscribe(projects => {
      this.projects = projects;
    });
  }

  loadTasks(): void {
    this.taskService.getAllTasks().subscribe(tasks => {
      this.tasks = tasks;
      console.log(this.tasks);
    });
  }
  

  loadTimeEntry(id: number): void {
    this.timeEntryService.get(id).subscribe(timeEntry => {
      this.timeEntry = timeEntry;
      this.timeForm.patchValue(this.timeEntry);
    });
  }

  calculateDuration(startTime: string, endTime: string): number {
    const start = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${endTime}:00`);
    const durationInMilliseconds = end.getTime() - start.getTime();
    return durationInMilliseconds / (1000 * 60);
  }

  saveTimeEntry(): void {
    if (this.timeForm.valid) {
      const timeEntryData = this.timeForm.value;
  
      if (typeof timeEntryData.userId !== 'number') {
        timeEntryData.userId = 0;
      }
  
      if (typeof timeEntryData.startTime !== 'string' || typeof timeEntryData.endTime !== 'string') {
        console.error('Ungültige Start- oder Endzeit');
        return;
      }
      
      if (timeEntryData.id) {
        this.timeEntryService.update(timeEntryData.id, timeEntryData).subscribe(() => {
          this.router.navigate(['/time-entries']);
        });
      } else {
        this.timeEntryService.create(timeEntryData).subscribe(() => {
          this.router.navigate(['/time-entries']);
        });
      }
    }
  }
  

  back(): void {
    this.router.navigate(['/time-entries']);
  }
}
