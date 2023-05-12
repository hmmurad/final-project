import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  constructor(private http: HttpClient) {
  }


  getAllClasses() {
    return this.http.get('http://localhost:3000/courses')
  }


  getclassesByName(name : string) {
    return this.http.get('http://localhost:3000/courses/name/' +name)
  }

  create( data:any) {
    return this.http.post<any[]>('http://localhost:3000/courses/', data)
  }
  update(id:number, data:any) {
    return this.http.patch('http://localhost:3000/courses/'+ id, data)
  }

  delete(id: number) {
    return this.http.delete('http://localhost:3000/courses/' + id)
  }

}
