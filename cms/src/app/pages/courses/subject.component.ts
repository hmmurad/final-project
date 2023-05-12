import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AddSubjectDialogComponent} from "../../components/add-subject-dialog/add-subject-dialog.component";
import {SubjectService} from "../../services/subject.service";
import {MatTableDataSource} from "@angular/material/table";
import {TeacherService} from "../../services/teacher.service";

@Component({
  selector: 'app-courses',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit{

  displayedColumn = ['id', 'name', 'class', 'actions']
  dataSource!: any[]


  teachers:any[] = []

  constructor(private matdialog: MatDialog, private subjectService: SubjectService, private teacherService: TeacherService) {
  }


  ngOnInit() {
    this.getAllSubjects()
    this.getAllTeachers()
  }

  openDialog() {
    this.matdialog.open(AddSubjectDialogComponent).afterClosed().subscribe(
      res => {
        if(res === 'save') {
          this.getAllSubjects()
        }
      }
    )
  }

  getAllSubjects() {
    this.subjectService.getAllSubjects().subscribe(
      (res: any) => {
        this.dataSource = res
      }
    )
  }
  getAllTeachers() {
    this.teacherService.getTeachers().subscribe(
      (res: any[]) => {
        this.teachers = res
      }
    )
  }

  editdata(data:any) {
    this.matdialog.open(AddSubjectDialogComponent, {
      data: data
    }).afterClosed().subscribe(res => {
      if(res === 'update') {
        this.getAllSubjects()
      }

    } )
  }

  delete(data:any) {
    this.subjectService.delete(data.id).subscribe(
      res => {
        console.log(res)
        this.getAllSubjects()
      }
    )
  }

}
