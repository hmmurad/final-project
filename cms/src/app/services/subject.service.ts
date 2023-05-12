import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  constructor(private http: HttpClient) {}

  getAllSubjects() {
    return this.http.get('http://localhost:3000/assignments');
  }

  getSubByClass(params: any) {
    return this.http.get('http://localhost:3000/assignments' + params);
  }


  getSubByTeacherId(teacherId: number) {
    const params  = new HttpParams().set('teacher', teacherId)
    return this.http.get('http://localhost:3000/assignments', {params});
  }


  getSubByClassAndTeacherId(className: any, teacherId:number) {
    const params = new HttpParams().set('course', className).set('teacher', teacherId)
    return this.http.get('http://localhost:3000/assignments' , {params});
  }



  createSubject(data: any) {
    return this.http.post(`http://localhost:3000/assignments`, data);
  }

  updateSubject(id: number, data: any) {
    return this.http.patch('http://localhost:3000/assignments/' + id, data);
  }

  delete(id: number) {
    return this.http.delete('http://localhost:3000/assignments/' + id);
  }
}
