import {Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentService } from 'src/app/services/student.service';
import {DialogFormComponent} from "../../components/dialog-form/dialog-form.component";
import {ActivatedRoute} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";







@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  students!:MatTableDataSource<any>
  editMode: boolean = false;
  displayedColumns: string[] = ['ID', 'name', 'email', 'mobile', 'actions'];
  id!: number;

  constructor(private studentService: StudentService, public dialog: MatDialog, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getAllStudents()
  }

  getAllStudents() {
    this.studentService.getStudents().subscribe(
      (res:any) => {
        this.students = new MatTableDataSource<any>(res)
      },
      error => alert("error fetching data")
    )
  }

  addstudent() {
    this.dialog.open(DialogFormComponent).afterClosed().subscribe(
      val => {
        if(val === 'save') {
          this.getAllStudents()
        }
      }
    )
  }

  editStudent(element: any) {
    this.dialog.open(DialogFormComponent, {
      data: element,
    }).afterClosed().subscribe(
      val => {
        if(val === 'update') {
          this.getAllStudents()
        }
      }
    );
  }

  deleteStudent(id:number) {
    this.studentService.deleteStudent(id).subscribe(res => {
      alert('Do you want to Delete?')
      this.getAllStudents()
    })
  }






}
