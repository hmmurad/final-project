import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class StudentService {
url = 'http://localhost:3000/students'
  constructor(private http: HttpClient) { }

  getStudents() {
    return this.http.get<any[]>('http://localhost:3000/students')

  }

  createStudent(student: any) {
    return this.http.post(`${this.url}`, student)
  }

  getStudent(id: number) {
  return this.http.get(`${this.url}/${id}`)
  }
  getStudentByName(name: string) {
  return this.http.get(`${this.url}/name/${name}`)
  }
  updateStudent(id: number, student: any) {
  return this.http.patch(`${this.url}/${id}`, student)
  }

  deleteStudent(id:number) {
    return this.http.delete(`${this.url}/${id}`)
  }





}
