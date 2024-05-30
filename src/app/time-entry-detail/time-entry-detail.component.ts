import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TimeEntryService } from '../service/time-entry.service';
// Annahme: TimeEntry-Modell existiert nicht, verwenden 'any' als Typ


@Component({
  selector: 'app-time-entry-detail',
  templateUrl: './time-entry-detail.component.html',
  styleUrls: ['./time-entry-detail.component.css']
})
export class TimeEntryDetailComponent implements OnInit {
  timeEntry: any = {}; // Hier 'any' als Typ für das Zeit-Eintrag verwenden

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private timeEntryService: TimeEntryService
  ) { }

  ngOnInit(): void {
    const timeEntryId = this.route.snapshot.paramMap.get('id');
    if (timeEntryId !== null) {
      const id = +timeEntryId;
      if (!isNaN(id)) {
        this.timeEntryService.getTimeEntryById(id).subscribe((timeEntry: any) => { // Hier 'any' als Typ für das Zeit-Eintrag verwenden
          this.timeEntry = timeEntry;
        });
      } else {
        // Behandlung, wenn die ID keine gültige Zahl ist
      }
    } else {
      // Behandlung, wenn keine ID im Pfad vorhanden ist
    }
  }
  

  saveTimeEntry(): void {
    this.timeEntryService.updateTimeEntry(this.timeEntry.id, this.timeEntry).subscribe((updatedTimeEntry: any) => { // Hier 'any' als Typ für das Zeit-Eintrag verwenden
      this.timeEntry = updatedTimeEntry;
      // Optional: Füge eine Erfolgsmeldung hinzu oder leite zur Zeit-Eintrag-Liste weiter
    });
  }

  cancel(): void {
    // Optional: Implementiere Logik für das Abbrechen und Weiterleiten
  }
}
