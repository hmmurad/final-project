import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private http: HttpClient) {
  }


  getTeachers(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/teachers')
  }

  addTeacher(data:any) {
    return this.http.post<any>('http://localhost:3000/teachers/', data)
  }

  updateTeacher(id:number, data:any) {
    return this.http.patch('http://localhost:3000/teachers/'+ id, data)
  }

  deleteTeacher(id: number) {
    return this.http.delete('http://localhost:3000/teachers/' + id)
  }

}
