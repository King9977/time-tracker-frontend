import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimeEntryService {
  private apiUrl = 'http://localhost:9090/api/timeEntry';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  create(timeEntry: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, timeEntry);
  }

  get(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  update(id: number, timeEntry: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, timeEntry);
  }

  delete(id: number): Observable<HttpResponse<string>> {
    return this.http.delete<string>(`${this.apiUrl}/${id}`, {observe: 'response'});
  }
}
