import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SubjectService} from "../../services/subject.service";
import {ClassService} from "../../services/class.service";
import {Observable} from "rxjs";
import {TeacherService} from "../../services/teacher.service";

@Component({
  selector: 'app-add-subject-dialog',
  templateUrl: './add-subject-dialog.component.html',
  styleUrls: ['./add-subject-dialog.component.css']
})
export class AddSubjectDialogComponent implements OnInit{

  editMode: boolean = false;
  actionBtn: string = 'Save'
  form!: FormGroup

  classes$: Observable<any> = this.classService.getAllClasses()
  teacher$: Observable<any> = this.teacherService.getTeachers()


  constructor(private fb: FormBuilder, private matData: MatDialogRef<any>,
              @Inject(MAT_DIALOG_DATA) public editData: any,
              private subjectService: SubjectService,
              private classService: ClassService,
              private teacherService: TeacherService) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: [''],
      description: [''],
      teacherId: [''],
      courseId: ['']

    })

    if (this.editData) {
      this.actionBtn = 'Update'
      this.form.controls['name'].setValue(this.editData.name)
      this.form.controls['description'].setValue(this.editData.description)
      this.form.controls['courseId'].setValue(this.editData.course.courseTitle)
      this.form.controls['teacherId'].setValue(this.editData.teacher.name)
    }
    console.log(this.editData)

  }


  submit() {
    if(!this.editData) {
      if(this.form.valid) {
        this.createSubject(this.form.value)
      }
    } else {
      this.updateStudent(this.editData.id, this.form.value)
    }

    // if(this.editData) {
    //   console.log(this.form.value)
    // }
    //   console.log(this.form.value)
  }



  createSubject(data: any) {
    this.subjectService.createSubject(data).subscribe(
      (res:any) => {
        this.form.reset()
        this.matData.close('save')
        console.log(res)
      },
      error => {
        alert(error.error.message)
        console.log(error)
      }
    )
  }
  //update data
  updateStudent(id: number, data: any) {
    this.subjectService.updateSubject(id, data).subscribe({
      next: (res) => {
        this.form.reset()
        this.matData.close('update')
        console.log(res)
      },
      error: (err) => {
        console.log(err)
      },
    })
  }



}
