import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TimeEntry } from '../models/time-entry';
import { TimeEntryService } from '../service/time-entry.service';

@Component({
  selector: 'app-time-entry-detail',
  templateUrl: './time-entry-detail.component.html',
  styleUrls: ['./time-entry-detail.component.css']
})
export class TimeEntryDetailComponent implements OnInit {
  timeEntry: TimeEntry = new TimeEntry(0, new Date(), 0, '', 0, 0);
  timeEntryForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private timeEntryService: TimeEntryService,
    private formBuilder: FormBuilder
  ) {
    this.timeEntryForm = this.formBuilder.group({
      id: [0],
      date: ['', Validators.required],
      hours: [0, [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      projectId: [0, Validators.required],
      taskId: [0, Validators.required]
    });
  }

  ngOnInit(): void {
    const timeEntryId = +this.route.snapshot.paramMap.get('id')!;
    if (timeEntryId) {
      this.loadTimeEntry(timeEntryId);
    }
  }

  loadTimeEntry(id: number): void {
    this.timeEntryService.get(id).subscribe(timeEntry => {
      this.timeEntry = timeEntry;
      this.timeEntryForm.patchValue(this.timeEntry);
    });
  }

  saveTimeEntry(): void {
    if (this.timeEntryForm.valid) {
      const timeEntryData = this.timeEntryForm.value;
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

  back() {
    this.router.navigate(['/time-entries']);
  
  }
}
