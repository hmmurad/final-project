import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AddClassDialogComponent} from "../../components/add-class-dialog/add-class-dialog.component";
import {AddTeacherDialogComponent} from "../../components/add-teacher-dialog/add-teacher-dialog.component";
import {TeacherService} from "../../services/teacher.service";

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {

  displayedColumn = ['id', 'name', 'actions']
  dataSource: any[] = []

  constructor(private matDialog: MatDialog,
              private teacherService: TeacherService) {
  }

  ngOnInit() {
    this.getAllTeachers()
  }

  getAllTeachers() {[
    this.teacherService.getTeachers().subscribe(
      (res:any[]) => {
        this.dataSource = res
      }
    )
  ]}

  editTeacher(data: any) {
    this.matDialog.open(AddTeacherDialogComponent, {
      data: data
    }).afterClosed().subscribe(res => {
      if(res === 'update') {
        this.getAllTeachers()
      }
    })
  }


  addTeacher( ) {
    this.matDialog.open(AddTeacherDialogComponent).afterClosed().subscribe(
      res => {
        if(res === 'save') {
          this.getAllTeachers()
        }
      }
    )
  }

  delete(data: any) {
    this.teacherService.deleteTeacher(data.id).subscribe(
      res => {
        this.getAllTeachers()
        console.log(res)
      }
    )
  }
}
