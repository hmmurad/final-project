import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentService {
  url = 'http://localhost:3000/enrollments';

  constructor(private http: HttpClient) {}

  getAllEnrollments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}`);
  }

  create(data: any) {
    return this.http.post<any[]>(`${this.url}`, data);
  }

  update(id: number, data: any) {
    return this.http.patch('http://localhost:3000/enrollments/' + id, data);
  }

  delete(id: number) {
    return this.http.delete('http://localhost:3000/enrollments/' + id);
  }

  getEnrolledStudentByClass(title: string, sort: string): Observable<any[]> {
    const params = new HttpParams().set('course', title).set('sort', sort);
    return this.http.get<any[]>(`${this.url}`, { params });
  }

  getEnrolledStudentByClassTitle(title: string): Observable<any[]> {
    const params = new HttpParams().set('course', title);
    return this.http.get<any[]>(`${this.url}`, { params });
  }
}
