import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = '/api/v1';

  constructor(private http: HttpClient) {}

  getMembers(): Observable<any[]> { return this.http.get<any[]>(`${this.baseUrl}/members/`); }
  createMember(data: any): Observable<any> { return this.http.post<any>(`${this.baseUrl}/members/`, data); }
  updateMember(id: number, data: any): Observable<any> { return this.http.put<any>(`${this.baseUrl}/members/${id}`, data); }
  deleteMember(id: number): Observable<any> { return this.http.delete<any>(`${this.baseUrl}/members/${id}`); }

  getEvents(): Observable<any[]> { return this.http.get<any[]>(`${this.baseUrl}/events/`); }
  createEvent(data: any): Observable<any> { return this.http.post<any>(`${this.baseUrl}/events/`, data); }
  deleteEvent(id: number): Observable<any> { return this.http.delete<any>(`${this.baseUrl}/events/${id}`); }

  getPublications(): Observable<any[]> { return this.http.get<any[]>(`${this.baseUrl}/publications/`); }
  createPublication(data: any): Observable<any> { return this.http.post<any>(`${this.baseUrl}/publications/`, data); }
  deletePublication(id: number): Observable<any> { return this.http.delete<any>(`${this.baseUrl}/publications/${id}`); }
}
