import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimeEntryService {
  private apiUrl = 'http://localhost:8080/api/timeEntry';

  constructor(private http: HttpClient) {}

  getAllTimeEntries(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createTimeEntry(timeEntry: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, timeEntry);
  }

  getTimeEntryById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  updateTimeEntry(id: number, timeEntry: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, timeEntry);
  }

  deleteTimeEntry(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
